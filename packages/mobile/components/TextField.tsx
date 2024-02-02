import * as React from 'react';
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { colors } from '../theme';
import { Text, TextProps } from './Text';
import { fontScale, scale } from '../utils/sizes';

export interface TextFieldAccessoryProps {
  style: StyleProp<any>;
  status: TextFieldProps['status'];
  multiline: boolean;
  editable: boolean;
}

export interface TextFieldProps extends Omit<TextInputProps, 'ref'> {
  /**
   * A style modifier for different input states.
   */
  status?: 'error' | 'disabled';
  /**
   * The label text to display.
   */
  label?: TextProps['text'];
  /**
   * Pass any additional props directly to the label Text component.
   */
  LabelTextProps?: TextProps;
  /**
   * The helper text to display.
   */
  helper?: TextProps['text'];
  /**
   * Pass any additional props directly to the helper Text component.
   */
  HelperTextProps?: TextProps;
  /**
   * The placeholder text to display`.
   */
  placeholder?: TextProps['text'];
  /**
   * Optional input style override.
   */
  style?: StyleProp<TextStyle>;
  /**
   * Style overrides for the container
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Style overrides for the input wrapper
   */
  inputWrapperStyle?: StyleProp<ViewStyle>;
  /**
   * An optional component to render on the right side of the input.
   * Example: `RightAccessory={(props) => <Icon icon='ladybug' containerStyle={props.style} color={props.editable ? colors.textDim : colors.text} />}`
   * Note: It is a good idea to memoize this.
   */
  RightAccessory?: React.ComponentType<TextFieldAccessoryProps>;
  /**
   * An optional component to render on the left side of the input.
   * Example: `LeftAccessory={(props) => <Icon icon='ladybug' containerStyle={props.style} color={props.editable ? colors.textDim : colors.text} />}`
   * Note: It is a good idea to memoize this.
   */
  LeftAccessory?: React.ComponentType<TextFieldAccessoryProps>;
}

/**
 * A component that allows for the entering and editing of text.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-TextField.md)
 */
export const TextField = React.forwardRef((props: TextFieldProps, ref: React.Ref<TextInput>) => {

  const {
    label,
    placeholder,
    helper,
    status,
    RightAccessory,
    LeftAccessory,
    HelperTextProps,
    LabelTextProps,
    style: $inputStyleOverride,
    containerStyle: $containerStyleOverride,
    inputWrapperStyle: $inputWrapperStyleOverride,
    ...TextInputProps
  } = props;

  const input = React.useRef<any>(null);

  const disabled = TextInputProps.editable === false || status === 'disabled';

  const $containerStyles = [$containerStyleOverride];

  const $labelStyles = [$labelStyle, LabelTextProps?.style];

  const $inputWrapperStyles: StyleProp<ViewStyle> = [
    $inputWrapperStyle,
    status === 'error' && { borderColor: colors.error },
    TextInputProps.multiline && { minHeight: scale(112) },
    LeftAccessory && { paddingStart: 0 },
    RightAccessory && { paddingEnd: 0 },
    $inputWrapperStyleOverride,
  ];

  const $inputStyles: StyleProp<TextStyle> = [
    $inputStyle,
    disabled && { color: colors.textDim },
    TextInputProps.multiline && { height: 'auto' },
    $inputStyleOverride,
  ];

  const $helperStyles: StyleProp<TextStyle> = [
    $helperStyle,
    status === 'error' && { color: colors.error },
    HelperTextProps?.style,
  ];

  function focusInput() {
    if (disabled) return;

    input.current?.focus();
  }

  React.useImperativeHandle(ref, () => input?.current, []);

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={$containerStyles}
      onPress={focusInput}
      accessibilityState={{ disabled }}
    >
      {!!label && (
        <Text
          preset='formLabel'
          text={label}
          {...LabelTextProps}
          style={$labelStyles}
        />
      )}

      <View style={$inputWrapperStyles}>
        {!!LeftAccessory && (
          <LeftAccessory
            style={$leftAccessoryStyle}
            status={status}
            editable={!disabled}
            multiline={!!TextInputProps.multiline}
          />
        )}

        <TextInput
          ref={input}
          underlineColorAndroid={colors.transparent}
          textAlignVertical='top'
          placeholder={placeholder}
          placeholderTextColor={colors.textDim}
          {...TextInputProps}
          editable={!disabled}
          style={$inputStyles}
        />

        {!!RightAccessory && (
          <RightAccessory
            style={$rightAccessoryStyle}
            status={status}
            editable={!disabled}
            multiline={!!TextInputProps.multiline}
          />
        )}
      </View>

      {!!helper && (
        <Text
          preset='formHelper'
          text={helper}
          {...HelperTextProps}
          style={$helperStyles}
        />
      )}
    </TouchableOpacity>
  );
})

const $labelStyle: TextStyle = {
  marginBottom: scale(8),
};

const $inputWrapperStyle: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderRadius: scale(4),
  backgroundColor: colors.palette.neutral200,
  borderColor: colors.palette.neutral400,
  overflow: 'hidden',
};

const $inputStyle: TextStyle = {
  flex: 1,
  alignSelf: 'stretch',
  fontWeight: '400',
  color: colors.text,
  fontSize: fontScale(16),
  paddingVertical: 0,
  paddingHorizontal: 0,
  marginVertical: scale(8),
  marginHorizontal: scale(12),
};

const $helperStyle: TextStyle = {
  marginTop: scale(8),
};

const $rightAccessoryStyle: ViewStyle = {
  marginEnd: scale(8),
  height: scale(40),
  justifyContent: 'center',
  alignItems: 'center',
};

const $leftAccessoryStyle: ViewStyle = {
  marginStart: scale(8),
  height: scale(40),
  justifyContent: 'center',
  alignItems: 'center',
};
