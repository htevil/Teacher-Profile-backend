// models/Teacher.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../teachers.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS Teachers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    subject TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    profilePicture TEXT NOT NULL,
    bio TEXT NOT NULL,
    experience TEXT NOT NULL,
    classesHandled TEXT NOT NULL
  )`);
});

const Teacher = {
  getAll: (callback) => {
    db.all('SELECT * FROM Teachers', [], (err, rows) => {
      callback(err, rows);
    });
  },
  
getById: (id, callback) => {
  db.get('SELECT * FROM Teachers WHERE id = ?', [id], (err, row) => {
    if (row) {
      row.classesHandled = row.classesHandled ? row.classesHandled.split(', ') : [];
    }
    callback(err, row);
  });
},
  insertMany: (teachers, callback) => {
    const stmt = db.prepare(`INSERT INTO Teachers (name, subject, email, phone, profilePicture, bio, experience, classesHandled) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
    teachers.forEach(teacher => {
      stmt.run(teacher.name, teacher.subject, teacher.email, teacher.phone, teacher.profilePicture, teacher.bio, teacher.experience, teacher.classesHandled.join(', '));
    });
    stmt.finalize(callback);
  }
};

module.exports = Teacher;