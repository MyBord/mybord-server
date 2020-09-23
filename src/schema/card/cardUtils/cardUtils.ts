import axios from 'axios';
import youtube from 'youtube/youtube';
import { category, type } from 'schema/card/cardUtils/cardEnums';
import {
  CardCreateArgs,
  CardType,
  GifData,
  ImageData,
  InitialCardDataSchema,
} from './cardTypes';

// ----- CARD TYPE ----- //

export const getCardType = async (url: string): Promise<CardType> => {
  if (
    url.includes('youtube.com')
    || url.includes('youtu.be')
    || url.includes('youtube-nocookie.com')
  ) {
    return type.youtube;
  }

  const response = await axios.head(url);
  const contentType = response.headers['content-type'];

  if (contentType === 'image/gif') {
    return type.gif;
  }

  if (['image/jpeg', 'image/png'].includes(contentType)) {
    return type.image;
  }

  throw Error('Cannot detect a valid card type');
};

// ----- GIF DATA ----- //

const getGifData = (url: string): GifData => ({
  gifUrl: url,
});

// ----- IMAGE DATA ----- //

const getImageData = (url: string): ImageData => ({
  imageUrl: url,
});

// ----- INITIAL DATA ----- //

export const getInitialGifData = (url: string): InitialCardDataSchema => {
  const gifData = getGifData(url);

  return {
    cardData: {
      gifCardData: { ...gifData },
    },
    category: category.gif,
    type: type.gif,
    url,
  };
};

export const getInitialImageData = (url: string): InitialCardDataSchema => {
  const imageData = getImageData(url);

  return {
    cardData: {
      imageCardData: { ...imageData },
    },
    category: category.image,
    type: type.image,
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
    type: type.youtube,
    url,
  };
};

// ----- CREATE CARD ----- //

export const getUserCardCreateArgs = async (
  cardType: CardType,
  url: string,
): Promise<CardCreateArgs> => {
  if (cardType === type.gif) {
    const gifData = getGifData(url);

    return {
      gifCardData: {
        create: { ...gifData },
      },
    };
  }

  if (cardType === type.image) {
    const imageData = getImageData(url);

    return {
      imageCardData: {
        create: { ...imageData },
      },
    };
  }

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
