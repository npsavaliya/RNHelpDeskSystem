import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackScreens } from "../../App";
import PDFView from "react-native-pdf";

export default function AttachmentScreen(
  props: NativeStackScreenProps<StackScreens, "AttachmentScreen">
) {

  const uri = React.useMemo(() => {
    return props.route.params.attachment?.uri as string;
  }, [props.route.params.attachment?.uri]);

  return (
    <View style={styles.container}>
      {uri ? (
        <PDFView
          source={{ uri: uri as string }}
          onLoadComplete={() => console.log("PDF loaded")}
          onError={(error) => console.log("Error loading PDF:", error)}
          style={{ flex: 1 }}
        />
      ) : (
        <ActivityIndicator size="large" color={'green'} />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
