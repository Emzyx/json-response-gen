export type SharedProps = {
  /**
   * If the build returns an object, if it should spread that result instead of setting it on the given key.
   */
  shouldSpread?: boolean;

  /**
   * Item to either use or build.
   */
  value?: any;
};
