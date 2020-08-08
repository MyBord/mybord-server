// Sources:
// * https://www.nodegit.org/guides/cloning/ssh-with-agent/
// * https://radek.io/2015/10/27/nodegit/

// todo: change to import statement
const nodegit = require('nodegit');
const path = require('path');
// remove fs
const fs = require('fs');

// ----- 1. SET CLONE URL ----- //

const cloneUrl = 'https://github.com/jimmy-e/mybord';

// ----- 2. SET FOLDER THAT STORES CLONED REPOSITORY ----- //

// todo: folder name should be 'client'
// const localPath = path.join(__dirname, 'client');

const d = new Date();
const localPath = `client-${d.getHours}${d.getMinutes()}`;

// ----- 3. SET CLONE OPTIONS ----- //

const sshFolder = path.join(__dirname, '../../../', '.ssh/');
const id_rsa_file = path.join(sshFolder, 'id_rsa');
const id_rsa_pub_file = path.join(sshFolder, 'id_rsa.pub');

const certificateCheck = (): number => 0;

const credentials = (url, username): object => nodegit.Cred.sshKeyNew(
  username,
  id_rsa_pub_file,
  id_rsa_file,
  'id_rsa_passphrase',
);

const cloneOptions = {
  fetchOpts: {
    callbacks: {
      certificateCheck,
      credentials,
    },
  },
};

// ----- 4. CLONE THE REPOSITORY ----- //

const cloneRepository = async (): Promise<void> => {
  try {
    const clonedRepository = await nodegit.Clone(cloneUrl, localPath, cloneOptions);
  } catch (error) {
    console.log('error: could not clone');
    console.log(error);
  }
};

cloneRepository();
