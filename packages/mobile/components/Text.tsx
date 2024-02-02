import {StyleProp, Text as RNText, TextProps as RNTextProps, TextStyle} from 'react-native';
import {colors} from '../theme';

type Sizes = keyof typeof $sizeStyles
type Weights = TextStyle['fontWeight']
type Presets = keyof typeof $presets

export interface TextProps extends RNTextProps {
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string;
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>;
  /**
   * One of the different types of text presets.
   */
  preset?: Presets;
  /**
   * Text weight modifier.
   */
  weight?: Weights;
  /**
   * Text size modifier.
   */
  size?: Sizes;
  /**
   * Children components.
   */
  children?: React.ReactNode;
}

/**
 * For your text displaying needs.
 * This component is a HOC over the built-in React Native one.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Text.md)
 */
export function Text(props: TextProps) {
  
  const {
    weight = 'normal',
    size = 'md',
    text,
    children,
    style: $styleOverride,
    ...rest
  } = props;

  const content = text || children;

  const preset: Presets = props.preset || 'default';

  const $styles: StyleProp<TextStyle> = [
    $presets[preset],
    $sizeStyles[size],
    $styleOverride,
    {fontWeight: weight},
  ];

  return (
    <RNText {...rest} style={$styles}>
      {content}
    </RNText>
  );
}

const $sizeStyles = {
  xxl: { fontSize: 36, lineHeight: 44 } as TextStyle,
  xl: { fontSize: 24, lineHeight: 34 } as TextStyle,
  lg: { fontSize: 20, lineHeight: 32 } as TextStyle,
  md: { fontSize: 18, lineHeight: 26 } as TextStyle,
  sm: { fontSize: 16, lineHeight: 24 } as TextStyle,
  xs: { fontSize: 14, lineHeight: 21 } as TextStyle,
  xxs: { fontSize: 12, lineHeight: 18 } as TextStyle,
};

const $baseStyle: StyleProp<TextStyle> = [
  $sizeStyles.sm,
  {color: colors.text, fontWeight: '500'},
];

const $presets = {
  default: $baseStyle,

  bold: [$baseStyle, {fontWeight: 'bold'}] as StyleProp<TextStyle>,

  heading: [$baseStyle, $sizeStyles.xxl, {fontWeight: 'bold'}] as StyleProp<TextStyle>,

  subheading: [$baseStyle, $sizeStyles.lg, {fontWeight: '500'}] as StyleProp<TextStyle>,

  formLabel: [$baseStyle, {fontWeight: '500'}] as StyleProp<TextStyle>,

  formHelper: [$baseStyle, $sizeStyles.sm, {fontWeight: '400'}] as StyleProp<TextStyle>,
};

