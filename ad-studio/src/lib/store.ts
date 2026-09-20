import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import type { AdSpec, CreativeAsset } from "./types";

interface DbShape {
  assets: CreativeAsset[];
  specs: AdSpec[];
}

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "db.json");

const EMPTY_DB: DbShape = { assets: [], specs: [] };

// Single-process in-memory lock so two concurrent requests can't clobber a
// read-modify-write cycle against the JSON file. This app is designed for a
// single operator running one server process, not a distributed deployment.
let writeQueue: Promise<unknown> = Promise.resolve();

async function ensureDb(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DB_FILE);
  } catch {
    await fs.writeFile(DB_FILE, JSON.stringify(EMPTY_DB, null, 2));
  }
}

async function readDb(): Promise<DbShape> {
  await ensureDb();
  const raw = await fs.readFile(DB_FILE, "utf-8");
  try {
    return { ...EMPTY_DB, ...JSON.parse(raw) };
  } catch {
    return { ...EMPTY_DB };
  }
}

function mutate<T>(fn: (db: DbShape) => T | Promise<T>): Promise<T> {
  const task = writeQueue.then(async () => {
    const db = await readDb();
    const result = await fn(db);
    await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2));
    return result;
  });
  // Swallow errors in the chain itself so one failed mutation doesn't wedge the
  // queue, while still letting the caller's own promise reject with the real error.
  writeQueue = task.catch(() => undefined);
  return task;
}

export function newId(prefix: string): string {
  return `${prefix}_${crypto.randomBytes(8).toString("hex")}`;
}

export async function addAsset(asset: CreativeAsset): Promise<CreativeAsset> {
  await mutate((db) => {
    db.assets.unshift(asset);
  });
  return asset;
}

export async function listAssets(): Promise<CreativeAsset[]> {
  const db = await readDb();
  return db.assets;
}

export async function getAssets(ids: string[]): Promise<CreativeAsset[]> {
  const db = await readDb();
  // Preserve the caller's order - carousel card order is meaningful.
  return ids.map((id) => db.assets.find((a) => a.id === id)).filter((a): a is CreativeAsset => Boolean(a));
}

export async function listSpecs(): Promise<AdSpec[]> {
  const db = await readDb();
  return [...db.specs].sort((a, b) => b.updatedAt - a.updatedAt);
}

export async function getSpec(id: string): Promise<AdSpec | undefined> {
  const db = await readDb();
  return db.specs.find((s) => s.id === id);
}

export async function saveSpec(spec: AdSpec): Promise<AdSpec> {
  return mutate((db) => {
    const index = db.specs.findIndex((s) => s.id === spec.id);
    const next = { ...spec, updatedAt: Date.now() };
    if (index === -1) db.specs.unshift(next);
    else db.specs[index] = next;
    return next;
  });
}

export async function deleteSpec(id: string): Promise<boolean> {
  return mutate((db) => {
    const index = db.specs.findIndex((s) => s.id === id);
    if (index === -1) return false;
    db.specs.splice(index, 1);
    return true;
  });
}
