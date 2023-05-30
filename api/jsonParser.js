const fs = require('fs');
const path = require('path');

const root = process.cwd();

const getFile = () =>  fs.readFileSync(path.join(root, 'data', 'data.json'),  'utf-8');

const writeNewOffice = (data) => {
  const { branchOffice } = JSON.parse(getFile());
  const { code } = data;
  
  // Verify if the new office already exists based on the code
  const officeExists = branchOffice.find((office) => office.code === code);
  
  if (officeExists) return 'The office already exists';
  
  // Add the new office to the array
  branchOffice.push(data);
  
  // Write the new data to the file
  fs.writeFileSync(path.join(root, 'data', 'data.json'), JSON.stringify({ branchOffice }), 'utf-8');

  return 'The office was added successfully';
}

module.exports = { getFile, writeNewOffice };