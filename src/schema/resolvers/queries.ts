import cardQueries from '../card/cardQueries';
import userQueries from '../user/userQueries';

export default {
  ...cardQueries,
  ...userQueries,
};
