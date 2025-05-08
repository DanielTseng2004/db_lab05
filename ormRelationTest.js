const { Student, Course, Department } = require('./models');

async function testRelations() {
  try {
    // 查詢學生及其所屬系所
    const student = await Student.findByPk('S10721001', {
      include: [Department]
    });
    
    // 修改這裡的屬性名稱
    console.log(`學生 ${student.Name} 屬於 ${student.Department.Name} 系`);
    
    // 查詢學生及其選修的所有課程
    const studentWithCourses = await Student.findByPk('S10721001', {
      include: [{
        model: Course,
        through: { attributes: [] }
      }]
    });
    
    console.log(`${studentWithCourses.Name} 選修的課程：`);
    studentWithCourses.Courses.forEach(course => {
      console.log(`- ${course.Title} (${course.Credits} 學分)`);
    });
    
    // 查詢課程及其選修的學生
    const courseWithStudents = await Course.findByPk('BA201001', {
      include: [{
        model: Student,
        through: { attributes: [] }
      }]
    });
    
    console.log(`選修 ${courseWithStudents.Title} 的學生：`);
    courseWithStudents.Students.forEach(student => {
      console.log(`- ${student.Name} (${student.Student_ID})`);
    });
    
  } catch (err) {
    console.error('關聯查詢出錯：', err);
  }
}

testRelations();