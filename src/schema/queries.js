import commentQueries from './comment/commentQueries';
import postQueries from './post/postQueries';
import userQueries from './user/userQueries';

export default {
  ...commentQueries,
  ...postQueries,
  ...userQueries,
};
