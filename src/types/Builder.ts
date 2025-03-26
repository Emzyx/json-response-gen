import { SelectionType } from './aliases';

export type BuildOptions = {
  /**
   * Names for the files, defaults to non-descriptive names otherwise
   */
  names?: string[];
  /**
   * Default number of repetitions when building arrays/Repetition class
   */
  repetitions?: number;
  /**
   * Selection type for selecting value from Option class
   */
  selectionType?: SelectionType;

  addSharedValue?: (key: string, value: any) => void;
  getSharedValue?: (key: string) => any;
  getFromGeneration?: (key: string, genNumber?: number) => any;
};
