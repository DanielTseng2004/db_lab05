const { sequelize, DataTypes } = require('../orm');

const Enrollment = sequelize.define('Enrollment', {
  Student_ID: {
    type: DataTypes.CHAR(9),
    primaryKey: true
  },
  Course_ID: {
    type: DataTypes.CHAR(8),
    primaryKey: true
  },
  Semester_ID: {
    type: DataTypes.CHAR(6),
    primaryKey: true
  },
  Enrollment_Date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Grade: DataTypes.DECIMAL(4, 1),
  Status: {
    type: DataTypes.STRING(10),
    defaultValue: '修課中'
  }
}, {
  tableName: 'ENROLLMENT',
  timestamps: false
});

module.exports = Enrollment;