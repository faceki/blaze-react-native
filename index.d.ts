import FacekiSDK from './App';
import {
  useMyStepsVerification,
  VerificationProvider,
} from './src/provider/verification.context';
import { MultiDocumentKYCResponseClass,SingleDocumentKYCResponseClass } from './src/service/types/facekiresponse';

export {useMyStepsVerification, VerificationProvider, MultiDocumentKYCResponseClass,SingleDocumentKYCResponseClass};

// wrap the app
// <VerificationProvider>
// // ...
// </VerificationProvider>

export default FacekiSDK;
