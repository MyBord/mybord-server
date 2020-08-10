// See https://github.com/jimmy-e/mybord-server/blob/master/docs/applicationSummary.md#ii-cors-configuration

import { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
  credentials: true,
};

if (['DEV', 'LOCAL'].includes(process.env.MODE)) {
  corsOptions.origin = `http://localhost:${process.env.EXTERNAL_PORT}`;
}

export default corsOptions;
