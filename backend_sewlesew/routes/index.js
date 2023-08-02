const { Router } = require('express');
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');
const PostController = require('../controllers/PostController');
const PaymentController = require('../controllers/PaymentController');

const router = Router();

// Non-Admin routes *************************************************
// Auth routes ---------------------------------------------------
// Register, Login, Logout, and Reset Password routes

router.post('/api/v1/register', AuthController.registerUser);

router.post('/api/v1/login', AuthController.loginUser);

router.get('/api/v1/logout', AuthController.logoutUser);

router.post('/api/v1/reset-password', AuthController.resetPassword);

router.get('/api/v1/oauth/google', AuthController.googleOAuth);

// User routes ----------------------------------------------------
// Get User posts
router.get('/api/v1/users/posts', UserController.getAllPostsByUser);

// Get User donations
router.get('/api/v1/users/donations', UserController.getAllDonationsByUser);

// Get User pending donations
router.get('/api/v1/users/pending-donations', UserController.getAllPendingDonationsByUser);

// Routes for getting users

router.get('/api/v1/users/:id', UserController.getUserById);

// Routes for creating and updating users

// router.post('/api/v1/users', UserController.postNewUser);
// The above can be done by the auth register route

router.patch('/api/v1/users/:id', UserController.updateUser);

// Routes for deleting a user

router.delete('/api/v1/users/:id', UserController.deleteUser);

// Routes for viewing all donations made by a user

// router.get('/api/v1/users/:id/donations', UserController.getAllDonationsByUser); // Socket.io

// Routes for viewing all pending donations made by a user

// router.get('/api/v1/users/:id/pending-donations', UserController.getAllPendingDonationsByUser);
// Socket.io

// Routes for viewing all posts made by a user

// router.get('/api/v1/users/:id/posts', UserController.getAllPostsByUser); // Socket.io

// Posts Routes ----------------------------------------------------
// Get all posts made by all users
router.get('/api/v1/posts', PostController.getAllPosts);
// Make a new post
router.post('/api/v1/posts', PostController.postNewPost);
// Get a single post
router.get('/api/v1/posts/:id', PostController.getPostById);
// Edit a post
router.patch('/api/v1/posts/:id', PostController.updatePost);
// Delete a post
router.delete('/api/v1/posts/:id', PostController.deletePost);
// Get donations for a single post
router.get('/api/v1/posts/:id/donations', PostController.getAllDonationsByPost); // Socket.io

// Get pending donations for a single post
router.get('/api/v1/posts/:id/pending-donations', PostController.getAllPendingDonationsByPost); 
// Socket.io

// Make a donation to a post
router.post('/api/v1/posts/:id/donations', PostController.postNewDonation);

// Make a pending donation to a post
router.post('/api/v1/posts/:id/pending-donations', PostController.postNewPendingDonation);

// // Ask and Answer questions about a post
// router.post('/api/v1/posts/:id/qanda', PostController.questionAnswer);
// // Edit question and anwers on a post
// router.patch('/api/v1/posts/:id/qanda/:id', PostController.editQuestionAnswer);
// // Get all questions and answers on a post
// router.get('/api/v1/posts/:id/qanda', PostController.getAllQuestionsAnswersOnPost);
// // Get a single question and answer on a post
// router.get('/api/v1/posts/:id/qanda/:id', PostController.getQuestionAnswerOnPost);
// // Delete a question and answer on a post
// router.delete('/api/v1/posts/:id/qanda/:id', PostController.deleteQuestionAnswerOnPost);



// Search Routes ----------------------------------------------------
// Search for posts
router.get('/api/v1/search-posts', PostController.searchPosts);

// Search for donations
router.get('/api/v1/search-donations', PostController.searchDonations);

// Search for users
router.get('/api/v1/search-users', UserController.searchUsers);

// Admin only routes ******************************************************

router.get('/api/v1/users', UserController.getAllUsers); // Admin only
// Get all donations made by all users
router.get('/api/v1/donations', PostController.getAllDonations); // Admin only
// Get all pending donations made by all users
router.get('/api/v1/pending-donations', PostController.getAllPendingDonations); // Admin only

// Payment (Chapa)
router.post('/api/v1/payViaChapa', PaymentController.payViaChapa);

router.get('/api/v1/verify-payment/:id', PaymentController.verifyPayment);

router.get('/api/v1/payment-success', PaymentController.paymentSuccess);

// Delete Individual Pending Donation
router.delete('/api/v1/pending-donations/:id', PostController.deletePendingDonation);

// Transfer pending dontation to completed donation
router.get('/api/v1/pending-donations/transfer', PostController.transferPendingDonations);
module.exports = router;
