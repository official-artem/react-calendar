import { EventType } from './event.type';

type DispatchType = 'push' | 'update' | 'delete';

export interface DispatchEvent {
  type: DispatchType;
  payload: EventType;
}