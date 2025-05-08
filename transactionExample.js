// transactionExample.js
const pool = require('./db');

async function doTransaction(studentId, newDepartmentId) {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction(); // 開始交易
    
    // 檢查學號格式
    const pattern = /^S\d{8}$/;
    if (!pattern.test(studentId)) {
      console.error('學號格式錯誤，必須為 S 開頭加上 8 位數字');
      return false;
    }
    
    // 檢查學號是否存在，並直接獲取學生資料
    console.log('執行查詢，檢查學生是否存在');
    const checkQuery = 'SELECT * FROM STUDENT WHERE Student_ID = ?';
    const result = await conn.query(checkQuery, [studentId]);
    
    // 結果是一個陣列
    if (!result || result.length === 0) {
      console.error(`學號 ${studentId} 不存在，無法進行轉系操作`);
      return false;
    }
    
    // 學生存在，獲取原系別
    const student = result[0];
    console.log('找到學生：', student);
    const oldDepartmentId = student.Department_ID;
    
    // 更新學生系別
    const updateStudent = 'UPDATE STUDENT SET Department_ID = ? WHERE Student_ID = ?';
    await conn.query(updateStudent, [newDepartmentId, studentId]);
    
    // 更新相關表格 - 使用正確的 Status 值 "修課中"
    const updateCourses = 'UPDATE ENROLLMENT SET Status = ? WHERE Student_ID = ?';
    await conn.query(updateCourses, ['修課中', studentId]);
    
    // 提交交易
    await conn.commit();
    console.log(`交易成功，已提交。學生 ${studentId} 已從 ${oldDepartmentId} 轉到 ${newDepartmentId}`);
    
    // 查詢該學生當前系別
    const updatedResult = await conn.query(checkQuery, [studentId]);
    const updatedStudent = updatedResult[0];
    
    console.log(`學生 ${studentId} 目前的系別是: ${updatedStudent.Department_ID}`);
    
    return true;
  } catch (err) {
    // 發生錯誤時回滾
    if (conn) await conn.rollback();
    console.error('交易失敗，已回滾：', err);
    console.error('錯誤詳情：', err.stack);
    return false;
  } finally {
    if (conn) conn.release();
  }
}

// 呼叫範例
doTransaction('S10721002', 'EE001');  // 將學生轉到資工系