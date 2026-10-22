#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * Script to safely create or reset administrator credentials
 * Usage:
 *   node scripts/create-admin.js <username> <password> [role]
 * Example:
 *   node scripts/create-admin.js admin MyStrongPass123! SuperAdmin
 */

const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const args = process.argv.slice(2);
const username = args[0] || "admin";
const password = args[1];
const role = args[2] || "SuperAdmin";

if (!password) {
  console.error("Error: Password is required.");
  console.log("Usage: node scripts/create-admin.js <username> <password> [role]");
  process.exit(1);
}

if (password.length < 8) {
  console.error("Error: Password must be at least 8 characters long.");
  process.exit(1);
}

const dbDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(path.join(dbDir, "site.db"));

// Hash password using PBKDF2 with SHA-512
const salt = crypto.randomBytes(16).toString("hex");
const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");

const existing = db.prepare("SELECT id FROM admin_users WHERE username = ?").get(username);

if (existing) {
  db.prepare(`
    UPDATE admin_users 
    SET password_hash = ?, salt = ?, role = ?, updated_at = ?
    WHERE username = ?
  `).run(hash, salt, role, new Date().toISOString(), username);

  console.log(`✅ Administrator account "${username}" updated successfully with secure PBKDF2 credentials.`);
} else {
  const id = "admin-" + Date.now();
  db.prepare(`
    INSERT INTO admin_users (id, username, password_hash, salt, role, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(id, username, hash, salt, role, new Date().toISOString(), new Date().toISOString());

  console.log(`✅ Administrator account "${username}" created successfully with role "${role}".`);
}

db.close();
