import { useState, useEffect } from 'react';
import { petRepository } from '../database/petRepository';
import { PetLog, CreatePetLogInput } from '../types/pet';

export function usePetLogs() {
    const [logs, setLogs] = useState<PetLog[]>([]);

    const loadLogs = async () => {
        const data = await petRepository.getAll();
        setLogs(data);
    };

    const addLog = async (input: CreatePetLogInput) => {
        await petRepository.create(input);
        await loadLogs();
    };

    const updateLog = async (input: UpdatePetLogInput) => {
        await petRepository.update(input);
        await loadLogs();
    };

    const deleteLog = async (id: number) => {
        await petRepository.delete(id);
        await loadLogs();
    };

    useEffect(() => {
        loadLogs();
    }, []);

    // 👇 2. Exporte a função aqui
    return { logs, addLog, updateLog, deleteLog, loadLogs };
}