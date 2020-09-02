import cardQueries from '../card/cardResolvers/cardQueries';
import userQueries from '../user/userResolvers/userQueries';

export default {
  ...cardQueries,
  ...userQueries,
};
