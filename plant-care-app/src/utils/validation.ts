import { z } from 'zod';

export const plantSchema = z.object({
  name: z.string().min(1, '植物の名前は必須です。'),
  species: z.string().optional(),
  light: z.enum(['sun', 'shade', 'partial'], {
    errorMap: () => ({ message: '日照条件は必須です。' }),
  }),
  waterFrequencyDays: z.number().min(1, '水やり頻度は1日以上でなければなりません。'),
  lastWatered: z.string().optional(),
  notes: z.string().optional(),
});

export const validatePlant = (data: any) => {
  return plantSchema.safeParse(data);
};