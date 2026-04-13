import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { usePetLogs } from '../src/hooks/usePetLogs';

export default function Form() {
    const params = useLocalSearchParams();

    const initialDate = params.dataRegistro
        ? new Date(`${params.dataRegistro}T${params.horaRegistro}`)
        : new Date();

    const [data, setData] = useState(initialDate);

    const [titulo, setTitulo] = useState(params.titulo ? String(params.titulo) : '');
    const [descricao, setDescricao] = useState(params.descricao ? String(params.descricao) : '');

    const [showPicker, setShowPicker] = useState(false);
    const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date');

    const { addLog, updateLog } = usePetLogs();
    const router = useRouter();

    const isEditing = !!params.id;

    const openPicker = (mode: 'date' | 'time') => {
        setPickerMode(mode);
        setShowPicker(true);
    };

    const onChangeDate = (event: any, selectedDate?: Date) => {
        setShowPicker(false);

        if (event.type === 'set' && selectedDate) {
            setData(selectedDate);

            if (pickerMode === 'date' && Platform.OS === 'android') {
                setTimeout(() => {
                    openPicker('time');
                }, 100);
            }
        }
    };

    const handleSave = async () => {
        const dataFormatada = data.toISOString().split('T')[0]; // YYYY-MM-DD
        const horaFormatada = data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        const payload = {
            titulo,
            descricao,
            dataRegistro: dataFormatada,
            horaRegistro: horaFormatada,
        };

        if (isEditing) {
            await updateLog({ id: Number(params.id), ...payload });
        } else {
            await addLog(payload);
        }
        router.back();
    };

    return (
        <View className="flex-1 bg-white p-6">
            <Stack.Screen options={{ title: isEditing ? 'Editar Registro' : 'Novo Registro' }} />

            <Text className="text-slate-500 font-bold mb-2">Quando aconteceu?</Text>
            <TouchableOpacity
                onPress={() => openPicker('date')}
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 flex-row justify-between"
            >
                <Text className="text-lg">
                    {data.toLocaleDateString('pt-BR')} às {data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </Text>
                <Ionicons name="calendar-outline" size={24} color="#64748b" />
            </TouchableOpacity>

            {showPicker && (
                <DateTimePicker
                    value={data}
                    mode={pickerMode}
                    is24Hour={true}
                    onChange={onChangeDate}
                />
            )}

            <Text className="text-slate-500 font-bold mb-2">O que aconteceu?</Text>
            <TextInput
                placeholder="Ex: Vacina, Passeio, comida..."
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
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 text-lg"
                textAlignVertical="top"
            />

            <TouchableOpacity
                onPress={handleSave}
                className="bg-violet-400 p-4 rounded-xl items-center mt-auto mb-4"
            >
                <Text className="text-white font-bold text-lg">
                    {isEditing ? 'Atualizar Diário' : 'Salvar no Diário'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}