'use strict';



module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      passWord: '12345',
      firstName: 'than',
      lastName: 'chinh',
      address: 'vietnam',
      gender: 1,
      roleId: 'admin',
      phonenumber: '099999999',
      positionId: 'R1',
      image: 'link-code',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },




  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
