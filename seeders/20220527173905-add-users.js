'use strict';

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'administrator',
      email: "admin@admin.com",
      password: "$2a$10$Qv2FicvfyANFvPzTc9hvb.bg.aoLTDiPN/U9/CXmOkgsRij9aYaG.",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
