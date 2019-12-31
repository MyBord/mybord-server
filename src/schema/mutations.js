import commentMutations from './comment/commentMutations';
import postMutations from './post/postMutations';
import userMutations from './user/userMutations';

export default {
  ...commentMutations,
  ...postMutations,
  ...userMutations,
};
