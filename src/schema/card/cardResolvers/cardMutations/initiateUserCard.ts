import axios from 'axios';
import ServerError from 'server/serverError';
import { type } from 'schema/card/cardUtils/cardEnums';
import { getCardType, getInitialImageData, getInitialYoutubeData } from '../../cardUtils/cardUtils';

export default async (parent, args) => {
  try {
    const { url } = args.data;

    const cardType = await getCardType(args.data.url);

    if (cardType === type.image) {
      return getInitialImageData(args.data.url);
    }

    if (cardType === type.youtube) {
      const initialYoutubeData = await getInitialYoutubeData(url);
      return initialYoutubeData;
    }

    throw Error('Cannot detect a valid card type');
  } catch (error) {
    throw new ServerError({ message: error.message, status: 400 });
  }
};
