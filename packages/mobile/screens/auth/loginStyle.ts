import { StyleSheet } from "react-native";
import { colors } from "../../theme";
import { fontScale, scale } from "../../utils/sizes";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  loginBtnBox: {
    width: '80%',
    alignItems: 'center',
    marginTop: scale(30),
  },
  signInBox: {
    alignItems: 'flex-start',
    marginTop: scale(30),
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
  eyeIconBox: {
    marginRight: scale(15),
  },
  eyeIcon: {
    height: scale(20),
    width: scale(20),
    resizeMode: 'contain',
  },
});

export {styles};
