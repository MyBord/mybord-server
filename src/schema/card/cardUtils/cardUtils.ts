import youtube from 'youtube/youtube';
import { category, type } from 'schema/card/cardUtils/cardEnums';
import { CardType, InitialCardDataSchema } from './cardTypes';

export const getCardType = (url: string): CardType => {
  if (
    url.includes('youtube.com')
    || url.includes('youtu.be')
    || url.includes('youtube-nocookie.com')
  ) {
    return type.youtube;
  }

  if (url.endsWith('.jpeg') || url.endsWith('.jpg') || url.endsWith('.png')) {
    return type.image;
  }

  throw Error('Cannot detect a valid card type');
};

export const getInitialImageData = (url: string): InitialCardDataSchema => ({
  cardData: {
    imageCardData: {
      imageUrl: url,
    },
  },
  category: category.image,
  url,
});

export const getInitialYoutubeData = async (url: string): Promise<InitialCardDataSchema> => {
  const youtubeVideoData = await youtube.getYoutubeVideoData(url);

  return {
    cardData: {
      youtubeCardData: youtubeVideoData,
    },
    category: category.video,
    title: youtubeVideoData.videoTitle,
    url,
  };
};
