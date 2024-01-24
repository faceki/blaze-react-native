import FacekiSDK from './App';
import {
  useMyStepsVerification,
  VerificationProvider,
} from './src/provider/verification.context';
import { FacekiApiResponse } from './src/service/types/facekiresponse';
import { Branding } from './src/service/types/interfaces';

export { useMyStepsVerification, VerificationProvider,FacekiApiResponse};
  export type { Branding };

// wrap the app
// <VerificationProvider>
// // ...
// </VerificationProvider>

export default FacekiSDK;
