import commentSubscriptions from './comment/commentSubscriptions';
import postSubscriptions from './post/postSubscriptions';

export default {
  ...commentSubscriptions,
  ...postSubscriptions,
};
