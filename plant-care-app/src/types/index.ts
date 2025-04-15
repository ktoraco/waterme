export type WaterLog = {
  date: string; // ISO形式
  note?: string;
  imageUrl?: string;
};

export type Plant = {
  id: string;
  name: string;
  species?: string;
  light?: 'sun' | 'shade' | 'partial';
  waterFrequencyDays: number;
  lastWatered: string;
  notes?: string;
  waterLogs: WaterLog[];
};