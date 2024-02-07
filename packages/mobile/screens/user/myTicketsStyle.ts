import { StyleSheet } from "react-native";
import { colors } from "../../theme";
import { scale } from "../../utils/sizes";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  buttonBox: {
    marginVertical: scale(20),
  }
});

export {styles};
