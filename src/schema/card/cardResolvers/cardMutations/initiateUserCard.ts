import ServerError from 'server/serverError';
import { getInitialCardData } from '../../cardUtils/cardUtils';

export default async (parent, args) => {
  try {
    const initialCardData = await getInitialCardData(args.data.url);
    return initialCardData;
  } catch (error) {
    throw new ServerError({ message: error.message, status: 400 });
  }
};
