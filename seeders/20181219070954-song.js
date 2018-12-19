'use strict';
const fs = require('fs')

function readFile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (!err) {
        let fileSeeded = []
        let parseData = data.split('\n').slice(1)
        for (let i = 1; i < parseData.length; i++) {
          let hasilParseData = parseData[i].split('\t')
          let objPerData = {
            title: hasilParseData[1],
            songTag: hasilParseData[3],
            ArtistId: Number(hasilParseData[2]),
            createdAt: new Date(),
            updatedAt: new Date()
          }
          fileSeeded.push(objPerData)
        }
        resolve(fileSeeded)
      } else {
        reject(err)
      }
    }) 
  })
}



module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return new Promise((resolve, reject) => {
    readFile('csvData/songAndArtist.csv')
    .then((data) => {
      resolve(queryInterface.bulkInsert('Songs', data, {}));
    })
    .catch((err) => {
      reject(err)
    })
  })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Songs', null, {});
  }
};
