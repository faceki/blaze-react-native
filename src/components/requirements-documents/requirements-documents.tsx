import {Alert, Image, Linking, Pressable, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {styles} from './styles';

const IDCARD = '../../assets/id1.png';
const SELFIE = '../../assets/selfie.png';
const IDCARDBACK = '../../assets/id_card_back.png';
import {CheckBox} from '@rneui/themed';
// import branding from '../../branding';
import {globalStyles} from '../../../globalStyles';
import { getBranding } from '../../branding';

/**
 * A component for displaying the required documents for the KYC process and allowing the user to confirm their consent to the terms of use.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isChecked - A boolean indicating whether the user has confirmed their consent.
 * @param {Function} props.handleCheckbox - A function that handles changes to the consent checkbox.
 * @param {string} props.selectedOption - The selected KYC document type.
 * @returns {JSX.Element} - The rendered component as a JSX element.
 */

type RequirementsDocumentsProps = {
  isChecked: boolean;
  handleCheckbox: () => void;
  selectedOption: string[];
  consenttermofuseLink?: string;
};

const RequirementsDocuments = ({
  isChecked,
  handleCheckbox,
  selectedOption,
  consenttermofuseLink,
}: RequirementsDocumentsProps) => {
  const [documentSteps, setDocumentSteps] = useState<any[]>([]);

  useEffect(() => {
    var steps: any[] = [];
    selectedOption.map(item => {
      if (item == 'Passport') {
        steps.push('Picture of your ' + item + ' First Page');
      } else {
        steps.push('Picture of your ' + item + ' Front');
        steps.push('Picture of your ' + item + ' Back');
      }
    });
    steps.push('Take your selfie');
    setDocumentSteps(steps);
  }, [selectedOption]);

  const handleClick = async () => {
    if (consenttermofuseLink) {
      const supported = await Linking.canOpenURL(consenttermofuseLink);
      if (supported) {
        await Linking.openURL(consenttermofuseLink);
      } else {
        Alert.alert(`Don't know how to open this URL: ${consenttermofuseLink}`);
      }
    }
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={{flex: 1, flexDirection: 'column', marginTop: '10%'}}>
          {documentSteps.map((item, index) => {
            return (
              <View key={index} style={[styles.box, {marginTop: 5}]}>
                <Text style={{marginRight: 10}}> {index + 1}</Text>
                {item.includes('selfie') ? (
                  <Image style={styles.tinyLogo} source={require(SELFIE)} />
                ) : (
                  <Image style={styles.tinyLogo} source={require(IDCARDBACK)} />
                )}
                <Text>{item}</Text>
              </View>
            );
          })}
        </View>
      </View>
      <View>
        {consenttermofuseLink && (
          <Pressable onPress={handleClick}>
            <Text style={[styles.note, globalStyles.textBold]}>
              Consents & Terms of use
            </Text>
          </Pressable>
        )}
        <View style={styles.row}>
          <CheckBox
            center
            checked={isChecked}
            onPress={handleCheckbox}
            wrapperStyle={styles.checkbox}
            size={24}
            containerStyle={styles.transparent}
            checkedColor={getBranding().colors.primary}
          />
          {consenttermofuseLink && (
            <Text style={styles.subHeading}>
              I confirm I have read, understood and agree to continue.
            </Text>
          )}
          {!consenttermofuseLink && (
            <Text style={styles.subHeading}>
              I have read steps mentioned above
            </Text>
          )}
        </View>
      </View>
    </>
  );
};

export default RequirementsDocuments;
