import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StatusBar} from 'expo-status-bar';
import {StackScreens} from '../../App';
import {useFocusEffect} from '@react-navigation/native';
import {fetchTickets} from '../../services/api';
import { Ticket, User } from '../../types/types';
import { colors } from '../../theme';
import { GlobalContext } from '../../contexts/global.context';
import { View, StyleSheet, Alert, Text, FlatList } from 'react-native';
import { TicketItem } from '../../components/TicketItem';

/**
 * See tickets of all users for service team, this feature requires pagination which is not implemented for this demo
 */
export default function ServiceTickets(props: NativeStackScreenProps<StackScreens, 'ServiceTickets'>) {

  const [tickets, setTickets] = React.useState<Ticket[] | null>(null);

  const { user } = React.useContext(GlobalContext);

  const showStatus = (message: string, title: string = '') => {
    Alert.alert(
      title,
      message
    );
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchTickets()
      .then((allTickets: Ticket[]) => {
        setTickets([...allTickets]);
      })
      .catch((error) => {
        showStatus('No tickets found');
      })
    }, []),
  );

  const onPressTicket = React.useCallback((ticket: Ticket) => () => {
    props.navigation.navigate('TicketSubmission', {ticket});
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        data={tickets}
        renderItem={({item}) => <TicketItem ticket={item} onPress={onPressTicket(item)} />}
        keyExtractor={item => String(item.id)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  }
});
