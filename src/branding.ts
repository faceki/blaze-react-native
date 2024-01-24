import { Branding } from "./service/types/interfaces";

// Initial branding object
let branding: Branding = {
  colors: {
    primary: '#F8B427',
    secondary: '#343333',
    buttonColor: 'rgba(253, 181, 40, 0.10)',
    success: '#59C547',
    danger: '#FF3B30',
    warning: '#FF9500',
    info: '#5AC8FA',
    light: '#F5F5F5',
    dark: '#1C1C1E',
    background: '#f5f5f5',
    backgroundSecondary: '#eeeeee',
    backgroundCaptureBtn: '#F6F6F7',
    textDefault: '#444343',
    textSecondary: '#3E3E3E',
    fontRegular:"Inter",
    fontMedium:"Inter-Medium",
    fontBold:"Inter-Bold"
  },
};

// Function to get the current branding object
export function getBranding(): Branding {
  return branding;
}

// Function to update the branding object
export function updateBranding(newBranding: Branding): void {
  branding = newBranding;
}

export default branding