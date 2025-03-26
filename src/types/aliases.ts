import { SELECTION_TYPES } from '../constants';

export type InputType = object | any[];
export type OutputType = object | any[];
export type SelectionType = keyof typeof SELECTION_TYPES;
