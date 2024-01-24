import {Image, View, Text, Dimensions, FlatList} from 'react-native';
import React, {useState} from 'react';

import {styles} from './styles';
import {globalStyles} from '../../../globalStyles';
import {SlideType} from '../../../App';

const SLIDE1 = '../../assets/slide1.png';
const SLIDE2 = '../../assets/slide2.png';
const SLIDE3 = '../../assets/slide3.png';

const {width} = Dimensions.get('window');

type Item = {
  id: number;
  image: string;
};

const data: Item[] = [
  {id: 1, image: SLIDE1},
  {id: 2, image: SLIDE2},
  {id: 3, image: SLIDE3},
];

const SLIDE_TEXT = [
  {
    heading: 'Document Scan',
    subHeading: 'Will ask you to take a picture of your document',
  },
  {
    heading: 'Verify Scan',
    subHeading:
      'Data will be stored and may be used according to the Stripe Privacy and the Rocket Rides Privacy Policy.',
  },
  {
    heading: 'Take selfie',
    subHeading:
      'Data will be stored and may be used according to the Stripe Privacy and the Rocket Rides Privacy Policy.',
  },
];

type props = {
  slides?: SlideType[];
};

/**
 * A custom carousel component that displays a series of slides with images and text.
 *
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.slides - An optional array of objects containing image URLs and heading/subheading text for each slide.
 * @param {string} props.slides[].url - The URL of the image to display for the slide.
 * @param {string} props.slides[].heading - The heading text to display for the slide.
 * @param {string} props.slides[].subHeading - The subheading text to display for the slide.
 * @returns {JSX.Element} - The rendered component as a JSX element.
 */

const CustomCarousel = ({slides = []}: props) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleScroll = (event: any) => {
    const {contentOffset} = event.nativeEvent;
    const index = Math.round(contentOffset.x / width);
    setCurrentIndex(index);
  };

  const renderItem = ({item, index}: {item: Item; index: number}) => {
    const userSlides = slides?.length > 0;
    return (
      <View style={styles.column}>
        <Image
          style={styles.tinyLogo}
          source={
            item.id === 1
              ? userSlides
                ? {
                    uri: slides?.[index]?.url,
                  }
                : require(SLIDE1)
              : item.id === 2
              ? userSlides
                ? {
                    uri: slides?.[index]?.url,
                  }
                : require(SLIDE2)
              : item.id === 3
              ? userSlides
                ? {uri: slides?.[index]?.url}
                : require(SLIDE3)
              : require(SLIDE3)
          }
          resizeMode="contain"
        />
        <View style={styles.center}>
          <Text style={[styles.heading, globalStyles.textRegular]}>
            {userSlides ? slides?.[index]?.heading : SLIDE_TEXT[index].heading}
          </Text>
          <Text style={[styles.subHeading, globalStyles.textRegular]}>
            {userSlides
              ? slides?.[index]?.subHeading
              : SLIDE_TEXT[index].subHeading}
          </Text>
        </View>
        <View style={styles.row}>
          <View
            style={[
              item.id === 1 ? styles.activecircle : styles.inactivecircle,
              styles.circle,
            ]}
          />
          <View
            style={[
              item.id === 2 ? styles.activecircle : styles.inactivecircle,
              ,
              styles.circle,
            ]}
          />
          <View
            style={[
              item.id === 3 ? styles.activecircle : styles.inactivecircle,
              ,
              styles.circle,
            ]}
          />
        </View>
      </View>
    );
  };

  const keyExtractor = (item: Item) => item.id.toString();

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        onScroll={handleScroll}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

export default CustomCarousel;
