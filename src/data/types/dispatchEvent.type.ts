import { EventType } from './event.type';

type DispatchType = 'push' | 'update' | 'delete' | 'move';

export interface DispatchEvent {
  type: DispatchType;
  payload: EventType;
  destIndex?: number;
}