export interface PetLog {
    id: number;
    titulo: string;
    descricao: string | null;
    concluido: number; // 0 para pendente, 1 para concluído
    dataRegistro: string;
}

export interface CreatePetLogInput {
    titulo: string;
    descricao: string | null;
}

export interface UpdatePetLogInput {
    id: number;
    titulo: string;
    descricao: string | null;
    concluido?: number;
}