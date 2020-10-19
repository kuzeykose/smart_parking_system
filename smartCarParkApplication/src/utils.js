import { Platform, PixelRatio, Picker } from 'react-native'

export function getPixelSize(pixels) {
  return Platform.select({
    ios: pixels,
    android: PixelRatio.getPixelSizeForLayoutSize()
  })
}