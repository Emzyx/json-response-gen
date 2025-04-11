export type OptionProps = {
  /**
   * If the build returns an object, if it should spread that result instead of setting it on the given key.
   */
  shouldSpread?: boolean;

  /**
   * Order in how items should be picked from provided array.
   */
  selectionType?: string;
};
