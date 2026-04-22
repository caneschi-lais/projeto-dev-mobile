import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { PetLog } from '../types/pet';

interface Props {
    log: PetLog;
    onDelete: (id: number) => void;
    onEdit: (log: PetLog) => void;
    onToggleStatus: (log: PetLog) => void;
}

export function PetLogItem({ log, onDelete, onEdit, onToggleStatus }: Props) {
    const dataFormatada = new Date(log.dataRegistro).toLocaleDateString('pt-BR');
    const isDone = log.concluido === 1;

    return (
        <View className={`bg-white p-4 mb-3 rounded-2xl border border-slate-100 shadow-sm flex-row items-center ${isDone ? 'opacity-60' : ''}`}>

            {/* Botão de Checkbox */}
            <TouchableOpacity
                onPress={() => onToggleStatus(log)}
                className="mr-3"
            >
                <Ionicons
                    name={isDone ? "checkmark-circle" : "ellipse-outline"}
                    size={28}
                    color={isDone ? "#10b981" : "#cbd5e1"}
                />
            </TouchableOpacity>

            <View className="flex-1 mr-2">
                <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">
                    {log.horaRegistro}
                </Text>

                <Text className={`text-slate-800 text-lg font-bold ${isDone ? 'line-through text-slate-400' : ''}`}>
                    {log.titulo}
                </Text>

                {log.descricao && (
                    <Text className={`text-slate-600 text-sm ${isDone ? 'text-slate-400' : ''}`}>
                        {log.descricao}
                    </Text>
                )}
            </View>

            <View className="flex-row gap-2">
                <TouchableOpacity onPress={() => onEdit(log)} className="bg-violet-50 p-2 rounded-full">
                    <Ionicons name="pencil-outline" size={18} color="#7c3aed" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onDelete(log.id)} className="bg-red-50 p-2 rounded-full">
                    <Ionicons name="trash-outline" size={18} color="#ef4444" />
                </TouchableOpacity>
            </View>
        </View>
    );
}