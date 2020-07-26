import { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
  credentials: true,
};

if (process.env.NODE_ENV === 'DEV') {
  corsOptions.origin = `http://localhost:${process.env.EXTERNAL_PORT}`;
}

export default corsOptions;
