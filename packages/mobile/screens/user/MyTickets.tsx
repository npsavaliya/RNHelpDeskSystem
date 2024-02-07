import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StatusBar} from 'expo-status-bar';
import {StackScreens} from '../../App';
import {useFocusEffect} from '@react-navigation/native';
import {fetchUserTickets} from '../../services/api';
import { Ticket } from '../../types/types';
import { GlobalContext } from '../../contexts/global.context';
import { View, Alert, FlatList, Text } from 'react-native';
import { Button } from '../../components';
import { TicketItem } from '../../components/TicketItem';
import { styles } from './myTicketsStyle';

/**
 * Customer screen to see the logged customer ticket and option create the new one
 */
export default function MyTickets(props: NativeStackScreenProps<StackScreens, 'MyTickets'>) {

  const [tickets, setTickets] = React.useState<Ticket[] | null>(null);

  const { user } = React.useContext(GlobalContext);
  
  const navigateToCreateTicket = React.useCallback(() => {
    props.navigation.navigate('TicketSubmission');
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchUserTickets(user?.id ?? -1)
      .then((allTickets: Ticket[]) => {
        setTickets([...allTickets]);
      })
      .catch((error) => {
        console.log('Error fetching tickets - ', error);
      })
    }, []),
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        data={tickets}
        renderItem={({item}) => <TicketItem ticket={item} />}
        keyExtractor={item => String(item.id)}
      />
      <Button text='Create Ticket' style={styles.buttonBox} onPress={navigateToCreateTicket} />
    </View>
  )
}
