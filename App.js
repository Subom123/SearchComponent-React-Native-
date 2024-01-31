import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppNavigator from "./src/navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchScreen from "./src/screens/SearchScreen";
import { NavigationContainer } from "@react-navigation/native";

const queryClient = new QueryClient();

export default function App() {
  return <AppNavigator />;
}
