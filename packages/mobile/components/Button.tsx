import * as React from "react"
import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native"
import {colors} from "../theme"
import {Text, TextProps} from "./Text"
import {fontScale, scale} from "../utils/sizes"

export interface ButtonAccessoryProps {
  style: StyleProp<any>
  pressableState: PressableStateCallbackType
}

export interface ButtonProps extends PressableProps {
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: TextProps["text"]
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * An optional style override for the button text.
   */
  textStyle?: StyleProp<TextStyle>
  /**
   * Children components.
   */
  children?: React.ReactNode
   /**
   * Disabled button flag
   */
  disabled?: boolean
  /**
   * onPress
   */
  onPress?: ((event: GestureResponderEvent) => void) | undefined
}

/**
 * A component that allows users to take actions and make choices.
 * Wraps the Text component with a TouchableOpacity component.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Button.md)
 */
export function Button(props: ButtonProps) {

  const {
    text,
    style: $viewStyleOverride,
    textStyle: $textStyleOverride,
    children,
    disabled,
    onPress
  } = props

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        $baseViewStyle,
        {backgroundColor: disabled ? colors.inactiveButtonBackground : colors.activeButtonBackground},
        $viewStyleOverride,
      ]}
      accessibilityRole="button"
      disabled={disabled}>
      <Text text={text} style={[$baseTextStyle, $textStyleOverride]}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

const $baseViewStyle: ViewStyle = {
  paddingVertical: scale(14),
  paddingHorizontal: scale(12),
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: colors.activeButtonBackground
}

const $baseTextStyle: TextStyle = {
  fontSize: fontScale(16),
  lineHeight: scale(20),
  fontWeight: 'bold',
  textAlign: "center",
  flexShrink: 1,
  flexGrow: 0,
  zIndex: 2,
  color: colors.text
}
