export interface Branding {
    colors: {
      primary: string;
      secondary: string;
      buttonColor: string;
      success: string;
      danger: string;
      warning: string;
      info: string;
      light: string;
      dark: string;
      background: string;
      backgroundSecondary: string;
      backgroundCaptureBtn: string;
      textDefault: string;
      textSecondary: string;
      fontRegular: string;
      fontMedium: string;
      fontBold: string;
    };
    images?:{
      card_guidance?:string,
      selfie_guidance?:string,
    }
  }