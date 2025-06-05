import db from "#db/client";
import { application } from "express";
import { createFile } from "#db/queries/files";
import { createFolder } from "#db/queries/folders";
import { faker } from "@faker-js/faker";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  let folder1 = "api";
  let folder2 = "db";
  let folder3 = "main";

  createFolder(folder1);
  createFolder(folder2);
  createFolder(folder3);

  for (let i = 0; i < 15; i++) {
    let folderId = 1;

    if (i < 5) {
      folderId = 1;
    } else if (i < 10) {
      folderId = 2;
    } else {
      folderId = 3;
    }

    const file = {
      name: faker.system.fileName(),
      size: faker.number.int({ min: 60, max: 6000 }),
      folderId: folderId,
    };
    await createFile(file);
  }
}
