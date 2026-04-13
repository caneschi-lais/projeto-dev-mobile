import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { PetLog } from '../types/pet';

interface Props {
    log: PetLog;
    onDelete: (id: number) => void;
    onEdit: (log: PetLog) => void;
}

export function PetLogItem({ log, onDelete, onEdit }: Props) {
    const dataFormatada = new Date(log.dataRegistro).toLocaleDateString('pt-BR');

    return (
        <View className="bg-white p-4 mb-3 rounded-2xl border border-slate-100 shadow-sm flex-row justify-between items-center">
            <View className="flex-1 mr-4">
                <Text className="text-slate-500 text-xs font-medium mb-1 uppercase tracking-wider">
                    {dataFormatada}
                </Text>
                <Text className="text-slate-800 text-lg font-bold mb-1">{log.titulo}</Text>
                {log.descricao && (
                    <Text className="text-slate-600 text-sm leading-5">{log.descricao}</Text>
                )}
            </View>

            <View className="flex-row gap-2">
                <TouchableOpacity
                    onPress={() => onEdit(log)}
                    className="bg-violet-50 p-2 rounded-full"
                >
                    <Ionicons name="pencil-outline" size={20} color="#7c3aed" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => onDelete(log.id)}
                    className="bg-red-50 p-2 rounded-full"
                >
                    <Ionicons name="trash-outline" size={20} color="#ef4444" />
                </TouchableOpacity>
            </View>
        </View>
    );
}