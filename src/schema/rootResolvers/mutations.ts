import cardMutations from '../card/cardResolvers/cardMutations/cardMutations';
import userMutations from '../user/userResolvers/userMutations/userMutations';

export default {
  ...cardMutations,
  ...userMutations,
};
