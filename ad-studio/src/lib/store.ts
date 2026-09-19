import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import type { FacebookConnection } from "./facebook/types";

export interface AssetRecord {
  id: string;
  fileName: string;
  url: string; // served from /uploads/<file>
  width: number;
  height: number;
  createdAt: number;
}

export interface CreativeRecord {
  id: string;
  assetId: string;
  templateId: string;
  format: "square" | "portrait" | "story";
  url: string; // served from /generated/<file>
  headline: string;
  subheadline: string;
  cta: string;
  createdAt: number;
}

export interface CampaignRecord {
  id: string; // Facebook campaign id
  name: string;
  adSetId: string;
  adIds: string[];
  creativeIds: string[];
  status: string;
  manageUrl: string;
  createdAt: number;
}

interface DbShape {
  facebookConnection: FacebookConnection | null;
  assets: AssetRecord[];
  creatives: CreativeRecord[];
  campaigns: CampaignRecord[];
}

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "db.json");

const EMPTY_DB: DbShape = { facebookConnection: null, assets: [], creatives: [], campaigns: [] };

// Single-process in-memory lock so two concurrent requests can't clobber a
// read-modify-write cycle against the JSON file. This app is designed for a
// single small team running one server process, not a distributed deployment.
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

async function writeDb(db: DbShape): Promise<void> {
  await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2));
}

function mutate<T>(fn: (db: DbShape) => T | Promise<T>): Promise<T> {
  const task = writeQueue.then(async () => {
    const db = await readDb();
    const result = await fn(db);
    await writeDb(db);
    return result;
  });
  // Swallow errors in the chain itself so one failed mutation doesn't wedge the queue,
  // while still letting the caller's own promise reject with the real error.
  writeQueue = task.catch(() => undefined);
  return task;
}

export function newId(prefix: string): string {
  return `${prefix}_${crypto.randomBytes(8).toString("hex")}`;
}

export async function getConnection(): Promise<FacebookConnection | null> {
  const db = await readDb();
  return db.facebookConnection;
}

export async function saveConnection(conn: FacebookConnection): Promise<void> {
  await mutate((db) => {
    db.facebookConnection = conn;
  });
}

export async function clearConnection(): Promise<void> {
  await mutate((db) => {
    db.facebookConnection = null;
  });
}

export async function addAsset(asset: AssetRecord): Promise<AssetRecord> {
  await mutate((db) => {
    db.assets.unshift(asset);
  });
  return asset;
}

export async function listAssets(): Promise<AssetRecord[]> {
  const db = await readDb();
  return db.assets;
}

export async function getAsset(id: string): Promise<AssetRecord | undefined> {
  const db = await readDb();
  return db.assets.find((a) => a.id === id);
}

export async function addCreatives(creatives: CreativeRecord[]): Promise<CreativeRecord[]> {
  await mutate((db) => {
    db.creatives.unshift(...creatives);
  });
  return creatives;
}

export async function listCreatives(): Promise<CreativeRecord[]> {
  const db = await readDb();
  return db.creatives;
}

export async function getCreatives(ids: string[]): Promise<CreativeRecord[]> {
  const db = await readDb();
  const set = new Set(ids);
  return db.creatives.filter((c) => set.has(c.id));
}

export async function addCampaign(campaign: CampaignRecord): Promise<CampaignRecord> {
  await mutate((db) => {
    db.campaigns.unshift(campaign);
  });
  return campaign;
}

export async function listCampaigns(): Promise<CampaignRecord[]> {
  const db = await readDb();
  return db.campaigns;
}
