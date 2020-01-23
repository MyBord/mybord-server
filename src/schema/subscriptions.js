import commentSubscriptions from './comment/commentSubscriptions';
import postSubscriptions from './post/postSubscriptions';
import userSubscriptions from './user/userSubscriptions';

export default {
  ...commentSubscriptions,
  ...postSubscriptions,
  ...userSubscriptions,
};
