import { SelectionType } from "./aliases";

export type BuildProps = {
  /**
   * Default number of repetitions when building arrays/Repetition class
   */
  repetitions?: number;
  /**
   * Selection type for selecting value from Option class
   */
  selectionType?: SelectionType;

  writeDir?: string;

  addSharedValue?: (key: string, value: any) => void;
  getSharedValue?: (key: string) => any;
  getFromGeneration?: (key: string, genNumber?: number) => any;
};
