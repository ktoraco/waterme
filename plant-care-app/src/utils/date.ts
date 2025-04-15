import { format, parseISO, isBefore, isToday, addDays } from 'date-fns';

export const formatDate = (dateString: string): string => {
  return format(parseISO(dateString), 'yyyy/MM/dd');
};

export const isDateBeforeToday = (dateString: string): boolean => {
  return isBefore(parseISO(dateString), new Date());
};

export const isDateToday = (dateString: string): boolean => {
  return isToday(parseISO(dateString));
};

export const getNextWateringDate = (lastWatered: string, frequencyDays: number): string => {
  return format(addDays(parseISO(lastWatered), frequencyDays), 'yyyy/MM/dd');
};