const path = require('path');

const SRC_DIR = path.resolve(__dirname, 'src');

const output = {
  filename: 'index.js',
  path: path.resolve(__dirname, 'dist'),
};

const resolve = {
  extensions: ['.graphql', '.js', '.ts'],
  alias: {
    generated: path.resolve(SRC_DIR, 'generated/'),
    schema: path.resolve(SRC_DIR, 'schema/'),
    types: path.resolve(SRC_DIR, 'types/'),
    utils: path.resolve(SRC_DIR, 'utils/'),
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
  resolve,
  target: 'node',
};
