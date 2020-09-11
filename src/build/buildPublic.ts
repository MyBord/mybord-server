// Sources:
// * https://www.nodegit.org/guides/cloning/ssh-with-agent/
// * https://radek.io/2015/10/27/nodegit/

const fs = require('fs-extra');
const nodegit = require('nodegit');
const path = require('path');

// ----- 1. SET PRIMITIVES ----- //

const cloneUrl = 'git@github.com:MyBord/mybord-client.git';
const publicFolder = path.join(__dirname, '../../public');
const tmpFolder = path.join(__dirname, '../tmp');
const tmpDistFolder = path.join(tmpFolder, 'dist');

const sshFolder = path.join(__dirname, '../../', '.ssh/');
const id_rsa_file = path.join(sshFolder, 'id_rsa');
const id_rsa_pub_file = path.join(sshFolder, 'id_rsa.pub');

// ----- 2. SET CLONE OPTIONS ----- //

const certificateCheck = (): number => 0;

const credentials = (url, username): object => nodegit.Cred.sshKeyNew(
  username,
  id_rsa_pub_file,
  id_rsa_file,
  process.env.SSH_PASSPHRASE,
);

const cloneOptions = {
  checkoutBranch: process.env.FE_BRANCH || 'master',
  fetchOpts: {
    callbacks: {
      certificateCheck,
      credentials,
    },
  },
};

// ----- 3. CLONE THE REPOSITORY ----- //

const cloneRepository = async (): Promise<void> => {
  try {
    await nodegit.Clone(cloneUrl, tmpFolder, cloneOptions);
  } catch (error) {
    console.log('Error trying to clone the repository:');
    console.log(error);
  }
};

cloneRepository();
