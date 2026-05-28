import { ValueTransformer } from 'typeorm';

export const roundTo2Decimals = (value: string) =>
  Math.round(parseFloat(value) * 100) / 100;

export const decimalTransformer: ValueTransformer = {
  to: (value: number) => value,
  from: (value: string) => (value !== null ? roundTo2Decimals(value) : null),
};
