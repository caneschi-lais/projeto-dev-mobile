import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = 'diariopet_v2.db';

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

/**
 * Função responsável por abrir a conexão com o banco e retornar a instância.
 */
export function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  // Se já existe uma requisição para abrir o banco rolando, retorna ela mesma
  if (dbPromise !== null) {
    return dbPromise;
  }

  dbPromise = (async () => {
    const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
    await runMigrations(db);
    return db;
  })();

  return dbPromise;
}

/**
 * Função que cria a estrutura da tabela
 */
async function runMigrations(db: SQLite.SQLiteDatabase): Promise<void> {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS pet_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descricao TEXT,
      concluido INTEGER NOT NULL DEFAULT 0,
      dataRegistro TEXT NOT NULL,
      horaRegistro TEXT NOT NULL
    );
  `);
}