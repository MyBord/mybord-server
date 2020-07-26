const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

console.log(' ----- DEBUGGING: ----- ');
console.log('HEROKU RELEASE VERSION:');
console.log(process.env.HEROKU_RELEASE_VERSION);
const releaseCreatedAt = new Date(process.env.HEROKU_RELEASE_CREATED_AT);
console.log(releaseCreatedAt.toDateString());
console.log(releaseCreatedAt.toTimeString());
console.log(' ----- DEBUGGING: ----- ');

const SRC_DIR = path.resolve(__dirname, 'src');

const output = {
  filename: 'index.js',
  path: path.resolve(__dirname, 'dist'),
};

const plugins = [
  new HtmlWebpackPlugin({
    title: 'Custom template',
    template: `${SRC_DIR}/pages/index.html`,
  }),
];

const resolve = {
  extensions: ['.graphql', '.js', '.ts'],
  alias: {
    middleware: path.resolve(SRC_DIR, 'middleware/'),
    schema: path.resolve(SRC_DIR, 'schema/'),
    server: path.resolve(SRC_DIR, 'server/'),
    serverError: path.resolve(SRC_DIR, 'serverError/'),
    types: path.resolve(SRC_DIR, 'types/'),
    utils: path.resolve(SRC_DIR, 'utils/'),
    youtube: path.resolve(SRC_DIR, 'thirdParty/youtube/'),
  },
};

const rules = [
  {
    exclude: [path.resolve(__dirname, 'node_modules')],
    test: /\.ts$/,
    use: 'ts-loader',
  },
  {
    test: /\.graphql$/,
    exclude: /node_modules/,
    use: [
      { loader: 'graphql-tag/loader' },
    ],
  },
];

module.exports = {
  module: { rules },
  output,
  plugins,
  resolve,
  target: 'node',
};
