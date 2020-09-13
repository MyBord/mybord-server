import { CardType } from './cardTypes';

export const getCardType = (url: string): CardType => {
  if (
    url.includes('youtube.com')
    || url.includes('youtu.be')
    || url.includes('youtube-nocookie.com')
  ) {
    return 'Youtube';
  }

  throw Error('Cannot detect a valid card type');
};
