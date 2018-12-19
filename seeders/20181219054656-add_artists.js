'use strict';

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
    return queryInterface.bulkInsert('Artists', [{
      name: 'Honne',
      createdAt: new Date,
      updatedAt: new Date
    }, {
      name: 'Anang',
      createdAt: new Date,
      updatedAt: new Date
    }, {
      name: 'The Beach Boys',
      createdAt: new Date,
      updatedAt: new Date
    }, {
      name: 'Skastra',
      createdAt: new Date,
      updatedAt: new Date
    }, {
      name: 'Oh Wonder',
      createdAt: new Date,
      updatedAt: new Date
    }, {
      name: 'Nicotines Famous Honey',
      createdAt: new Date,
      updatedAt: new Date
    }, {
      name: 'Naif',
      createdAt: new Date,
      updatedAt: new Date
    }, {
      name: 'OM PMR',
      createdAt: new Date,
      updatedAt: new Date
    }, {
      name: 'Marvin Gaye',
      createdAt: new Date,
      updatedAt: new Date
    }, {
      name: 'Eminem',
      createdAt: new Date,
      updatedAt: new Date
    }])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Artists', null, {})
  }
};
