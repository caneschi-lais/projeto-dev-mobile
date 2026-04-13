import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { usePetLogs } from '../src/hooks/usePetLogs';

export default function Form() {
    const params = useLocalSearchParams();

    const [titulo, setTitulo] = useState(params.titulo ? String(params.titulo) : '');
    const [descricao, setDescricao] = useState(params.descricao ? String(params.descricao) : '');

    const { addLog, updateLog } = usePetLogs();
    const router = useRouter();

    const isEditing = !!params.id;

    const handleSave = async () => {
        if (!titulo.trim()) {
            Alert.alert('Erro', 'O título é obrigatório.');
            return;
        }

        if (isEditing) {
            await updateLog({
                id: Number(params.id),
                titulo,
                descricao
            });
        } else {
            await addLog({ titulo, descricao });
        }

        router.back();
    };

    return (
        <View className="flex-1 bg-white p-6">
            <Stack.Screen options={{ title: isEditing ? 'Editar Registro' : 'Novo Registro' }} />

            <Text className="text-slate-500 font-bold mb-2">O que aconteceu?</Text>
            <TextInput
                placeholder="Ex: Vacina da Mel, Passeio no parque..."
                value={titulo}
                onChangeText={setTitulo}
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 text-lg"
            />

            <Text className="text-slate-500 font-bold mb-2">Detalhes (Opcional)</Text>
            <TextInput
                placeholder="Descreva o que houve..."
                value={descricao}
                onChangeText={setDescricao}
                multiline
                numberOfLines={4}
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-8 text-lg"
                textAlignVertical="top"
            />

            <TouchableOpacity
                onPress={handleSave}
                className="bg-blue-600 p-4 rounded-xl items-center"
            >
                <Text className="text-white font-bold text-lg">
                    {isEditing ? 'Atualizar Diário' : 'Salvar no Diário'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}