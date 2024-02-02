import { Ticket, User } from "../types/types";
import { remove, storageKeys } from "../utils/storage";

export interface LoginResponse {
  status: 200 | 404;
  user: User;
  tickets: Ticket[];
}

export interface Error {
  status: 404
}

export async function loginUser(username: string, password: string): Promise<LoginResponse> {

  try {
    const res = await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      }),
    });

    const response = await res.json();
    
    return response;
  } catch (error) {
    throw error;
  }
}

export async function logout(): Promise<boolean> {

  try {
    const isLoggedOut = await remove(storageKeys.user);;
  
    return isLoggedOut;
  } catch (error) {
    throw error;
  }
}

export async function fetchTickets(): Promise<Ticket[]> {

  try {
    const res = await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/api/tickets`, {
      method: 'GET',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
    });

    const registerResponse = await res.json();

    return registerResponse;
  } catch (error) {
    throw error;
  }
}

export async function fetchUserTickets(userId: number): Promise<Ticket[]> {

  try {
    const res = await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/api/${userId}/tickets`, {
      method: 'GET',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
    });

    const registerResponse = await res.json();

    return registerResponse;
  } catch (error) {
    throw error;
  }
}

export async function createTicket(ticket: Ticket): Promise<Ticket[]> {

  try {
    const res = await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/api/ticket/create`, {
      method: 'POST',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ticket),
    });

    return res.json();
  } catch (error) {
    throw error;
  }
}

export async function updateTicket(ticket: Ticket): Promise<Ticket[]> {

  try {
    const res = await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/api/ticket/update`, {
      method: 'POST',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ticket),
    });

    return res.json();
  } catch (error) {
    throw error;
  }
}
