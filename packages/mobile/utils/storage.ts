import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/types';

export const storageKeys = {
  user: 'user'
}

/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
export async function loadString(key: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(key)
  } catch {
    return null
  }
}

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function saveString(key: string, value: string): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, value)
    return true
  } catch {
    return false
  }
}

export async function saveUser(key: string, value: User): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export async function fetchUser(key: string): Promise<User | null> {
  try {
    const user = await AsyncStorage.getItem(key);

    if (user != null) {
      return JSON.parse(user) as User;
    }
    
    return user;
  } catch {
    return null;
  }
}

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 * 
 */
export async function remove(key: string): Promise<boolean> {
  try {
    await AsyncStorage.removeItem(key)
    return true;
  } catch {
    return false
  }
}

