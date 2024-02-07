import { StyleSheet } from "react-native";
import { colors } from "../../theme";
import { fontScale, scale } from "../../utils/sizes";

const ticketFormStyle = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    alignItems: 'center',
  },
  submitButtonBox: {
    marginTop: scale(20),
    width: '80%'
  },
  textFieldBox: {
    width: '100%',
    backgroundColor: colors.textFieldBackground,
    borderWidth: 0,
  },
  inputStyle: {
    fontWeight: 'normal',
    color: colors.text,
    fontSize: fontScale(16),
    paddingHorizontal: scale(8),
    paddingVertical: scale(8),
    width: '100%',
  },
  labelStyle: {
    color: colors.text,
    fontSize: fontScale(16),
    lineHeight: scale(19),
    fontWeight: 'bold',
    marginBottom: scale(8),
  },
  textFieldContainerStyle: {
    marginTop: scale(30),
    width: '80%',
  },
  attachmentNameBox: {
    marginVertical: scale(20),
  },
  attachmentNameText: {
    fontSize: fontScale(16),
    color: colors.text,
    fontWeight: '500'
  },
});

export {ticketFormStyle};
