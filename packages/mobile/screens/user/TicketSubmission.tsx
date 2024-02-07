import * as React from 'react';
import {StatusBar} from 'expo-status-bar';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackScreens} from '../../App';
import {createTicket, updateTicket} from '../../services/api';
import { GlobalContext } from '../../contexts/global.context';
import { Attachment, Status, Ticket } from '../../types/types';
import * as DocumentPicker from 'expo-document-picker';
import { styles } from './ticketSubmissionStyle';
import Toast from 'react-native-root-toast';
import { colors } from '../../theme';
import { TicketForm } from '../../components/TicketForm';

type UpdateCallbackType = 'name' | 'email' | 'description' | 'serviceReply' | 'status';

/**
 * Create new ticket by customer or reply to ticket by service team
 */
export default function TicketSubmission({navigation, route}: NativeStackScreenProps<StackScreens, ('TicketSubmission' | 'TicketReview')>) {

  const { user } = React.useContext(GlobalContext);

  const {ticket = null} = route.params ?? {};

  const [name, setName] = React.useState(ticket?.name ?? '');
  const [email, setEmail] = React.useState(ticket?.email ?? '');
  const [description, setDescription] = React.useState(ticket?.description ?? '');
  const [attachment, setAttachment] = React.useState<Attachment | null>(null);
  const [serviceReply, setServiceReply] = React.useState(ticket?.serviceReply ?? '');
  const [status, setStatus] = React.useState(ticket?.status ?? 'new');

  const showIssueSubmissionSuccessMessage = () => {
    Toast.show('Issue submitted successfully', {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      textColor: colors.palette.green500,
    });

    setTimeout(() => {
      navigation.goBack();
    }, 1000);
  };

  const showIssueSubmissionFailureMessage = (errorMessage: string) => {
    const message = errorMessage || 'Failed to submit issue. Please try agin';

    Toast.show(message, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      textColor: colors.error
    });
  }

  const onUpdate = React.useCallback((field: UpdateCallbackType) => (value: string) => {
    if (field === 'name') {
      setName(value);
    } else if (field === 'email') {
      setEmail(value);
    } else if (field === 'description') {
      setDescription(value);
    } else if (field === 'serviceReply') {
      setServiceReply(value);
    } else if (field === 'status') {
      setStatus(value as Status);
    }
  }, []);

  const attach = () => {
    DocumentPicker.getDocumentAsync()
    .then((value: DocumentPicker.DocumentPickerResult) => {
      setAttachment(value?.assets?.[0] ?? null);
    })
    .catch((reason: any) => {
      Toast.show('Failed to attach document, please try again', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        textColor: colors.error
      });
    })
  }

  /**
   * submits the update from admin support team
   * or
   * submits the new tickets from customers
   */
  const submitTicket = React.useCallback(({
    name,
    email,
    attachment,
    description,
    serviceReply,
    status,
  }: Ticket) =>
    async () => {
      try {
        const createTicketResponse = await (ticket ? updateTicket({
          ...ticket,
          status,
          serviceReply
        }) : createTicket({
          id: -1,
          userId: user?.id ?? -1,
          name,
          email,
          attachment,
          description,
          serviceReply,
          status,
        }));
        if (Array.isArray(createTicketResponse) && createTicketResponse.length > 0) {

          showIssueSubmissionSuccessMessage();
          return;
        }

        showIssueSubmissionFailureMessage('');
      } catch (error) {
        // console.log('create ticket error --- ', error);
        // console.log('create ticket error --- ', JSON.stringify(error));
        showIssueSubmissionFailureMessage('');
      }
    }, []);

  const submitTicketCall = submitTicket({
    name,
    email,
    description,
    attachment,
    userId: user?.id ?? -1,
    id: ticket?.id ?? -1,
    status,
    serviceReply,
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? undefined : "padding"}
      enabled
      style={styles.wrapper}
    >
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.container}>
        <TicketForm
          ticket={ticket}
          name={name}
          onChangeName={onUpdate('name')}
          email={email}
          onChangeEmail={onUpdate('email')}
          description={description}
          onChangeDescription={onUpdate('description')}
          serviceReply={serviceReply}
          onChangeServiceReply={onUpdate('serviceReply')}
          status={status}
          onChangeStatus={onUpdate('status')}
          attach={attach}
          attachment={attachment}
          submit={submitTicketCall}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
