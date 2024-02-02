import React from "react";
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { fontScale, metrics, scale } from "../utils/sizes";
import { Status } from "../types/types";
import { colors } from "../theme";

export interface DataItem {
  label: Status;
  value: Status;
}

export interface DropdownComponentProps {
  /**
   * array of data for dropdown.
   */
  data: DataItem[];
  /**
   * selected value of Dropdown.
   */
  value: string;
  /**
   * An optional container style.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * An optional style override for the button text.
   */
  selectTextStyle?: StyleProp<TextStyle>;
  /**
   * onChange callback.
   */
  onChange: ((item: DataItem) => void);
  /**
   * placeholder text.
   */
  placeholderText: string;
  /**
   * label field text.
   */
  labelField?: keyof DataItem;
  /**
   * value field text.
   */
  valueField?: keyof DataItem;
  /**
   * disable dropdown.
   */
  disabled?: boolean;
}

export const DropdownComponent = ({
  selectTextStyle,
  style,
  data,
  value,
  onChange,
  placeholderText,
  labelField = 'label',
  valueField = 'value',
  disabled = false,
}: DropdownComponentProps) => {

  const selectedTextStyle = [styles.selectedTextStyle, selectTextStyle];
  const dropdownStyle = [styles.dropdown, style];

  return (
    <Dropdown
      style={dropdownStyle}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={selectedTextStyle}
      disable={disabled}
      data={data}
      search={false}
      maxHeight={300}
      labelField={labelField}
      valueField={valueField}
      placeholder={placeholderText}
      value={value}
      onChange={onChange}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    margin: scale(16),
    height: scale(50),
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    width: '80%'
  },
  placeholderStyle: {
    fontSize: fontScale(16),
  },
  selectedTextStyle: {
    fontSize: fontScale(16),
    color: colors.text
  },
});
