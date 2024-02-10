import { Label } from './label.type';

export interface EventType {
  title: string;
  description: string;
  label: Label;
  day: number;
  id: number;
  index: number
}