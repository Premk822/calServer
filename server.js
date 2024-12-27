import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const country = 'in';

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/data/:year', async (req, res) => {
  const year = req.params.year;  

  try {
    const response = await axios.get(`https://api.api-ninjas.com/v1/holidays`, {
      params: {
        country: country,
        year: year
      },
      headers: {
        'X-Api-Key': 'JamJ8C2nCYBZiMz9KC67zQ==HFFA9lUujTFamE4n'
      }
    });

    const holidays = response.data.map((holiday, index) => {
      const holidayDate = new Date(holiday.date);
      holidayDate.setDate(holidayDate.getDate() - 1);

      return {
        index: index,
        date: holidayDate.toISOString().split('T')[0], 
        name: holiday.name.substring(0, 20)
      };
    });

    res.json(holidays);

  } catch (error) {
    console.error('Failed:', error);
    res.status(500).send('Error fetching holidays');
  }
});

app.listen(7000, () => {
  console.log('Server is running at http://localhost:7000');
});
