const models = require('../models/index');
const _COMPLETED_DONATION = require('./completedDonationSeed.json');
const _DOCUMENT = require('./documentSeed.json');
const _PENDING_DONATION = require('./pendingDonationSeed.json');
const _PICTURE = require('./pictureSeed.json');
const _POST = require('./postSeed.json');
const _USER = require('./userSeed.json');
const _VIDEO = require('./videoSeed.json');

module.exports = {
  insert: () => {
    models.User.bulkCreate(_USER)
      .then(() => {
        models.Post.bulkCreate(_POST)
          .then(() => {
            models.Picture.bulkCreate(_PICTURE);
            models.Document.bulkCreate(_DOCUMENT);
            models.Video.bulkCreate(_VIDEO);
            models.PendingDonation.bulkCreate(_PENDING_DONATION)
            .then(() => {
              models.CompletedDonation.bulkCreate(_COMPLETED_DONATION);
            })
            // models.CompletedDonation.bulkCreate(_COMPLETED_DONATION);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
