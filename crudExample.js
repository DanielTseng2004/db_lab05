// crudExample.js
const pool = require('./db');

// 學號檢查機制
async function isStudentIdExists(conn, studentId) {
  const sql = 'SELECT COUNT(*) as count FROM STUDENT WHERE Student_ID = ?';
  const result = await conn.query(sql, [studentId]);
  return result[0].count > 0;
}

// 學號格式檢查
function validateStudentId(studentId) {
  const pattern = /^S\d{8}$/;
  return pattern.test(studentId);
}

async function studentCrud() {
  let conn;
  try {
    conn = await pool.getConnection();
    
    // 1. INSERT 新增 (含學號檢查)
    const newStudentId = 'S10810001';
    if (!validateStudentId(newStudentId)) {
      console.error('學號格式錯誤，必須為 S 開頭加上 8 位數字');
      return;
    }
    const exists = await isStudentIdExists(conn, newStudentId);
    if (exists) {
      console.error('學號已存在，無法新增重複的學生資料');
      return;
    }
    let sql = 'INSERT INTO STUDENT (Student_ID, Name, Gender, Email, Department_ID) VALUES (?, ?, ?, ?, ?)';
    await conn.query(sql, [newStudentId, '王曉明', 'M', 'wang@example.com', 'CS001']);
    console.log('已新增一筆學生資料');
    
    // 2. SELECT 查詢
    sql = 'SELECT * FROM STUDENT WHERE Department_ID = ?';
    const rows = await conn.query(sql, ['CS001']);
    console.log('查詢結果：', rows);
    
    // 3. UPDATE 更新 (含學號檢查)
    const updateStudentId = 'S10810001';
    const studentExists = await isStudentIdExists(conn, updateStudentId);
    if (!studentExists) {
      console.error('找不到此學號的學生，無法更新');
      return;
    }
    sql = 'UPDATE STUDENT SET Name = ? WHERE Student_ID = ?';
    await conn.query(sql, ['王小明', updateStudentId]);
    console.log('已更新學生名稱');

    // 4. DELETE 刪除 (含學號檢查)
    const deleteStudentId = 'S10810001';
    const deleteExists = await isStudentIdExists(conn, deleteStudentId);
    if (!deleteExists) {
      console.error('找不到此學號的學生，無法刪除');
      return;
    }
    sql = 'DELETE FROM STUDENT WHERE Student_ID = ?';
    await conn.query(sql, [deleteStudentId]);
    console.log('已刪除該學生');
  } catch (err) {
    console.error('操作失敗：', err);
  } finally {
    if (conn) conn.release();
  }
}

studentCrud();