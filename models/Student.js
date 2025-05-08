const { sequelize, DataTypes } = require('../orm');

const Student = sequelize.define('Student', {
  Student_ID: {
    type: DataTypes.CHAR(9),
    primaryKey: true
  },
  Name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  Birth_Date: DataTypes.DATE,
  Gender: DataTypes.CHAR(1),
  Email: {
    type: DataTypes.STRING(100),
    unique: true
  },
  Phone: DataTypes.STRING(15),
  Address: DataTypes.STRING(200),
  Admission_Year: DataTypes.INTEGER,
  Status: DataTypes.STRING(10),
  Department_ID: DataTypes.CHAR(5)
}, {
  tableName: 'STUDENT',
  timestamps: false
});

module.exports = Student;