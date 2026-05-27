import { ValueTransformer } from 'typeorm';

export const decimalTransformer: ValueTransformer = {
  to: (value: number) => value,
  from: (value: string) =>
    value !== null ? Math.round(parseFloat(value) * 100) / 100 : null,
};
