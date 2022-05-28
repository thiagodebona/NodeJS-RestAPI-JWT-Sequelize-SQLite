'use strict';

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('Movies', [{
      title: 'King Kong',
      originalTitle: "King Kong",
      description: "",
      releaseYear: 1958,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Harry potter',
      originalTitle: "Harry potter askabam",
      description: "",
      releaseYear: 2007,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Spider Man',
      originalTitle: "The spider man",
      description: "",
      releaseYear: 2009,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Movies', null, {});
  }
};
