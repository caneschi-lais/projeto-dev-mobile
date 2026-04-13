import { getDatabase } from './database';
import { PetLog, CreatePetLogInput, UpdatePetLogInput } from '../types/pet';

export const petRepository = {
    // CREATE
    async create(data: CreatePetLogInput): Promise<number> {
        const db = await getDatabase();
        const result = await db.runAsync(
            'INSERT INTO pet_logs (titulo, descricao, dataRegistro) VALUES (?, ?, ?)',
            data.titulo,
            data.descricao,
            new Date().toISOString()
        );
        return result.lastInsertRowId;
    },

    // READ (Ler todos)
    async getAll(): Promise<PetLog[]> {
        const db = await getDatabase();
        return await db.getAllAsync<PetLog>('SELECT * FROM pet_logs ORDER BY dataRegistro DESC');
    },

    // UPDATE
    async update(data: UpdatePetLogInput): Promise<void> {
        const db = await getDatabase();
        await db.runAsync(
            'UPDATE pet_logs SET titulo = ?, descricao = ?, concluido = COALESCE(?, concluido) WHERE id = ?',
            data.titulo,
            data.descricao,
            data.concluido,
            data.id
        );
    },

    // DELETE
    async delete(id: number): Promise<void> {
        const db = await getDatabase();
        await db.runAsync('DELETE FROM pet_logs WHERE id = ?', id);
    }
};