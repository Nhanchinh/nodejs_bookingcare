'use strict';

const { STRING } = require("sequelize");
const { sequelize } = require("../models");

module.exports = {
    up: async (queryInterface, Sequelize) => {


        // statusId: DataTypes.STRING,
        // doctorId: DataTypes.INTEGER,
        // patientId: DataTypes.INTEGER,
        // date: DataTypes.DATE,
        // TimeType: DataTypes.STRING,

        await queryInterface.createTable('bookings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            doctorId: {
                type: Sequelize.INTEGER
            },
            patientId: {
                type: Sequelize.INTEGER
            },
            date: {
                type: Sequelize.DATE
            },
            timeType: {
                type: Sequelize.STRING
            },


            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('bookings');
    }
};