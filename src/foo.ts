// todo: change to import statement
const nodegit = require('nodegit');

// ----- SET CLONE URL ----- //

const cloneUrl = 'https://github.com/jimmy-e/mybord';

// ----- SET FOLDER THAT STORES CLONED REPOSITORY ----- //

// todo: folder name should be 'client'
// const path = 'client';

const d = new Date();
const path = `client-${d.getHours}${d.getMinutes()}`;

// ----- SET CLONE OPTIONS ----- //


nodegit.Clone(cloneUrl, path);
