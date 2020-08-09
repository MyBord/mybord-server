// @ts-ignore
const fs = require('fs-extra');
// @ts-ignore
const path = require('path');

// ----- 1. SET PRIMITIVES ----- //

const clientAppBundle = path.join(__dirname, '../', 'client/app/');
const distAppFolder = path.join(__dirname, '../../', 'dist/app/');
const distFolder = path.join(__dirname, '../../', 'dist/');

// ----- 2. DELETE THE DIST FOLDER ----- //

const deleteDistFolder = async (): Promise<void> => {
  try {
    await fs.rmdirSync(distFolder, { recursive: true });
  } catch (error) {
    console.log('Error trying to delete the dist folder:');
    console.log(error);
  }
};

// ----- 3. CREATE A NEW EMPTY DIST FOLDER ----- //

const makeDistFolder = async (): Promise<void> => {
  try {
    await fs.mkdirSync(distFolder);
  } catch (error) {
    console.log('Error trying to make the dist folder:');
    console.log(error);
  }
};

// ----- 4. COPY THE CLIENT APP BUNDLE TO THE DIST FOLDER ----- //

const copyClientAppBundle = async (): Promise<void> => {
  try {
    await fs.copy(clientAppBundle, distAppFolder);
  } catch (error) {
    console.log('Error trying to copy the client app bundle:');
    console.log(error);
  }
};

// ----- 5. INVOKE 2, 3, AND 4 SYNCHRONOUSLY ----- //

const makeDist = async (): Promise<void> => {
  try {
    await deleteDistFolder();
    await makeDistFolder();
    await copyClientAppBundle();
  } catch (error) {
    console.log('Error trying to build the dist folder:');
    console.log(error);
  }
};

makeDist();
