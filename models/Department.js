const { sequelize, DataTypes } = require('../orm');

const Department = sequelize.define('Department', {
  Department_ID: {
    type: DataTypes.CHAR(5),
    primaryKey: true
  },
  Name: {  // 修改為 Name 而不是 Department_Name
    type: DataTypes.STRING(50),
    allowNull: false
  },
  Location: DataTypes.STRING(50),
  Phone: DataTypes.STRING(15),
  Established_Year: DataTypes.INTEGER,
  Chair_ID: DataTypes.CHAR(6),
  College: DataTypes.STRING(30)
}, {
  tableName: 'DEPARTMENT',
  timestamps: false
});

module.exports = Department;