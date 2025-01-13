// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const teacherRoutes = require('./routes/teacherRoutes');
const teachersData = require('./data/teachers');
const Teacher = require('./models/Teacher');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const seedDatabase = () => {
  Teacher.getAll((err, rows) => {
    if (err) {
      console.error('Error fetching teachers:', err);
      return;
    }
    if (rows.length === 0) {
      Teacher.insertMany(teachersData, (err) => {
        if (err) {
          console.error('Error seeding database:', err);
        } else {
          console.log('Database seeded with mock data');
        }
      });
    }
  });
};

app.use('/api/teachers', teacherRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  seedDatabase();
});