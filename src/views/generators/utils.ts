import axios from 'axios';

import { ConsoleMessageClass } from './types';

export async function executeFunWithAxiosRequests(addConsoleMessage: (consoleMessage: string, messageClass?: ConsoleMessageClass) => void, setLoading: (isLoading: boolean) => void, callback: () => Promise<void>): Promise<void> {
  try {
    setLoading(true);
    await callback();
    setLoading(false);
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        addConsoleMessage(`URL: ${error.response!.config.url}\nStatus: ${error.response!.status}\nData: ${JSON.stringify(error.response!.data, null, 2)}`, 'failure');
      } else {
        addConsoleMessage(`URL: ${error.config!.url}\nCode: ${error.code}`, 'failure');
      }
    } else {
      addConsoleMessage(`Something went wrong...\n${error}`, 'failure');
    }
    setLoading(false);
  }
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const isValidEAN = (ean: string): boolean => {
  const numberPattern = /^[0-9]+$/;
  return ean.includes('DUMMY') || !numberPattern.test(ean) || ean.length !== 9;
};

export const getDateTimeNow = (addDaysNumber = 0): string => {
  const today = new Date();
  return new Date(today.setDate(today.getDate() + addDaysNumber)).toISOString();
};

export const addHours = (date: string, hours: number): string => {
  const result = new Date(date);
  const originalDate = new Date(date);
  result.setHours(originalDate.getHours() + hours);
  return result.toISOString();
};

export const addSeconds = (date: string, seconds: number): string => {
  const result = new Date(date);
  const originalDate = new Date(date);
  result.setSeconds(originalDate.getSeconds() + seconds);
  return result.toISOString();
};

export const addMillis = (date: string): string => date.concat('.000Z');

export const trimMillis = (dateISOString: string): string => dateISOString.substring(0, 19);
