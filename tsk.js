const express = require('express');
const fs = require('fs').promises;

const app = express();
const PORT = 3000;

app.use(express.json());

// ReadFile Endpoint (GET /readFile)
app.get('/readFile', async (req, res) => {
  try {
    const fileContent = await fs.readFile('file.txt', 'utf-8');
    res.status(200).json({ content: fileContent });
  } catch (error) {
    res.status(500).json({ error: 'Error reading the file.' });
  }
});

// WriteFile Endpoint (POST /writeFile)
app.post('/writeFile', async (req, res) => {
  try {
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ error: 'No data provided in the request body.' });
    }

    await fs.writeFile('file.txt', data, { flag: 'w' });
    res.status(200).json({ message: 'File written successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error writing to the file.' });
  }
});



// UpdateFile Endpoint (PUT /updateFile)
app.put('/updateFile', async (req, res) => {
  try {
    const { newData } = req.body;

    if (!newData) {
      return res.status(400).json({ error: 'No new data provided in the request body.' });
    }

    const currentContent = await fs.readFile('file.txt', 'utf-8');
    const updatedContent = `${currentContent}\n${newData}`;

    await fs.writeFile('file.txt', updatedContent, { flag: 'w' });
    res.status(200).json({ message: 'File updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating the file.' });
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
