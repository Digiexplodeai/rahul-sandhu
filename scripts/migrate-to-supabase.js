#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * Migration Script: SQLite -> Supabase / PostgreSQL
 * Reads local SQLite database and exports all tables as clean SQL INSERT statements
 * Usage:
 *   node scripts/migrate-to-supabase.js [output.sql]
 */

const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

const dbPath = path.join(process.cwd(), "data", "site.db");
if (!fs.existsSync(dbPath)) {
  console.error("Error: SQLite database not found at", dbPath);
  process.exit(1);
}

const db = new Database(dbPath);
const outputFile = process.argv[2] || path.join(process.cwd(), "data", "supabase_seed_export.sql");

const tables = [
  "site_settings",
  "specialties",
  "treatments",
  "blogs",
  "testimonials",
  "videos",
  "faqs",
  "enquiries",
  "media_assets",
  "pages",
  "page_sections",
  "admin_users",
];

let sqlOutput = `-- ==========================================================
-- Generated SQLite to Supabase Seed Export
-- Generated at: ${new Date().toISOString()}
-- ==========================================================

`;

for (const table of tables) {
  try {
    const rows = db.prepare(`SELECT * FROM ${table}`).all();
    if (rows.length === 0) continue;

    sqlOutput += `-- Data for ${table} (${rows.length} rows)\n`;
    for (const row of rows) {
      const columns = Object.keys(row);
      const values = Object.values(row).map((v) => {
        if (v === null || v === undefined) return "NULL";
        if (typeof v === "number") return v;
        return `'${String(v).replace(/'/g, "''")}'`;
      });

      sqlOutput += `INSERT INTO ${table} (${columns.join(", ")}) VALUES (${values.join(", ")}) ON CONFLICT DO NOTHING;\n`;
    }
    sqlOutput += "\n";
  } catch (err) {
    console.warn(`Table ${table} skipped or not initialized:`, err.message);
  }
}

fs.writeFileSync(outputFile, sqlOutput, "utf-8");
console.log(`✅ Successfully exported SQLite data to Supabase SQL file: ${outputFile}`);
console.log(`You can run this file in your Supabase SQL editor after running scripts/supabase_schema.sql!`);
db.close();
