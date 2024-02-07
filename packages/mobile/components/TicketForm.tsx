import React from "react";
import { View, Text } from "react-native";
import { Button } from "./Button";
import { DropdownComponent } from "./Dropdown";
import { TextField } from "./TextField";
import { Attachment, Ticket } from "../types/types";
import { scale } from "../utils/sizes";
import {ticketFormStyle as styles} from "./styles/ticketFormStyle";
import { isNonEmptyString } from "../utils/common";

interface TicketFormProps {
  /**
   * Ticket data
   */
  ticket: Ticket | null;
  /**
   * name of ticket.
   */
  name: string;
  /**
   * Callback to update name.
   */
  onChangeName: (name: string) => void;
  /**
   * email of ticket.
   */
  email: string;
  /**
   * Callback to update email.
   */
  onChangeEmail: (email: string) => void;
  /**
   * description of ticket.
   */
  description: string;
  /**
   * Callback to update description.
   */
  onChangeDescription: (description: string) => void;
  /**
   * reply of customer service team.
   */
  serviceReply: string;
  /**
   * Callback to update service team reply.
   */
  onChangeServiceReply: (serviceReply: string) => void;
  /**
   * status of ticket.
   */
  status: string;
  /**
   * Callback to change name.
   */
  onChangeStatus: (status: string) => void;
  /**
   * click event to attach file.
   */
  attach: () => void;
  /**
   * attachment name.
   */
  attachment: Attachment | null;
  /**
   * click event to submit ticket.
   */
  submit: () => Promise<void>;
}

export function TicketForm(props: TicketFormProps) {

  const nameInputRef = React.useRef<any>();
  const emailInputRef = React.useRef<any>();
  const descriptionInputRef = React.useRef<any>();
  const serviceReplyInputRef = React.useRef<any>();
  const statusData = React.useRef<any>([
    {label: 'new', value: 'new'},
    {label: 'in progress', value: 'in progress'},
    {label: 'resolved', value: 'resolved'},
  ]).current;

  const emailError = React.useMemo(() => {
    if (isNonEmptyString(props.email)) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(props.email) ?
        '' : 'Invalid email';
    }

    return '';
  }, [props.email]);

  // name and email field are mendatory in validation for submission
  const disabled = !(isNonEmptyString(props.name) && isNonEmptyString(props.email)) || !!emailError;

  return (
    <>
      <TextField
        ref={nameInputRef}
        editable={!props.ticket}
        value={props.name}
        onChangeText={props.onChangeName}
        autoCapitalize="none"
        autoCorrect={false}
        label="Name"
        placeholder="Enter"
        placeholderTextColor={"rgba(255, 255, 255, 0.24)"}
        containerStyle={[
          styles.textFieldContainerStyle,
          { marginTop: scale(20) },
        ]}
        inputWrapperStyle={styles.textFieldBox}
        LabelTextProps={{
          style: styles.labelStyle,
        }}
        style={styles.inputStyle}
        onSubmitEditing={() => emailInputRef.current.focus()}
      />
      <TextField
        editable={!props.ticket}
        ref={emailInputRef}
        value={props.email}
        onChangeText={props.onChangeEmail}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        label="Email"
        placeholder="Enter"
        placeholderTextColor={"rgba(255, 255, 255, 0.24)"}
        containerStyle={[
          styles.textFieldContainerStyle,
          { marginTop: scale(20) },
        ]}
        inputWrapperStyle={styles.textFieldBox}
        LabelTextProps={{
          style: styles.labelStyle,
        }}
        style={styles.inputStyle}
        status={!!emailError ? 'error' : undefined}
        helper={emailError}
        onSubmitEditing={() => descriptionInputRef.current.focus()}
      />
      <TextField
        editable={!props.ticket}
        ref={descriptionInputRef}
        value={props.description}
        onChangeText={props.onChangeDescription}
        autoCapitalize="none"
        autoCorrect={false}
        label="Description"
        placeholder="Enter"
        multiline
        placeholderTextColor={"rgba(255, 255, 255, 0.24)"}
        containerStyle={[
          styles.textFieldContainerStyle,
          { marginTop: scale(20) },
        ]}
        inputWrapperStyle={styles.textFieldBox}
        LabelTextProps={{
          style: styles.labelStyle,
        }}
        style={styles.inputStyle}
        onSubmitEditing={() => serviceReplyInputRef.current.focus()}
      />
      {!!props.ticket && (
        <TextField
          editable={!!props.ticket}
          ref={serviceReplyInputRef}
          value={props.serviceReply}
          multiline
          onChangeText={props.onChangeServiceReply}
          autoCapitalize="none"
          autoCorrect={false}
          label="Customer Care Response"
          placeholder="Enter"
          placeholderTextColor={"rgba(255, 255, 255, 0.24)"}
          containerStyle={[
            styles.textFieldContainerStyle,
            { marginTop: scale(20) },
          ]}
          inputWrapperStyle={styles.textFieldBox}
          LabelTextProps={{
            style: styles.labelStyle,
          }}
          style={styles.inputStyle}
          onSubmitEditing={props.submit}
        />
      )}
      {!!props.ticket && (
        <DropdownComponent
          value={props.status}
          data={statusData}
          onChange={(status) => props.onChangeStatus(status.value)}
          placeholderText="Please select status"
        />
      )}
      {!props.ticket && (
        <Button
          text="Attach Files"
          style={styles.submitButtonBox}
          onPress={props.attach}
          disabled={disabled}
        />
      )}
      {!!props.attachment?.name && (
        <View style={styles.attachmentNameBox}>
          <Text style={styles.attachmentNameText}>{props.attachment.name}</Text>
        </View>
      )}
      <Button
        text="Submit"
        style={[styles.submitButtonBox, { marginBottom: scale(20) }]}
        onPress={props.submit}
        disabled={disabled}
      />
    </>
  );
}