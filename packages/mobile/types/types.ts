import { DocumentPickerResult } from "expo-document-picker";

export interface User {
  id: number;
  username: string;
}

export type Status = 'new' | 'in progress' | 'resolved';

export interface Ticket {
  id: number;
  userId: number;
  name: string;
  email: string;
  attachment: string;
  description: string;
  status: Status,
  serviceReply: string;
}
