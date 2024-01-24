import {StyleSheet} from 'react-native';
// import branding from '../../branding';
import { getBranding } from '../../branding';

export const styles = StyleSheet.create({
  captureBtn: {
    backgroundColor: getBranding().colors.backgroundCaptureBtn,
    width: 70,
    height: 70,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: getBranding().colors.primary,
    borderWidth: 1,
  },
  opacity: {
    opacity: 0.3,
  },
});
