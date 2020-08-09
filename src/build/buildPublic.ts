// Sources:
// * https://www.nodegit.org/guides/cloning/ssh-with-agent/
// * https://radek.io/2015/10/27/nodegit/

const fs = require('fs-extra');
const nodegit = require('nodegit');
const path = require('path');

// ----- 1. SET PRIMITIVES ----- //

const cloneUrl = 'git@github.com:jimmy-e/mybord.git';
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
  'foo', // it does not seem to care what the passphrase is
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

const cloneRepository = async (): Promise<void> => {
  try {
    await nodegit.Clone(cloneUrl, tmpFolder, cloneOptions);
  } catch (error) {
    console.log('Error trying to clone the repository:');
    console.log(error);
  }
};

// ----- 4. ----- //
// ----- a. REMOVE THE CURRENT CONTENTS OF THE PUBLIC FOLDER ----- //
// ----- b. COPY THE CONTENTS OF THE TMP REPOSITORY'S DIST FOLDER INTO THE CLIENT FOLDER ----- //

const copyDist = async (): Promise<void> => {
  try {
    await fs.emptyDirSync(publicFolder); // a.
    await fs.copy(tmpDistFolder, publicFolder); // b.
  } catch (error) {
    console.log('Error trying to copy the dist folder:');
    console.log(error);
  }
};

// ----- 5. DELETE THE TMP REPOSITORY FOLDER ----- //

const deleteRepository = async (): Promise<void> => {
  try {
    await fs.rmdirSync(tmpFolder, { recursive: true });
  } catch (error) {
    console.log('Error trying to delete repository:');
    console.log(error);
  }
};

// ----- 6. INVOKE 3, 4, AND 5 SYNCHRONOUSLY ----- //

const buildPublic = async (): Promise<void> => {
  try {
    await cloneRepository();
    await copyDist();
    await deleteRepository();
    console.log('Client Copied!');
  } catch (error) {
    throw new Error(error);
  }
};

buildPublic();
