import {StyleSheet} from 'react-native';
// import branding from '../../branding';
import { getBranding } from '../../branding';

export const styles = StyleSheet.create({
  flipButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 'auto',
  },

  opacity: {
    opacity: 0.3,
  },
  flipCamera: {
    fontSize: 12,
    textAlign: 'center',
    color: getBranding().colors.textDefault,
  },
});
