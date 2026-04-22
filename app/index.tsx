import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import { PetLogItem } from '../src/components/PetLogItem';
import { usePetLogs } from '../src/hooks/usePetLogs';
import { PetLog } from '../src/types/pet';

export default function Home() {
    const [filterDate, setFilterDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const { logs, deleteLog, loadLogs, updateLog } = usePetLogs();
    const router = useRouter();

    const dateString = filterDate.toISOString().split('T')[0];

    useFocusEffect(
        useCallback(() => {
            loadLogs(dateString);
        }, [dateString])
    );

    const onChangeDate = (event: any, selectedDate?: Date) => {
        setShowPicker(false);
        if (event.type === 'set' && selectedDate) {
            setFilterDate(selectedDate);
        }
    };

    const handleToggleStatus = async (log: PetLog) => {
        await updateLog({
            ...log,
            concluido: log.concluido === 1 ? 0 : 1
        });
    }

    const handleEdit = (log: PetLog) => {
        router.push({
            pathname: '/form',
            params: {
                id: log.id,
                titulo: log.titulo,
                descricao: log.descricao || '',
                dataRegistro: log.dataRegistro,
                horaRegistro: log.horaRegistro
            }
        });
    };

    return (
        <View className="flex-1 bg-slate-50 px-4 pt-4">

            <TouchableOpacity
                onPress={() => setShowPicker(true)}
                className="bg-white p-4 mb-4 rounded-2xl border border-slate-100 flex-row justify-between items-center shadow-sm"
            >
                <View>
                    <Text className="text-slate-500 text-xs uppercase font-bold tracking-wider">Filtrando por dia:</Text>
                    <Text className="text-slate-800 text-lg font-bold">
                        {filterDate.toLocaleDateString('pt-BR')}
                    </Text>
                </View>
                <View className="bg-violet-100 p-2 rounded-lg">
                    <Ionicons name="calendar" size={24} color="#7c3aed" />
                </View>
            </TouchableOpacity>

            {showPicker && (
                <DateTimePicker
                    value={filterDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'inline' : 'default'}
                    onChange={onChangeDate}
                />
            )}

            <FlatList
                data={logs}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <PetLogItem log={item} onDelete={deleteLog} onEdit={handleEdit} onToggleStatus={handleToggleStatus} />
                )}
                ListEmptyComponent={() => (
                    <View className="items-center mt-12 px-6">
                        <Image
                            source={require('../assets/images/empty-diary.png')}
                            className="w-64 h-64 opacity-80"
                            resizeMode="contain"
                        />
                        <Text className="text-slate-400 text-lg mt-2 text-center font-medium">
                            Nenhum registro para este dia.
                        </Text>
                    </View>
                )}
                contentContainerStyle={{ paddingBottom: 100 }}
            />

            <TouchableOpacity
                onPress={() => router.push('/form')}
                className="absolute bottom-10 right-6 bg-violet-400 w-16 h-16 rounded-full items-center justify-center shadow-lg"
            >
                <Ionicons name="add" size={32} color="white" />
            </TouchableOpacity>
        </View>
    );
}