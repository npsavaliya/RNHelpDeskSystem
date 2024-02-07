import { DocumentPickerResult } from "expo-document-picker";

export interface User {
  id: number;
  username: string;
}

export type Status = 'new' | 'in progress' | 'resolved';

export interface Attachment {
  name: string;
  uri: string;
}

export interface Ticket {
  id: number;
  userId: number;
  name: string;
  email: string;
  attachment: Attachment | null;
  description: string;
  status: Status,
  serviceReply: string;
}
