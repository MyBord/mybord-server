import youtube from 'youtube/youtube';
import { category } from 'schema/card/cardUtils/cardEnums';
import { CardType, InitialCardDataSchema } from './cardTypes';

const getCardType = (url: string): CardType => {
  if (
    url.includes('youtube.com')
    || url.includes('youtu.be')
    || url.includes('youtube-nocookie.com')
  ) {
    return 'Youtube';
  }

  if (url.endsWith('.jpg') || url.endsWith('.png')) {
    return 'Image';
  }

  throw Error('Cannot detect a valid card type');
};


const getInitialYoutubeData = async (url: string): Promise<InitialCardDataSchema> => {
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

export const getInitialCardData = async (url: string): Promise<InitialCardDataSchema> => {
  const cardType = getCardType(url);

  if (cardType === 'Youtube') {
    const initialYoutubeData = await getInitialYoutubeData(url);
    return initialYoutubeData;
  }

  throw Error('Cannot detect a valid card type');
};
