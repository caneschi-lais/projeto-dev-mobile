import { useCallback } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { usePetLogs } from '../src/hooks/usePetLogs';
import { PetLogItem } from '../src/components/PetLogItem';
import { Ionicons } from '@expo/vector-icons';

export default function Home() {
    const { logs, deleteLog, loadLogs } = usePetLogs();
    const router = useRouter();

    useFocusEffect(
        useCallback(() => {
            loadLogs();
        }, [])
    );

    const handleEdit = (log: PetLog) => {
        router.push({
            pathname: '/form',
            params: {
                id: log.id,
                titulo: log.titulo,
                descricao: log.descricao || ''
            }
        });
    };

    return (
        <View className="flex-1 bg-slate-50 px-4 pt-4">
            <FlatList
                data={logs}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <PetLogItem log={item} onDelete={deleteLog} onEdit={handleEdit} />
                )}
                ListEmptyComponent={() => (
                    <View className="items-center mt-20">
                        <Text className="text-slate-400 text-lg">Nenhum registro ainda.</Text>
                        <Text className="text-slate-400">Comece anotando a rotina da Mel!</Text>
                    </View>
                )}
                contentContainerStyle={{ paddingBottom: 100 }}
            />

            <TouchableOpacity
                onPress={() => router.push('/form')}
                className="absolute bottom-10 right-6 bg-blue-600 w-16 h-16 rounded-full items-center justify-center shadow-lg"
            >
                <Ionicons name="add" size={32} color="white" />
            </TouchableOpacity>
        </View>
    );
}