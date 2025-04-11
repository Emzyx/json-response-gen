export type RepetitionProps = {
  /**
   * Length of array if not shared, or not using the buildOptions
   */
  repetitions?: number;

  /**
   * Path to array to be built off of
   */
  baseArrayPath?: string;

  sharedKeysMap?: {
    /**
     * Array of keys from array you intend on using to share from
     */
    toShare?: string[];

    /**
     * Object of oldKey: [newKey, newkey2]
     * We use an array so you can declare more keys to use the same value
     */
    toRename?: {
      [key: string]: string[];
    };
  };
};
