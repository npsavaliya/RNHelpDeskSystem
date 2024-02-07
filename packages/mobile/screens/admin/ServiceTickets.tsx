import React from 'react';
import { View, Alert, Text, FlatList } from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StatusBar} from 'expo-status-bar';
import {StackScreens} from '../../App';
import {useFocusEffect} from '@react-navigation/native';
import {fetchTickets} from '../../services/api';
import { Attachment, Ticket } from '../../types/types';
import { TicketItem } from '../../components/TicketItem';
import { styles } from './serviceTicketsStyle';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Toast from 'react-native-root-toast';
import { colors } from '../../theme';

/**
 * See tickets of all users for service team, this feature requires pagination which is not implemented for this demo
 */
export default function ServiceTickets(props: NativeStackScreenProps<StackScreens, 'ServiceTickets'>) {

  const [tickets, setTickets] = React.useState<Ticket[] | null>(null);

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

  const navigateToAttachment = (attachment: Attachment) => {
    let filePath = attachment.uri.split('file:///').pop();
    ReactNativeBlobUtil.fs.exists(filePath as string)
      .then((exist) => {
        console.log(`file ${exist ? '' : 'not'} exists`)
        if (exist) {
          props.navigation.navigate('AttachmentScreen', {attachment});
        } else {
          Toast.show('File does not exist', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.TOP,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
            textColor: colors.error
          });
        }
      })
      .catch(() => {
        Toast.show('File does not exist', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
          textColor: colors.error
        });
      });
  }

  const onPressTicket = React.useCallback((ticket: Ticket) => () => {
    props.navigation.navigate('TicketReview', {ticket});
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        data={tickets}
        renderItem={({item}) => (
          <TicketItem
            ticket={item}
            onPress={onPressTicket(item)}
            onPressAttachment={navigateToAttachment}
          />
        )}
        keyExtractor={item => String(item.id)}
      />
    </View>
  )
}
