import * as React from 'react';
import {StatusBar} from 'expo-status-bar';
import {
  View,
  TextStyle,
  Text,
  ViewStyle,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackScreens} from '../../App';
import {TextField, Button, DropdownComponent, DataItem} from '../../components';
import {fontScale, scale} from '../../utils/sizes';
import {colors} from '../../theme';
import {createTicket, updateTicket} from '../../services/api';
import {isNonEmptyString} from '../../utils/common';
import { GlobalContext } from '../../contexts/global.context';
import { Ticket } from '../../types/types';
import * as DocumentPicker from 'expo-document-picker';

/**
 * Create new ticket by customer or reply to ticket by service team
 */
export default function TicketSubmission({navigation, route}: NativeStackScreenProps<StackScreens, 'TicketSubmission'>) {

  const { user } = React.useContext(GlobalContext);

  const {ticket = null} = route.params ?? {};

  const nameInputRef = React.useRef<any>();
  const emailInputRef = React.useRef<any>();
  const descriptionInputRef = React.useRef<any>();
  const serviceReplyInputRef = React.useRef<any>();

  const [name, setName] = React.useState(ticket?.name ?? '');
  const [email, setEmail] = React.useState(ticket?.email ?? '');
  const [description, setDescription] = React.useState(ticket?.description ?? '');
  const [attachment, setAttachment] = React.useState('');
  const [serviceReply, setServiceReply] = React.useState(ticket?.serviceReply ?? '');
  const [status, setStatus] = React.useState(ticket?.status ?? 'new');
  const [statusData, setStatusData] = React.useState<DataItem[]>([
    {label: 'new', value: 'new'},
    {label: 'in progress', value: 'in progress'},
    {label: 'resolved', value: 'resolved'},
  ])

  const clearForm = () => {
    setName('');
    setEmail('');
    setDescription('');
    setAttachment('');
  };

  const showIssueSubmissionSuccessMessage = () => {
    Alert.alert(
      'Success',
      'Issue submitted successfully', [
        {text: 'OK', onPress: navigation.goBack},
      ]);
  };

  const showIssueSubmissionFailureMessage = (errorMessage: string) => {
    const message = errorMessage || 'Failed to submit issue. Please try agin';

    Alert.alert(
      'Failure',
      message, [
        {text: 'OK', onPress: clearForm},
      ]);
  }

  const onChangeStatus = React.useCallback((statusItem: DataItem) => {
    setStatus(statusItem.value);
  }, []);

  const attach = () => {
    DocumentPicker.getDocumentAsync()
    .then((value: DocumentPicker.DocumentPickerResult) => {
      setAttachment(value?.assets?.[0]?.name ?? '');
    })
    .catch((reason: any) => {
      Alert.alert(
        'Failure',
        'Failed to attach document, please try again'
      );
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

        // focus username input to try refilling the form
        nameInputRef.current.focus();
      } catch (error) {
        showIssueSubmissionFailureMessage('');

        // focus username input to try refilling the form
        nameInputRef.current.focus();
      }
    }, []);

  // name and email field are mendatory in validation for submission
  const disabled = !(isNonEmptyString(name) && isNonEmptyString(email));
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
      behavior="padding"
      enabled
      style={$wrapper}
    >
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={$container}>
        <TextField
          ref={nameInputRef}
          editable={!ticket}
          value={name}
          onChangeText={(text: string) => setName(text)}
          autoCapitalize="none"
          autoCorrect={false}
          label="Name"
          placeholder="Enter"
          placeholderTextColor={"rgba(255, 255, 255, 0.24)"}
          containerStyle={[$textFieldContainerStyle, { marginTop: scale(20) }]}
          inputWrapperStyle={$textFieldBox}
          LabelTextProps={{
            style: $labelStyle,
          }}
          style={$inputStyle}
          onSubmitEditing={() => emailInputRef.current.focus()}
        />
        <TextField
          editable={!ticket}
          ref={emailInputRef}
          value={email}
          onChangeText={(text: string) => setEmail(text)}
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
          label="Email"
          placeholder="Enter"
          placeholderTextColor={"rgba(255, 255, 255, 0.24)"}
          containerStyle={[$textFieldContainerStyle, { marginTop: scale(20) }]}
          inputWrapperStyle={$textFieldBox}
          LabelTextProps={{
            style: $labelStyle,
          }}
          style={$inputStyle}
          onSubmitEditing={() => descriptionInputRef.current.focus()}
        />
        <TextField
          editable={!ticket}
          ref={descriptionInputRef}
          value={description}
          onChangeText={(text: string) => setDescription(text)}
          autoCapitalize="none"
          autoCorrect={false}
          label="Description"
          placeholder="Enter"
          multiline
          placeholderTextColor={"rgba(255, 255, 255, 0.24)"}
          containerStyle={[$textFieldContainerStyle, { marginTop: scale(20) }]}
          inputWrapperStyle={$textFieldBox}
          LabelTextProps={{
            style: $labelStyle,
          }}
          style={$inputStyle}
          onSubmitEditing={() => serviceReplyInputRef.current.focus()}
        />
        {!!ticket && (
          <TextField
            editable={!!ticket}
            ref={serviceReplyInputRef}
            value={serviceReply}
            multiline
            onChangeText={(text: string) => setServiceReply(text)}
            autoCapitalize="none"
            autoCorrect={false}
            label="Service Reply"
            placeholder="Enter"
            placeholderTextColor={"rgba(255, 255, 255, 0.24)"}
            containerStyle={[
              $textFieldContainerStyle,
              { marginTop: scale(20) },
            ]}
            inputWrapperStyle={$textFieldBox}
            LabelTextProps={{
              style: $labelStyle,
            }}
            style={$inputStyle}
            onSubmitEditing={submitTicketCall}
          />
        )}
        <DropdownComponent
          disabled={!ticket}
          value={status}
          data={statusData}
          onChange={onChangeStatus}
          placeholderText="Please select status"
        />
        {!ticket && (
          <Button
            text="Attach Files"
            style={$loginBtnBox}
            onPress={attach}
            disabled={disabled}
          />
        )}
        {!!attachment && (
          <View style={$attachmentNameBox}>
            <Text style={$attachmentNameText}>{attachment}</Text>
          </View>
        )}
        <Button
          text="Submit"
          style={[$loginBtnBox, { marginBottom: scale(20) }]}
          onPress={submitTicketCall}
          disabled={disabled}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const $wrapper: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $container: ViewStyle = {
  alignItems: 'center',
};

const $loginBtnBox: ViewStyle = {
  marginTop: scale(20),
  width: '80%'
};

const $signInBox: ViewStyle = {
  alignItems: 'flex-start',
  marginTop: scale(30),
};

const $textFieldBox: ViewStyle = {
  width: '100%',
  backgroundColor: colors.textFieldBackground,
  borderWidth: 0,
};

const $inputStyle: TextStyle = {
  fontWeight: 'normal',
  color: colors.text,
  fontSize: fontScale(16),
  paddingHorizontal: scale(8),
  paddingVertical: scale(8),
  width: '100%',
};

const $labelStyle: TextStyle = {
  color: colors.text,
  fontSize: fontScale(16),
  lineHeight: scale(19),
  fontWeight: 'bold',
  marginBottom: scale(8),
};

const $textFieldContainerStyle: ViewStyle = {
  marginTop: scale(30),
  width: '80%',
};

const $attachmentNameBox: ViewStyle = {
  marginVertical: scale(20),
};

const $attachmentNameText: TextStyle = {
  fontSize: fontScale(16),
  color: colors.text,
  fontWeight: '500'
}
