const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

// Set up body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define a route to handle sign-up requests
app.post('/api/signup', (req, res) => {
  // Get the user data from the request body
  const { name, email, password } = req.body;

  // Check if the user already exists in the JSON file
  const users = getUsers();
  const user = users.find(user => user.email === email);
  if (user) {
    return res.status(409).json({ message: 'User already exists' });
  }

  // Add the new user to the JSON file
  const newUser = { id: users.length + 1, name, email, password };
  users.push(newUser);
  saveUsers(users);

  // Return a success response
  res.json({ message: 'User created successfully' });
});

// Define a route to handle sign-in requests
app.post('/api/signin', (req, res) => {
  // Get the user data from the request body
  const { email, password } = req.body;

  // Check if the user exists in the JSON file
  const users = getUsers();
  const user = users.find(user => user.email === email && user.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Return a success response
  res.json({ message: 'User authenticated successfully' });
});

// Helper functions to read and write users to the JSON file
function getUsers() {
  const data = fs.readFileSync('users.json', 'utf8');
  return JSON.parse(data);
}

function saveUsers(users) {
  const data = JSON.stringify(users);
  fs.writeFileSync('users.json', data);
}

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
