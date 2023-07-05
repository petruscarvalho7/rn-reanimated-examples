import React from 'react';
import {FlatList, SafeAreaView, Text} from 'react-native';
import ImageItem from '../components/ImageItem';
import theme from '../util/theme';

export type PirateItemProps = {
  uri: string;
  title: string;
  description: string;
};

const data: PirateItemProps[] = [
  {
    uri: 'https://epipoca.com.br/wp-content/uploads/2021/11/luffy-12112021.jpg',
    title: 'Monkey D. Luffy',
    description:
      'Monkey D. Luffy, also known as "Straw Hat Luffy" and commonly as "Straw Hat", is the founder and captain of the increasingly infamous and powerful Straw Hat Pirates, as well as the most powerful of its top fighters. He desires to find the legendary treasure left behind by the late Gol D. Roger and thereby become the Pirate King,[28] which would help facilitate an unknown dream of his that he has told only to Shanks, his brothers, and crew. He believes that being the Pirate King means having the most freedom in the world.',
  },
  {
    uri: 'https://staticg.sportskeeda.com/editor/2023/01/652e0-16747139281399-1920.jpg?w=840',
    title: 'Portgas D. Ace',
    description:
      'Portgas D. Ace, born as Gol D. Ace and nicknamed "Fire Fist" Ace, was the sworn older brother of Luffy and Sabo, and the biological son of the late Pirate King, Gol D. Roger, and Portgas D. Rouge. Ace was adopted by Monkey D. Garp, as had been requested by Roger before his execution. Ace was Captain of the Spade Pirates before being recruited into the Whitebeard Pirates and becoming its 2nd division commander. He ate the Mera Mera no Mi, giving him the power to transform into and manipulate flames.',
  },
  {
    uri: 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2021/11/Whitebeard-Alive-One-Piece.jpg',
    title: 'Edward Newgate',
    description:
      'Edward Newgate, more commonly known as "Whitebeard", was the captain of the Whitebeard Pirates and was widely known as the "Strongest Man in the World" and, after Gol D. Roger\'s death, the "Man Closest to One Piece".',
  },
];

const MainScreen = ({navigation}: {navigation: any}) => {
  const Item = (data: PirateItemProps) => (
    <ImageItem key={data.uri} onPress={onImageClick} data={data} />
  );

  const onImageClick = (data: PirateItemProps, imageProps: any) => {
    navigation.navigate('DetailScreen', {
      data,
      imageProps,
    });
  };

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        renderItem={({item}) => Item(item)}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => 'key' + index}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={
          <Text
            style={{
              fontSize: 30 * theme.metrics.ratioX,
              padding: 15 * theme.metrics.ratioX,
              fontWeight: 'bold',
            }}>
            Pirate List
          </Text>
        }
      />
    </SafeAreaView>
  );
};

export default MainScreen;
