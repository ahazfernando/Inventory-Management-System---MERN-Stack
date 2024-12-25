const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Customer');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/InfoTechDatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.get('/', (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => res.status(500).json({ error: "There was an Error Fetching the Users", details: err }));
});

app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById(id)
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ error: "Error : User has not found" });
            }
        })
        .catch(err => res.status(500).json({ error: "Error fetching user", details: err }));
});

app.post('/createUser', (req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ error: "There was an Error Creating the User", details: err }));
});

app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        .then(updatedUser => {
            if (updatedUser) {
                res.json(updatedUser);
            } else {
                res.status(404).json({ error: "Error finding the User" });
            }
        })
        .catch(err => res.status(500).json({ error: "Error updating user", details: err }));
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

app.delete('/deleteUser/:id', (req, res) => {
    const { id } = req.params;
    UserModel.findByIdAndDelete(id)
        .then(() => res.status(200).send("User deleted successfully."))
        .catch((err) =>
            res.status(500).json({ error: "Error deleting user", details: err })
        );
});
