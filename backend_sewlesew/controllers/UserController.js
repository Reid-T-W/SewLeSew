const sha1 = require('sha1');
// const { ObjectID } = require('mongodb');
const Queue = require('bull');
// const redisClient = require('../utils/redis');
const User = require('../models/User');
const { getUserByParam, registerUser, updateUserByParam } = require('../utils/dao');
const { getAllPostsByParam } = require('../utils/postDao');
const { getAllDonationsByParam } = require('../utils/donationDao');
const { getAllPendingDonationsByParam } = require('../utils/pendingDonationDao');
const { _hashPassword } = require('../utils/utils');

class UserController {
  // Gets a user by given an id
  static async getUserById(req, res) {
  
  const { id } = req.params;
  // Check if the user is logged in
  const sessionToken = req.headers.session_id;
  if (!sessionToken) {
    return res.status(401).json({ error: 'Please login first' });
  }
  const dbRequestingUser = await getUserByParam({ sessionToken: sessionToken });
  if (!dbRequestingUser) {
    return res.status(404).json({ error: 'Requesting User not found' });
  }
  // Check if the user details are requested by the user themselves
  const dbUser = await getUserByParam({ id });
  if (!dbUser) {
    return res.status(404).json({ error: 'Requested User not found' });
  }
  if (dbUser.id !== dbRequestingUser.id) {
    return res.status(401).json({ error: 'You are not authorized to view this user' });
  }
  // Return the user details
  return res.status(200).json({ message: `${dbUser.username}'s details are successfully retrieved`, userData: dbUser });

}

  // Update user details
  static async updateUser(req, res) {
    const { id } = req.params;
    // Check if the user is logged in
    const sessionToken = req.headers.session_id;
    if (!sessionToken) {
      return res.status(401).json({ error: 'Please login first' });
    }
    const dbRequestingUser = await getUserByParam({ sessionToken: sessionToken });
    if (!dbRequestingUser) {
      return res.status(404).json({ error: 'Requesting User not found' });
    }
    // Check if the user details are requested by the user themselves
    const dbUser = await getUserByParam({ id });
    if (!dbUser) {
      return res.status(404).json({ error: 'Requested User not found' });
    }
    if (dbUser.id !== dbRequestingUser.id) {
      return res.status(401).json({ error: 'You are not authorized to view this user' });
    }
    // Update the user details
    if (req.body.sessionToken) {
      return res.status(401).json({ error: 'Illegal request' });
    }

    // Hash the new password, if it has been sent
    if (req.body.password) {
      const hashedPassword = _hashPassword(req.body.password);
      req.body.password = hashedPassword;
    }
    
    const updatedUser = await updateUserByParam(req.body, { id });
    return res.status(200).json({ message: `${dbUser.username}'s details are successfully updated`, userData: updatedUser });
  }

  // Delete user
  static async deleteUser(req, res) {

  }

  static async searchUsers(req, res) {

  }

  static async getAllUsers(req, res) {

  }

  // Get all donations made by a user
  static async getAllDonationsByUser(req, res) {
    const sessionToken = req.headers.session_id;
    if (!sessionToken) {
      return res.status(401).json({ error: 'Please login first' });
    }
    // Check if the user exists
    const dbUser = await getUserByParam({ sessionToken });
    if (!dbUser) {
      return res.status(400).json({ error: 'User not found' });
    }
    const dbCompletedDondationsForPost = await getAllDonationsByParam({ UserId: dbUser.id });
    return res.status(200).json(dbCompletedDondationsForPost);
  }

  // Get all pending donations made by a user
  static async getAllPendingDonationsByUser(req, res) {
    const sessionToken = req.headers.session_id;
    if (!sessionToken) {
      return res.status(401).json({ error: 'Please login first' });
    }
    // Check if the user exists
    const dbUser = await getUserByParam({ sessionToken });
    if (!dbUser) {
      return res.status(400).json({ error: 'User not found' });
    }
    const dbCompletedDondationsForPost = await getAllPendingDonationsByParam({ UserId: dbUser.id });
    return res.status(200).json(dbCompletedDondationsForPost);
  }

  // Get all posts made by a user
  static async getAllPostsByUser(req, res) {

    const sessionToken = req.headers.session_id;
    if (!sessionToken) {
      return res.status(401).json({ error: 'Please login first' });
    }
    // Check if the user exists
    const dbUser = await getUserByParam({ sessionToken });
    if (!dbUser) {
      return res.status(400).json({ error: 'User not found' });
    }

    const dbPostsFromUser = await getAllPostsByParam({UserId:dbUser.id});
    if (!dbPostsFromUser) {
      return res.status(401).json({ error: 'Posts not found' });
    }
    return res.status(200).json(dbPostsFromUser);
  }




}

module.exports = UserController;
