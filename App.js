import { useContext,useEffect, useState,Text,View } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from './screens/loadingscreen'; // Replace with the correct path to your LoadingScreen component file



import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import IconButton from './components/ui/IconButton';
import AppLoading from 'expo-app-loading';

const Stack = createNativeStackNavigator();


function AuthStack() {
  return (
    <SafeAreaView style={{ flex: 1 }} >
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        cardStyle: { backgroundColor: Colors.primary100 }, // Use 'cardStyle' for the content background
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
  
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>

    </SafeAreaView>
  );
  
  
}

console.log(LoginScreen);

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
    </Stack.Navigator>
    </SafeAreaView>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}



function Root(){

  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function loadAppData() {
      try {
        const storedToken = await AsyncStorage.getItem('token');

        if (storedToken) {
          authCtx.authenticate(storedToken);
        }

        // Simulate additional loading (replace with your actual loading logic)
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsLoadingComplete(true);
      } catch (error) {
        console.error('Error loading app data:', error);
        setIsLoadingComplete(true); // In case of an error, still mark loading as complete
      }
    }

    loadAppData();
  }, [authCtx]);


   if(!isLoadingComplete){
    
        return <LoadingScreen />;
      }

      return <Navigation />; 
     
}


export default function App() {

  


  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>

        <Root />
        
      </AuthContextProvider>
    </>
  );
}