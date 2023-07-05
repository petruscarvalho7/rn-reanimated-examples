import {Image, Pressable, StyleSheet} from 'react-native';
import theme from '../util/theme';
import React, {useRef} from 'react';
import {PirateItemProps} from '../containers/MainScreen';

type Props = {
  data: PirateItemProps;
  onPress: (data: PirateItemProps, imageProps: any) => void;
};

const ImageItem = (props: Props) => {
  const imageRef = useRef();
  const onImagePress = () => {
    //measure image position and size
    imageRef.current?.measure?.(
      (x: any, y: any, width: any, height: any, pageX: any, pageY: any) => {
        props.onPress &&
          props.onPress(props.data, {
            width,
            height,
            pageX,
            pageY,
            borderRadius: 10,
          });
      },
    );
  };

  return (
    <Pressable onPress={onImagePress}>
      <Image
        ref={imageRef}
        source={{uri: props.data.uri}}
        style={styles.image}
      />
    </Pressable>
  );
};

export default ImageItem;

const styles = StyleSheet.create({
  image: {
    width: theme.metrics.screenWidth - 30,
    marginHorizontal: 15 * theme.metrics.ratioX,
    height: 250 * theme.metrics.ratioY,
    marginBottom: 15 * theme.metrics.ratioY,
    borderRadius: 10 * theme.metrics.ratioX,
  },
});
