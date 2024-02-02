import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {initialWindowMetrics, SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './screens/auth/Login';
import { fetchUser, storageKeys } from './utils/storage';
import { Ticket, User } from './types/types';
import { logout } from './services/api';
import { GlobalContext } from './contexts/global.context';
import ServiceTickets from './screens/admin/ServiceTickets';
import MyTickets from './screens/user/MyTickets';
import TicketSubmission from './screens/user/TicketSubmission';
import { Button } from './components';
import { HeaderButtonProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import { colors } from './theme';

/**
   * This type allows TypeScript to know what routes are defined in this navigator
   * as well as what properties (if any) they might take when navigating to them.
   *
   * If no params are allowed, pass through `undefined`.
   * For more information, see this documentation:
   *   https://reactnavigation.org/docs/params/
   *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
   *   https://reactnavigation.org/docs/typescript/#organizing-types
   */
export type StackScreens = {
  MyTickets: undefined;
  TicketSubmission: {ticket?: Ticket} | undefined;
  Login: undefined;
  Register: undefined;
  App: undefined;
  ServiceTickets: undefined;
}

export const Stack = createNativeStackNavigator<StackScreens>();

export default function App() {

  const [user, setUser] = React.useState<User | null>(null);

  const checkLogin = async () => {
    const user = await fetchUser(storageKeys.user);

    setUser(user);
  }

  const showStatus = (message: string, title: string = '') => {
    Alert.alert(
      title,
      message
    );
  }

  React.useEffect(() => {
    checkLogin();
  }, []);

  const handleLogout = React.useCallback(async () => {
    try {
      const isLogout = await logout();

      if (isLogout) {
       setUser(null);
      }
    } catch (error: any) {
      showStatus('Logout failed', 'Error');
    }
  }, []);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GlobalContext.Provider
        value={{ user, checkLogin, onLogout: handleLogout }}
      >
        <View style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{
              headerRight: user?.id ? () => (
                  <Button text="Logout" style={styles.logoutButton} textStyle={styles.logoutButtonText} onPress={handleLogout} />
              ) : undefined
            }}>
              {user ? (
                user.id === 1 ? (
                  <>
                    <Stack.Screen
                      name="ServiceTickets"
                      component={ServiceTickets}
                    />
                    <Stack.Screen name="TicketSubmission" component={TicketSubmission} />
                  </>
                ) : (
                  <>
                    <Stack.Screen name="MyTickets" component={MyTickets} />
                    <Stack.Screen name="TicketSubmission" component={TicketSubmission} />
                  </>
                )
              ) : (
             
                <>
                  <Stack.Screen name="Login" component={Login} />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
          <StatusBar style="auto" />
        </View>
      </GlobalContext.Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  logoutButton: {
    backgroundColor: 'transparent'
  },
  logoutButtonText: {
    color: 'green',
    fontWeight: '600'
  }
});
