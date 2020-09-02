import cardQueries from '../card/cardResolvers/cardQueries/cardQueries';
import userQueries from '../user/userResolvers/userQueries/userQueries';

export default {
  ...cardQueries,
  ...userQueries,
};
