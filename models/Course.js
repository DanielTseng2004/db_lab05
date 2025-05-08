const { sequelize, DataTypes } = require('../orm');

const Course = sequelize.define('Course', {
  Course_ID: {
    type: DataTypes.CHAR(8),
    primaryKey: true
  },
  Title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Description: DataTypes.TEXT,
  Credits: DataTypes.INTEGER,
  Level: DataTypes.STRING(10),
  Hours_Per_Week: DataTypes.INTEGER,
  Department_ID: DataTypes.CHAR(5)
}, {
  tableName: 'COURSE',
  timestamps: false
});

module.exports = Course;