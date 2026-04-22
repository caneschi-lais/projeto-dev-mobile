import { CreatePetLogInput, PetLog, UpdatePetLogInput } from '../types/pet';
import { getDatabase } from './database';

export const petRepository = {
    // CREATE
    async create(data: CreatePetLogInput): Promise<number> {
        const db = await getDatabase();
        const result = await db.runAsync(
            'INSERT INTO pet_logs (titulo, descricao, dataRegistro, horaRegistro) VALUES (?, ?, ?, ?)',
            data.titulo, data.descricao, data.dataRegistro, data.horaRegistro
        );
        return result.lastInsertRowId;
    },

    // READ
    async getAll(filterDate?: string): Promise<PetLog[]> {
        const db = await getDatabase();
        if (filterDate) {
            return await db.getAllAsync<PetLog>(
                'SELECT * FROM pet_logs WHERE dataRegistro = ? ORDER BY horaRegistro DESC',
                filterDate
            );
        }
        return await db.getAllAsync<PetLog>('SELECT * FROM pet_logs ORDER BY dataRegistro DESC, horaRegistro DESC');
    },

    // UPDATE
    async update(data: UpdatePetLogInput): Promise<void> {
        const db = await getDatabase();
        await db.runAsync(
            'UPDATE pet_logs SET titulo = ?, descricao = ?, dataRegistro = ?, horaRegistro = ?, concluido = ? WHERE id = ?',
            data.titulo,
            data.descricao,
            data.dataRegistro,
            data.horaRegistro,
            data.concluido ?? 0,
            data.id
        );
    },

    // DELETE
    async delete(id: number): Promise<void> {
        const db = await getDatabase();
        await db.runAsync('DELETE FROM pet_logs WHERE id = ?', id);
    }
};