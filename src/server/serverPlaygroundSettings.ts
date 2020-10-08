import { PlaygroundConfig } from 'apollo-server-express';

const getServerPlaygroundSettings = (): PlaygroundConfig => {
  if (process.env.MODE === 'PROD') {
    return false;
  }

  return {
    settings: {
      'request.credentials': 'same-origin',
    },
  };
};

export default getServerPlaygroundSettings();
