const sha1 = require('sha1');
// const { ObjectID } = require('mongodb');
const Queue = require('bull');
const sendEmail = require('../utils/emails/sendEmail');
// const validator = require('validator');

// const redisClient = require('../utils/redis');
const models = require('../models/index');
const { _generateUUID, _hashPassword, _validateEmail } = require('../utils/utils');
const { getUserByParam, registerUser, updateUserByParam } = require('../utils/dao');

class AuthController {
  static async registerUser(req, res) {
    const {
      email, password, confirmPassword, username, firstName, lastName, role
    } = req.body;

    // Check if all required fields exist
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    if (!username) {
      return res.status(400).json({ error: 'Missing username' });
    }
    if (!firstName) {
      return res.status(400).json({ error: 'Missing Firstname' });
    }
    if (!lastName) {
      return res.status(400).json({ error: 'Missing Lastname' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }
    if (!confirmPassword) {
      return res.status(400).json({ error: 'Missing password confirmation' });
    }
    if (!role) {
      return res.status(400).json({ error: 'Missing Role' });
    }

    // // Checking if the email is valid and real
    const valid = await _validateEmail(email);
    if (!valid) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    // Check if the user already exists
    let dbUser = await getUserByParam({ email });
    if (dbUser) {
      return res.status(400).json({ error: `User ${email} already exists` });
    }

    // Check if the username already exists
    dbUser = await getUserByParam({ username });
    if (dbUser) {
      return res.status(400).json({ error: `Username ${username} already exists` });
    }

    // Check if the password and confirmed password do not match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Register the user
    // Hash the password
    const hashedPassword = _hashPassword(password);

    try {
      dbUser = await registerUser({
        email,
        password: hashedPassword,
        username,
        firstName,
        lastName,
        role,
      });
      return res.status(201).json({ message: `${ email } successfully registered` });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  // Login User
  static async loginUser(req, res) {
    const {
      username,
      password,
    } = req.body;

    // Check if all required fields exist
    if (!username) {
      return res.status(400).json({ error: 'Missing username' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    // Check if the email is valid and real
    // const valid = await _validateEmail(email);
    // if (!valid) {
    //   return res.status(400).json({ error: 'Please provide a valid email address.' });
    // }

    // Check if the user is valid
    let dbUser = await getUserByParam({ username });
    if (!dbUser) {
      return res.status(400).json({ error: `No account registered with username ${username}` });
    }

    // Check if the user's password is correct
    if (_hashPassword(password) !== dbUser.password) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    // Create a session for a valid user
    const sessionToken = _generateUUID();
    try {
      // Save the sessionToken to the database
      await updateUserByParam({ sessionToken }, { username });
      // Assign the sessionToken to a cookie
      res.cookie('session_id', sessionToken, {
        domain: 'localhost',
        expires: new Date(Date.now() + 86400000),
      });
      dbUser = await getUserByParam({ username });
      return res.status(200).json({ message: `Welcome ${dbUser.username}`, userData: dbUser });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  // Logout User
  static async logoutUser(req, res) {
    // Extract the session token from req
    const sessionToken = req.headers.session_id;
    if (!sessionToken) {
      return res.status(400).json({ error: 'Please Login First' });
    }
    // Using the session token, check if the user is logged in
    const dbUser = await getUserByParam({ sessionToken });
    if (!dbUser) {
      return res.status(400).json({ error: 'User not found' });
    }
    // Logout the user
    await updateUserByParam({ sessionToken: '' }, { sessionToken });
    return res.status(200).json({ message: `${dbUser.username} Logged out successfully` });
  }

  // Reset User Password
  static async resetPassword(req, res) {
    const {
      email,
    } = req.body;

    // Check if all required fields exist
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    // Check if the email is valid and real
    const valid = await _validateEmail(email);
    if (!valid) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    // Check if the user is valid
    const dbUser = await getUserByParam({ email });
    if (!dbUser) {
      return res.status(400).json({ error: `No account registered with email ${email}` });
    }

    // Generate a reset token and save to DB
    const resetToken = _generateUUID();
    try {
      // Save the sessionToken to the database
      await updateUserByParam({ resetToken }, { email });
    } catch (error) {
      return res.status(400).json({ error });
    }
    const clientURL = 'http://localhost:5000';
    // Email password reset link
    const link = `${clientURL}/passwordReset?token=${resetToken}&id=${dbUser.id}`;
    try {
      await sendEmail(dbUser.email, 'Password Reset Request', { name: dbUser.firstName, link }, './template/requestResetPassword.handlebars');
      return res.status(200).json({ message: `Password reset link sent to ${email}` });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  // Google Login
  static async googleOAuth(req, res) {

  }

  // static async getMe(req, res) {
  //   const token = req.headers['x-token'];
  //   const userId = await redisClient.get(`auth_${token}`);

  //   if (!userId) {
  //     return res.status(401).json({ error: 'Unauthorized' });
  //   }

  //   const id = new ObjectID(userId);
  //   const user = await dbClient.db.collection('users').findOne({ _id: id });
  //   return res.json({ email: user.email, id: userId });
  // }
}

module.exports = AuthController;
