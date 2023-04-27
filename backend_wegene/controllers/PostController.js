const sha1 = require('sha1');
// const { ObjectID } = require('mongodb');
const Queue = require('bull');
// const redisClient = require('../utils/redis');
// const cloudinary = require('../utils/cloudinary');
const User = require('../models/User');
const { getUserByParam, registerUser, updateUserByParam } = require('../utils/dao');
const { 
  getPostByParam,
  registerPost,
  registerPictureForPost,
  registerVideoForPost,
  registerDocumentForPost,
  updatePostByParam,
  deletePostByParam,
  getAllPostsByParam, 
  getAllPosts } = require('../utils/postDao');
const { 
  addPendingDonation,
  getAllPendingDonations,
  getAllPendingDonationsByParam,
  getPendingDonationByParam,
  deletePendingDonationByParam} = require('../utils/pendingDonationDao');
const {
  addDonation,
  getAllDonations,
  getAllDonationsByParam,
  getDonationByParam,
  deleteDonationByParam,
  sumDonationsByPost } = require('../utils/donationDao');
const db = require('../models');

class PostController {
  // Getting all the posts in the database
  static async getAllPosts(req, res) {
    const dbPosts = await getAllPosts();
    return res.status(200).json(dbPosts);
  }

  // Registering a new post
  static async postNewPost(req, res) {
    const {
      title,
      description,
      amount,
      totalRaised,
      location,
      category,
      pictureFile,
      videoFile,
      documentFile
    } = req.body;

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

    // Check if all required fields exist
    if (!title) {
      return res.status(400).json({ error: 'Missing title' });
    }
    if (!description) {
      return res.status(400).json({ error: 'Missing description' });
    }
    if (!amount) {
      return res.status(400).json({ error: 'Missing amount' });
    }
    if (!totalRaised) {
      return res.status(400).json({ error: 'Missing totalRaised' });
    }
    if (!category) {
      return res.status(400).json({ error: 'Missing category' });
    }

    // Check if their is a post with the same title under the same user
    const titleUnderUser = await getPostByParam({ title, UserId: dbUser.id });
    if (titleUnderUser) {
      return res.status(400).json({ error: 'Post already exists' });
    }
    // // Uploading files to cloudinary
    // const resultPicture = await cloudinary.uploader.upload(pictureFile,{
    //   folder: "pictures",
    //   // width: 300,
    //   // crop: "scale"
    // })
    // const resultVideo = await cloudinary.uploader.upload(videoFile,{
    //   folder: "vidoes",
    //   // width: 300,
    //   // crop: "scale"
    // })
    // const resultDocuments = await cloudinary.uploader.upload(documentFile,{
    //   folder: "documents",
    //   // width: 300,
    //   // crop: "scale"
    // })
    // Save the post to DB
    try {
      const dbPost = await registerPost({
        title,
        description,
        amount,
        totalRaised,
        category,
        UserId: dbUser.id,
      });
      if (pictureFile) {
        const dbPicture = await registerPictureForPost({
          pictureFile,
          // public_id: resultPicture.public_id,
          // url: resultPicture.secure_url
        });
        dbPicture.setPost(dbPost);
      }
      if (videoFile) {
        const dbVideo = await registerVideoForPost({
          videoFile,
          // public_id: resultVideo.public_id,
          // url: resultVideo.secure_url
        });
        dbVideo.setPost(dbPost);
      }
      if (documentFile) {
        const dbDocument = await registerDocumentForPost({
          documentFile,
          // public_id: resultDocuments.public_id,
          // url: resultDocuments.secure_url
        });
        dbDocument.setPost(dbPost);
      }
      return res.status(201).json({ message: `Post titled ${ dbPost.title } successfully registered` });
    } catch (error) {
      return res.status(400).json({ error: "Error during registration" });
    }
  }

  // Getting a single post by id
  static async getPostById(req, res) {
    const { id } = req.params;

    // Check if the post exists
    const dbPost = await getPostByParam({ id });
    if (!dbPost) {
      return res.status(400).json({ error: 'Post not found' });
    }

    return res.status(200).json(dbPost);
  }

