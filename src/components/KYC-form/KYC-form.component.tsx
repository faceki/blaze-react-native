import {Image, Text, View, ActivityIndicator, Platform} from 'react-native';
import {useState} from 'react';
import {styles} from './styles';
import {CheckBox} from '@rneui/themed';
// import branding from '../../branding';
import {globalStyles} from '../../../globalStyles';
import { useMyStepsVerification } from '../../provider/verification.context';
import { getBranding } from '../../branding';

const IDCARD = '../../assets/id1.png';

/**
 * A component for displaying the KYC form and allowing the user to select a document type.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.handleOptionChange - A function that handles changes to the selected document type.
 * @param {Array} props.allowedKycDocuments - An array of allowed KYC document types.
 * @param {boolean} props.loading - A boolean indicating whether the KYC form is currently loading.
 * @param {boolean} props.kycRuleError - A boolean indicating whether there was an error retrieving KYC rules from the server.
 * @returns {JSX.Element} - The rendered component as a JSX element.
 */

type props = {
  handleOptionChange: (event: string) => void;
  allowedKycDocuments: string[];
  loading: boolean;
  kycRuleError: boolean;
  selectedOption: string;
};

const KYCForm = ({
  handleOptionChange,
  allowedKycDocuments,
  loading,
  kycRuleError,
  selectedOption,
}: props) => {
  const [selectedIndex, setIndex] = useState(
    allowedKycDocuments?.find(x => x == selectedOption) ||
      allowedKycDocuments[0],
  );
  let context = useMyStepsVerification()
  const handleChange = (event: any) => {
    setIndex(event);
    handleOptionChange(event);
  };

  const loader =
    Platform.OS === 'ios' ? (
      <Text style={[styles.loading, globalStyles.textBold]}>Loading...</Text>
    ) : (
      <Text style={[styles.loading, globalStyles.textBold]}>Loading...</Text>
    );

  return (
    <View
      style={[
        styles.container,
        loading || kycRuleError ? styles.loadingContainer : undefined,
      ]}>
      {loading && <>{loader}</>}
      {kycRuleError && (
        <Text style={[styles.error, globalStyles.textBold]}>Server error</Text>
      )}
      {allowedKycDocuments?.map(content => (
        <View style={styles.box} key={content}>
          <CheckBox
            checked={selectedIndex === content}
            onPress={() => handleChange(content)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            style={styles.checkedIcon}
            containerStyle={styles.containerCheckbox}
            checkedColor={getBranding()?.colors?.primary}
          />
          <Image style={styles.tinyLogo} source={require(IDCARD)} />
          <Text style={[styles.boxText, globalStyles.textRegular]}>
            {content}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default KYCForm;
