// const jsonServer = require('json-server');
// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// const port = 5000;

// // JSON Server setup
// const router = jsonServer.router('db.json'); // This is the JSON file that acts as a database
// const middlewares = jsonServer.defaults();

// app.use(bodyParser.json());
// app.use('/api', middlewares, router);

// // Middleware to handle JSON Server manually for custom routes
// app.use('/api', router);

// // Custom Route for User Signup
// app.post('/signup', (req, res) => {
//     const { email, password, fullName } = req.body;
//     if (!email || !password || !fullName) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }
//     const userDb = router.db.get('users');
//     if (userDb.find({ email }).value()) {
//         return res.status(409).json({ message: 'Email already exists' });
//     }
//     const newUser = userDb.insert(req.body).write();
//     res.status(201).json(newUser);
// });

// // Custom Route for User Login
// app.post('/login', (req, res) => {
//     const { email, password } = req.body;
//     if (!email || !password) {
//         return res.status(400).json({ message: 'Email and password are required' });
//     }
//     const user = router.db.get('users').find({ email, password }).value();
//     if (user) {
//         res.json({ message: 'Login successful', user });
//     } else {
//         res.status(401).json({ message: 'Invalid credentials' });
//     }
// });

// // Custom Route for Adding a Transaction
// app.post('/api/transactions', (req, res) => {
//     const { type, category, amount, date, userId } = req.body;
//     if (!type || !category || !amount || !date || !userId) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }
//     const transaction = router.db.get('transactions').insert(req.body).write();
//     res.status(201).json(transaction);
// });

// // Custom Route for Getting All Transactions for a Specific User
// app.get('/api/transactions/user/:userId', (req, res) => {
//     const { userId } = req.params;
//     const transactions = router.db.get('transactions').filter({ userId: parseInt(userId) }).value();
//     res.json(transactions);
// });

// // Custom Route for Updating a Transaction
// app.put('/api/transactions/:id', (req, res) => {
//     const { id } = req.params;
//     const updatedTransaction = router.db.get('transactions').find({ id: parseInt(id) }).assign(req.body).write();
//     if (updatedTransaction) {
//         res.json(updatedTransaction);
//     } else {
//         res.status(404).json({ message: 'Transaction not found' });
//     }
// });

// // Custom Route for Deleting a Transaction
// app.delete('/api/transactions/:id', (req, res) => {
//     const { id } = req.params;
//     router.db.get('transactions').remove({ id: parseInt(id) }).write();
//     res.status(204).send();
// });

// // Start server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });


const express = require('express');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const cors = require('cors');

const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(cors());

// JSON Server setup
const router = jsonServer.router('db.json');  // This is the JSON file that acts as a database
const middlewares = jsonServer.defaults();

app.use(bodyParser.json());
app.use('/api', middlewares, router);

// Custom Route for User Signup
app.post('/signup', (req, res) => {
    const { email, password, fullName } = req.body;
    if (!email || !password || !fullName) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const userDb = router.db.get('users');
    if (userDb.find({ email }).value()) {
        return res.status(409).json({ message: 'Email already exists' });
    }
    const newUser = userDb.insert(req.body).write();
    res.status(201).json(newUser);
});

// Custom Route for User Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = router.db.get('users').find({ email, password }).value();
    if (user) {
        res.json({ message: 'Login successful', user });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Custom Route for Adding a Transaction
app.post('/api/transactions', (req, res) => {
    const { type, category, amount, date, userId } = req.body;
    if (!type || !category || !amount || !date || !userId) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const transaction = router.db.get('transactions').insert(req.body).write();
    res.status(201).json(transaction);
});

// Custom Route for Getting All Transactions for a Specific User
app.get('/api/transactions/user/:userId', (req, res) => {
    const { userId } = req.params;
    const transactions = router.db.get('transactions').filter({ userId: parseInt(userId) }).value();
    res.json(transactions);
});

// Custom Route for Updating a Transaction
app.put('/api/transactions/:id', (req, res) => {
    const { id } = req.params;
    const updatedTransaction = router.db.get('transactions').find({ id: parseInt(id) }).assign(req.body).write();
    if (updatedTransaction) {
        res.json(updatedTransaction);
    } else {
        res.status(404).json({ message: 'Transaction not found' });
    }
});

// Custom Route for Deleting a Transaction
app.delete('/api/transactions/:id', (req, res) => {
    const { id } = req.params;
    router.db.get('transactions').remove({ id: parseInt(id) }).write();
    res.status(204).send();
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
