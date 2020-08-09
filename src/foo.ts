// Sources:
// * https://www.nodegit.org/guides/cloning/ssh-with-agent/
// * https://radek.io/2015/10/27/nodegit/

// todo: change to import statement
const fs = require('fs');
const fsExtra = require("fs-extra");
const nodegit = require('nodegit');
const path = require('path');

// ----- 1. SET PRIMITIVES ----- //

const cloneUrl = 'git@github.com:jimmy-e/mybord.git';
const clientFolder = path.join(__dirname, 'client');
const tmpFolder = path.join(__dirname, 'tmp');

const sshFolder = path.join(__dirname, '../../../', '.ssh/');
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

// ----- 4. COPY THE CONTENTS OF THE REPOSITORY'S DIST FOLDER INTO THE CLIENT FOLDER ----- //

const copyTmp = (): void => fsExtra.copy(tmpFolder, clientFolder, (error) => {
  if (error) {
    console.log('Error trying to copy the dist folder:');
    console.log(error);
  }
});

// ----- 5. DELETE THE TMP REPOSITORY FOLDER ----- //

const deleteRepository = (): void => fs.rmdirSync(tmpFolder, { recursive: true });

// ----- 6. INVOKE 3, 4, AND 5 SYNCHRONOUSLY ----- //

const getClient = async (): Promise<void> => {
  try {
    await cloneRepository();
    copyTmp();
    deleteRepository();
  } catch (error) {
    throw new Error(error);
  }
};

getClient();
