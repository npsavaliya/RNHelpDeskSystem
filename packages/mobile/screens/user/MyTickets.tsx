import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StatusBar} from 'expo-status-bar';
import {StackScreens} from '../../App';
import {useFocusEffect} from '@react-navigation/native';
import {fetchTickets, fetchUserTickets} from '../../services/api';
import { Ticket, User } from '../../types/types';
import { colors } from '../../theme';
import { GlobalContext } from '../../contexts/global.context';
import { View, StyleSheet, Alert, Text, FlatList } from 'react-native';
import { Button } from '../../components';
import { TicketItem } from '../../components/TicketItem';
import { scale } from '../../utils/sizes';

/**
 * Customer screen to see the logged customer ticket and option create the new one
 */
export default function MyTickets(props: NativeStackScreenProps<StackScreens, 'MyTickets'>) {

  const [tickets, setTickets] = React.useState<Ticket[] | null>(null);

  const { user } = React.useContext(GlobalContext);

  const showStatus = (message: string, title: string = '') => {
    Alert.alert(
      title,
      message
    );
  }
  
  const navigateToCreateTicket = React.useCallback(() => {
    props.navigation.navigate('TicketSubmission');
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchUserTickets(user?.id ?? -1)
      .then((allTickets: Ticket[]) => {
        console.log('allTickets --- ', allTickets);
        setTickets([...allTickets]);
      })
      .catch((error) => {
        showStatus('No tickets found');
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  buttonBox: {
    marginVertical: scale(20),
  }
});

