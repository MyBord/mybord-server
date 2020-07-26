// See https://github.com/jimmy-e/mybord-server/blob/master/docs/applicationSummary.md#ii-cors-configuration

import { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
  credentials: true,
};

if (process.env.MODE === 'DEV') {
  corsOptions.origin = `http://localhost:${process.env.EXTERNAL_PORT}`;
}

console.log('----------- DEBUGGING CORS -------------');
console.log('CORS OPTIONS:');
console.log(corsOptions);
console.log('NODE ENV:');
console.log(process.env.NODE_ENV);
console.log('MODE:');
console.log(process.env.MODE);
console.log('----------- DEBUGGING CORS -------------');

export default corsOptions;
