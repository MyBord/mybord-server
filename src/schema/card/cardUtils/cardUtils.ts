import youtube from 'youtube/youtube';
import { category, type } from 'schema/card/cardUtils/cardEnums';
import {
  CardCreateArgs,
  CardType,
  ImageData,
  InitialCardDataSchema,
} from './cardTypes';

// ----- CARD TYPE ----- //

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

// ----- IMAGE DATA ----- //

const getImageData = (url: string): ImageData => ({
  imageUrl: url,
});

// ----- INITIAL DATA ----- //

export const getInitialImageData = (url: string): InitialCardDataSchema => {
  const imageData = getImageData(url);

  return {
    cardData: {
      imageCardData: { ...imageData },
    },
    category: category.image,
    url,
  };
};

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

// ----- CREATE CARD ----- //

export const getUserCardCreateArgs = async (url: string): Promise<CardCreateArgs> => {
  const cardType = getCardType(url);

  if (cardType === type.youtube) {
    const youtubeVideoData = await youtube.getYoutubeVideoData(url);

    return {
      youtubeCardData: {
        create: { ...youtubeVideoData },
      },
    };
  }

  throw new Error('invalid card type');
};
