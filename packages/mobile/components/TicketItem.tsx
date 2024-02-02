import * as React from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { colors } from '../theme';
import { Text } from './Text';
import { fontScale, metrics, scale } from '../utils/sizes';
import { Ticket } from '../types/types';

export interface TicketItemProps {
  /**
   * The ticket details.
   */
  ticket?: Ticket;
  /**
   * Style overrides for the container
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * onPress
   */
  onPress?: ((event: GestureResponderEvent) => void) | undefined
  
}

/**
 * A component that allows for the entering and editing of text.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-TextField.md)
 */
export const TicketItem = (props: TicketItemProps) => {

  const {
    ticket,
    containerStyle: $containerStyleOverride,
    onPress,
  } = props;

  const $containerStyles = [$container, $containerStyleOverride];

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={$containerStyles}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={$innerBox}>
      {!!ticket?.name && (
        <View style={$view}>
          <Text
            text={ticket.name}
            style={$text}
          />
        </View>
      )}
      {!!ticket?.email && (
        <View style={$view}>
          <Text
            text={`Email: ${ticket.email}`}
            style={$text}
          />
        </View>
      )}
      {!!ticket?.description && (
        <View style={$view}>
          <Text
            text={`${ticket.description}`}
            style={$text}
          />
        </View>
      )}
      {!!ticket?.attachment && (
        <View style={$view}>
          <Text
            text={`Attachment: ${ticket.attachment}`}
            style={$text}
          />
        </View>
      )}
      {!!ticket?.serviceReply && (
        <View style={$view}>
          <Text
            text={`Reply: ${ticket.serviceReply}`}
            style={$text}
          />
        </View>
      )}
      {!!ticket?.status && (
        <View style={$view}>
          <Text
            text={`Status: ${ticket.status}`}
            style={$text}
          />
        </View>
      )}
      </View>
    </TouchableOpacity>
  );
}

const $container: ViewStyle = {
  paddingHorizontal: scale(15),
  width: metrics.screenWidth,

};

const $innerBox: ViewStyle = {
  paddingVertical: scale(15),
  borderBottomColor: colors.border,
  borderBottomWidth: scale(1.5),
  width: '100%',
}

const $text: TextStyle = {
  fontSize: fontScale(16),
  color: colors.text
}

const $view: ViewStyle = {

}
