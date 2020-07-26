// See https://github.com/jimmy-e/mybord-server/blob/master/docs/applicationSummary.md#ii-cors-configuration

import { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
  credentials: true,
};


if (process.env.FOOB === 'DEV') {
  corsOptions.origin = `http://localhost:${process.env.EXTERNAL_PORT}`;
  // corsOptions.origin = 'http://localhost:8080';
}

console.log('----------- DEBUGGING CORS -------------');
console.log('CORS OPTIONS:');
console.log(corsOptions);
console.log('NODE ENV:');
console.log(process.env.NODE_ENV);
console.log(process.env.NODE_ENV === 'DEV');
console.log('FOOB:');
console.log(process.env.FOOB);
console.log('----------- DEBUGGING CORS -------------');

export default corsOptions;
