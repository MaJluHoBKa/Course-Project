const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const PORT = process.env.PORT || 3000;
const app = express();

mongoose.connect('mongodb://localhost:27017/registrationDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to database");
}).catch((err) => {
  console.error("Connection error", err);
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  Structures: [{
    Name: String,
    Apex: mongoose.Schema.Types.Mixed,
    linesMap: mongoose.Schema.Types.Mixed
  }]
});

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model('User', UserSchema);

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.post('/register', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        console.log("User exists...");
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const newUser = new User({ username, password });
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error("Registration error", error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
      const user = await User.findOne({ username });
      if (!user) {
          return res.status(404).json({ message: 'Пользователь не найден' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          return res.status(401).json({ message: 'Неправильный пароль' });
      }
      res.status(200).json({ message: 'Вход выполнен успешно' });
  } catch (error) {
      console.error("Ошибка аутентификации", error);
      res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
});

app.post('/some-route', async (req, res) => {
  const { linesMap, apexArray, currentUsername, nameStructure } = req.body;
  try {
    const user = await User.findOne({ username: currentUsername });
    console.log("Current username: " + currentUsername);
    if (user) {
      user.Structures.push({ Name: nameStructure, Apex: apexArray, linesMap: linesMap });
      
      await user.save();
      
      console.log(`Data saved successfully for user ${user.username}`);
      res.status(200).json({ message: 'Data saved successfully' });
    } else {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Failed to save data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/getStructureNames/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const structureNames = user.Structures.map(structure => structure.Name);
    res.status(200).json(structureNames);
  } catch (error) {
    console.error('Failed to fetch structure names:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/getApexArray/:username/:structureName', async (req, res) => {
  const { username, structureName } = req.params;
  try {   
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const structure = user.Structures.find(structure => structure.Name === structureName);
    if (!structure) {
      return res.status(404).json({ message: 'Structure not found' });
    }
    const apexArray = structure.Apex;
    const newLinesMap = structure.linesMap;
    res.status(200).json({apexArray, newLinesMap});
  } catch (error) {
    console.error('Failed to fetch Apex array:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/logout', async (req, res) => {
  res.status(200).json({ message: 'Выход из аккаунта выполнен успешно' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});