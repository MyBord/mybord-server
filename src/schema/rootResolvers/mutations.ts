import cardMutations from '../card/cardResolvers/cardMutations';
import userMutations from '../user/userResolvers/userMutations';

export default {
  ...cardMutations,
  ...userMutations,
};
