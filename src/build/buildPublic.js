const nodegit = require('nodegit');
const path = require('path');

// ----- 1. SET PRIMITIVES ----- //

const cloneUrl = 'git@github.com:MyBord/mybord-client.git';
const tmpFolder = path.join(__dirname, '../tmp');

const sshFolder = path.join(__dirname, '../../', '.ssh/');
const id_rsa_file = path.join(sshFolder, 'id_rsa');
const id_rsa_pub_file = path.join(sshFolder, 'id_rsa.pub');

// ----- 2. SET CLONE OPTIONS ----- //

const certificateCheck = () => 0;

const credentials = (url, username) => nodegit.Cred.sshKeyNew(
  username,
  id_rsa_pub_file,
  id_rsa_file,
  process.env.SSH_PASSPHRASE,
);

const cloneOptions = {
  fetchOpts: {
    callbacks: {
      certificateCheck,
      credentials,
    },
  },
};

// ----- 3. CLONE THE REPOSITORY ----- //

const cloneRepository = async () => {
  try {
    await nodegit.Clone(cloneUrl, tmpFolder, cloneOptions);
  } catch (error) {
    console.log('Error trying to clone the repository:');
    console.log(error);
  }
};

cloneRepository();
