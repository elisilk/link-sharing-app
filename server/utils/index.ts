import db from "../db/index";

export * as schema from "../db/schema";

export const useDb = () => db;

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