  // Updating a post given an id
  static async updatePost(req, res) {
    const { id } = req.params;

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

    // Check if the post exists
    const dbPost = await getPostByParam({ id });
    if (!dbPost) {
      return res.status(400).json({ error: 'Post not found' });
    }

    // Check if the user is the owner of the post
    if (dbPost.UserId !== dbUser.id) {
      return res.status(400).json({ error: 'You are not the owner of this post' });
    }

    // Update the post in the DB
    try {
      await updatePostByParam( req.body, { id });
      return res.status(201).json({ message: `Post titled ${ dbPost.title } successfully updated` });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  // Deleting a post given an id
  static async deletePost(req, res) {
    const { id } = req.params;

    // Check if the post exists
    const dbPost = await getPostByParam({ id });
    if (!dbPost) {
      return res.status(400).json({ error: 'Post not found' });
    }

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

    // Check if the user is the owner of the post
    if (dbPost.UserId !== dbUser.id) {
      return res.status(400).json({ error: 'You are not the owner of this post' });
    }

    // Delete the post in the DB
    try {
      await deletePostByParam({ id });
      return res.status(201).json({ message: `Post titled ${ dbPost.title } successfully deleted` });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  }

  // Getting all donations for a post
  static async getAllDonationsByPost(req, res) {
    const { id } = req.params;
    // Check if the post exists
    const dbPost = await getPostByParam({ id });
    if (!dbPost) {
      return res.status(400).json({ error: 'Post not found' });
    }
    const dbCompletedDondationsForPost = await getAllDonationsByParam({ PostId: id });
    return res.status(200).json(dbCompletedDondationsForPost);
  }

  static async getAllPendingDonationsByPost(req, res) {
    const { id } = req.params;
    // Check if the post exists
    const dbPost = await getPostByParam({ id });
    if (!dbPost) {
      return res.status(400).json({ error: 'Post not found' });
    }
    const dbPendingDondationsForPost = await getAllPendingDonationsByParam({ PostId: id });
    return res.status(200).json(dbPendingDondationsForPost);
  }

  // Adding a donation to a post
  static async postNewDonation(req, res) {
    // Get user from session token
    const sessionToken = req.headers.session_id;
    if (!sessionToken) {
      return res.status(400).json({ error: 'Please Login First' });
    }
    const dbUser = await getUserByParam({ sessionToken });
    if (!dbUser) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Get post id from param
    const { id } = req.params;
    const dbPost = await getPostByParam({ id });
    if (!dbPost) {
      return res.status(400).json({ error: 'Post not found' });
    }

    // Get the pending donation id from req body
    const { pendingDonationId } = req.body;
    
    // Check if the pending donation exists
    const dbPendingDonation = await getPendingDonationByParam({ id: pendingDonationId });
    if (!dbPendingDonation) {
      return res.status(400).json({ error: 'Pending Donation not found' });
    }

    // Check if the pending donation belongs to the post
    if (dbPendingDonation.PostId !== dbPost.id) {
      return res.status(400).json({ error: 'Pending Donation does not belong to this post' });
    }

    // Check if the user is the owner of the pending donation
    if (dbPendingDonation.UserId !== dbUser.id) {
      return res.status(400).json({ error: 'You are not the owner of this pending donation' });
    }

    // Add the donation to the donations table
    const amount = dbPendingDonation.amount;
    const dbDonation = await addDonation({
      amount,
    })

    // Delete the pending donation from the pending donations table
    await deletePendingDonationByParam({ id: pendingDonationId });

    // Add the donation to the post
    dbDonation.setPost(dbPost);
    // Add the donation to the user
    dbDonation.setUser(dbUser);
    // Get sum of donations for this post
    const sumOfAllDonationsForPost = await sumDonationsByPost(dbPost.id)

    // Increment the value of totalRaised for Post
    await updatePostByParam( {totalRaised: sumOfAllDonationsForPost}, { id:dbPost.id });
    
    return res.status(201).json({ message: `You have successfully donated ${ amount } to ${dbUser.username}'s post titled ${dbPost.title}` });


  }

  // Adding a pending donation to a post
  static async postNewPendingDonation(req, res) {
    // Get user from session token
    const sessionToken = req.headers.session_id;
    if (!sessionToken) {
      return res.status(400).json({ error: 'Please Login First' });
    }
    const dbUser = await getUserByParam({ sessionToken });
    if (!dbUser) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Get post id from param
    const { id } = req.params;
    const dbPost = await getPostByParam({ id });
    if (!dbPost) {
      return res.status(400).json({ error: 'Post not found' });
    }

    const { amount } = req.body;
    // Check if the post has reached its goal
    if (parseInt(dbPost.totalRaised) >= parseInt(dbPost.amount)){
      return res.status(400).json({ error: `Thank you but this post has reached its goal`});
    }
    if (parseInt(dbPost.totalRaised) + parseInt(amount)>= parseInt(dbPost.amount)){
      return res.status(400).json({ error: `Please enter an amount less than or equal to ${dbPost.amount - dbPost.totalRaised}`});
    }

    // Add the pending donation to the pending donations table
    const dbPendingDonation = await addPendingDonation({
      amount,
    })
    dbPendingDonation.setPost(dbPost);
    dbPendingDonation.setUser(dbUser);
    return res.status(201).json({ message: `${ amount } successfully added to pending donations` });
  }

  // static async questionAnswer(req, res) {

  // }

  // static async editQuestionAnswer(req, res) {

  // }

  // static async getAllQuestionsAnswersOnPost(req, res) {

  // }

  // static async getQuestionAnswerOnPost(req, res) {

  // }

  // static async deleteQuestionAnswerOnPost(req, res) {

  // }

  static async searchPosts(req, res) {

  }

  static async searchDonations(req, res) {

  }

  static async getAllDonations(req, res) {

  }

  static async getAllPendingDonations(req, res) {

  }
}

module.exports = PostController;
