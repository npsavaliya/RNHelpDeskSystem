
const palette = {
  neutral100: "#FFFFFF",
  neutral200: "#F4F2F1",
  neutral300: "#D7CEC9",
  neutral400: "#B6ACA6",
  neutral480: "#B08080",
  neutral500: "#978F8A",
  neutral600: "#564E4A",
  neutral700: "#3C3836",
  neutral750: "#33424C",
  neutral780: '#27333B',
  neutral800: "#191015",
  neutral900: "#000000",

  primary100: "#F4E0D9",
  primary200: "#E8C1B4",
  primary300: "#DDA28E",
  primary400: "#D28468",
  primary500: "#C76542",
  primary600: "#A54F31",
  primary700: "#F98338",

  angry100: "#F2D6CD",
  angry500: "#C03403",

  green500: "#26A046",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",
}

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: palette.neutral100,
  /**
   * Secondary text information.
   */
  textDim: palette.neutral100,
  /**
   * The default color of the screen background.
   */
  background: palette.neutral750,
  /**
   * The default border color.
   */
  border: palette.neutral400,
  /**
   * The main tinting color.
   */
  tint: palette.primary500,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral500,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   */
  errorBackground: palette.angry100,
  /**
   * Activity Indicator color.
   */
  loader: palette.green500,
  /**
   * TextField Background.
   */
  textFieldBackground: palette.neutral780,
  /** 
   * inactive Button Background
   */
  inactiveButtonBackground: palette.neutral300,
  /** 
   * active Button Background
   */
  activeButtonBackground: palette.green500,
}
