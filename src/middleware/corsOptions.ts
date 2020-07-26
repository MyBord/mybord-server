// See https://github.com/jimmy-e/mybord-server/blob/master/docs/applicationSummary.md#ii-cors-configuration

import { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
  credentials: true,
  // origin: 'http://localhost:8080',
};

console.log('----------- DEBUGGING -------------');
console.log('----------- DEBUGGING -------------');
console.log('----------- DEBUGGING -------------');
console.log('----------- DEBUGGING -------------');
console.log('----------- DEBUGGING -------------');
console.log('----------- DEBUGGING -------------');
console.log('----------- DEBUGGING -------------');
console.log('----------- DEBUGGING -------------');
console.log('----------- DEBUGGING -------------');
console.log('----------- DEBUGGING -------------');

if (process.env.NODE_ENV === 'DEV') {
  // corsOptions.origin = `http://localhost:${process.env.EXTERNAL_PORT}`;
  corsOptions.origin = 'http://localhost:8080';
}

export default corsOptions;
