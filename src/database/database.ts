import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = 'diariopet.db';

let database: SQLite.SQLiteDatabase | null = null;

/**
 * Função responsável por abrir a conexão com o banco e retornar a instância.
 */
export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (database !== null) {
    return database;
  }

  database = await SQLite.openDatabaseAsync(DATABASE_NAME);

  await runMigrations(database);

  return database;
}

/**
 * Função que cria a estrutura da tabela
 */
async function runMigrations(db: SQLite.SQLiteDatabase): Promise<void> {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS pet_logs (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo      TEXT    NOT NULL,
      descricao   TEXT,
      concluido   INTEGER NOT NULL DEFAULT 0,
      dataRegistro TEXT    NOT NULL
    );
  `);
}