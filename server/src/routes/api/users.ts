import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const router = express.Router();

import { userSchema } from '../../models/userSchema';

import bcrypt from 'bcrypt';
const saltRounds = 10;

if (process.env.NODE_ENV !== 'production') {
  const result = dotenv.config();

  if (result.error) {
    throw result.error;
  }
}

const url = process.env.mongoURL;
mongoose
  .connect(url)
  .then(() => console.log('Database connected!'))
  .catch((err) => console.log(err));

const User = mongoose.model('User', userSchema, 'users');

// Get Users
router.post('/login', async (req, res) => {
  const userNameToBeFound = req.body.userName;
  const myPlaintextPassword = req.body.userPassword;

  try {
    const user = await User.findOne({ userName: userNameToBeFound });
    if (!user) {
      // The user couldn't be found
      res.sendStatus(202);
    } else {
      const passwordMatch = await bcrypt.compare(
        myPlaintextPassword,
        user.userPassword,
      );
      if (passwordMatch) {
        res.send(user);
      } else {
        res.sendStatus(205);
      }
    }
  } catch (err) {
    console.error('Error finding user:', err);
    res.sendStatus(500); // Internal server error
  }
});

// Get User after page reload
router.get('/:id', async (req, res) => {
  res.send(
    await User.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) }),
  );
});

// Add User
router.post('/', async (req, res) => {
  try {
    const userNameToBeFound = req.body.userName;
    const user = await User.findOne({ userName: userNameToBeFound });
    if (!user) {
      // The userName doesn't yet exist
      const user = new User();
      user.userName = req.body.userName;
      const myPlaintextPassword = req.body.userPassword;
      bcrypt.hash(myPlaintextPassword, saltRounds, async function (err, hash) {
        if (err) {
          console.log('error hashing password:', err);
        }
        user.userPassword = hash;
        try {
          await user.save();
          res.status(201).json(user);
        } catch (err) {
          console.log(err);
          res.status(500).send('Error saving the user.');
        }
      });
      return;
    }
    if (user) {
      // The userName is already taken
      res.sendStatus(205);
      return;
    }
  } catch (err) {
    console.log(err);
  }
});

// Delete User
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send();
  } catch (err) {
    console.log(err);
  }
});

export default router;
