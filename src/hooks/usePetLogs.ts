import { useEffect, useState } from 'react';
import { petRepository } from '../database/petRepository';
import { CreatePetLogInput, PetLog, UpdatePetLogInput } from '../types/pet';

export function usePetLogs() {
    const [logs, setLogs] = useState<PetLog[]>([]);

    const loadLogs = async (filterDate?: string) => {
        const data = await petRepository.getAll(filterDate);
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

    return { logs, addLog, updateLog, deleteLog, loadLogs };
}