import db from "#db/client";

export async function createFolder(name) {
  const SQL = `
  INSERT INTO folders(name)
  VALUES($1) RETURNING *;
  `;
  const result = await db.query(SQL, [name]);
  return result;
}

export async function getFolders() {
  const SQL = `SELECT * FROM folders`;
  const { rows } = await db.query(SQL);
  return rows;
}

export async function getFolderById(id) {
  const SQL = `SELECT *, (SELECT json_agg(files) FROM files WHERE files.folder_id = folders.id)
   AS files
   FROM folders
   WHERE folders.id = $1`;
  const {
    rows: [folder],
  } = await db.query(SQL, [id]);
  return folder;
}

export async function createFileUsingFolderId({ name, size, folderId }) {
  const SQL = `INSERT INTO files(name, size, folder_id)
    VALUES ($1, $2, $3)
    RETURNING *
    `;
  const {
    rows: [file],
  } = await db.query(SQL, [name, size, folderId]);
  return file;
}
