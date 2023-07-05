import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, {
  FadeInDown,
  FadeInLeft,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import theme from '../util/theme';

const DetailScreen = ({route, navigation}) => {
  const [closeBtnVisible, setCloseBtnVisible] = useState(true);
  //get uri and imageSpecs from route.params
  const {data, imageProps} = route.params;
  //create animated value
  const anim = useSharedValue(0);
  useEffect(() => {
    //reset to zero
    anim.value = 0;
    //start animation
    anim.value = withTiming(1);
  }, []);

  const onClosePress = () => {
    setCloseBtnVisible(false);
    const callback = () => navigation.goBack();
    anim.value = withTiming(
      0,
      {},
      isFinished => isFinished && runOnJS(callback)(),
    );
  };
  //create image containner style
  const imageContainerStyle = useAnimatedStyle(
    () => ({
      zIndex: 1,
      position: 'absolute',
      top: interpolate(anim.value, [0, 1], [imageProps.pageY, 0]),
      left: interpolate(anim.value, [0, 1], [imageProps.pageX, 0]),
      width: interpolate(
        anim.value,
        [0, 1],
        [imageProps.width, theme.metrics.screenWidth],
      ),
      height: interpolate(anim.value, [0, 1], [imageProps.height, 250]),
      borderRadius: interpolate(
        anim.value,
        [0, 1],
        [imageProps.borderRadius, 0],
      ),
      overflow: 'hidden',
    }),
    [],
  );

  const detailsContainerStyle = useAnimatedStyle(
    () => ({
      opacity: anim.value,
      marginTop: interpolate(anim.value, [0, 1], [imageProps.pageY, 0]),
      padding: 15 * theme.metrics.ratioX,
    }),
    [],
  );

  return (
    <View style={styles.container}>
      <Animated.View style={imageContainerStyle}>
        <Image style={styles.image} source={{uri: data.uri}} />
      </Animated.View>
      <Animated.View style={detailsContainerStyle}>
        <Animated.Text
          style={styles.title}
          entering={FadeInLeft.duration(300).delay(400)}>
          {data.title}
        </Animated.Text>
        <Animated.Text
          style={styles.description}
          numberOfLines={0}
          entering={FadeInDown.duration(300).delay(500)}>
          {data.description}
        </Animated.Text>
      </Animated.View>
      {closeBtnVisible && (
        <TouchableOpacity onPress={onClosePress} style={styles.topClose}>
          <Image source={theme.images.closeIcon} style={styles.closeBtn} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 250,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    color: '#fff',
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  closeBtn: {
    width: 20 * theme.metrics.ratioX,
    height: 20 * theme.metrics.ratioY,
    tintColor: 'white',
  },
  topClose: {
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40 * theme.metrics.ratioX,
    width: 40 * theme.metrics.ratioX,
    position: 'absolute',
    top: 30 * theme.metrics.ratioX,
    left: 10 * theme.metrics.ratioX,
    backgroundColor: 'black',
    borderRadius: 20 * theme.metrics.ratioX,
  },
  title: {
    fontSize: 30 * theme.metrics.ratioX,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 15 * theme.metrics.ratioX,
    marginTop: 10 * theme.metrics.ratioY,
  },
});
