import db from "#db/client";

export async function createFile({ name, size, folderId }) {
  const SQL = `
  INSERT INTO files(name, size, folder_id)
  VALUES($1, $2, $3) RETURNING *;
  `;
  const result = await db.query(SQL, [name, size, folderId]);
  return result;
}

export async function getFiles() {
  const SQL = `SELECT files.*, folders.name AS folder_name
    FROM files
    JOIN folders ON files.folder_id = folders.id
    `;
  const { rows: file } = await db.query(SQL);
  return file;
}
