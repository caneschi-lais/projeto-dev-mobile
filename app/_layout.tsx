import { Stack } from 'expo-router';
import '../global.css';
export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#f8fafc' },
        headerShadowVisible: false,
        headerTitleStyle: { fontWeight: 'bold', color: '#1e293b' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Diário da Mel 🐾' }} />
      <Stack.Screen name="form" options={{ title: 'Novo Registro', presentation: 'modal' }} />
    </Stack>
  );
}