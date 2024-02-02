import { Platform, Dimensions, PixelRatio } from 'react-native';

const { height, width } = Dimensions.get('window');

interface Metrics {
  screenWidth: number;
  screenHeight: number;
}

export const metrics: Metrics = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
};

//Guideline size are based on standard screen mobile device
const guidelineBaseWidth: number = 375;

export const scale = (size: number) => (width / guidelineBaseWidth) * size;

export const fontScale = (size: number) => {
  let newSize = scale(size);

  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
}

export const getLineHeight = (fontSize: number) => {

  const multiplier = (fontSize > 20) ? 1.5 : 1;

  return Math.floor(fontSize + (fontSize * multiplier));
}
