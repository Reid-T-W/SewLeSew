const models = require('../models/index');

async function addDonation(dict) {
    const donation = await models.CompletedDonation.create(
        dict
    );
    return donation;
}

async function getAllDonations() {
    const dbDonations = await models.CompletedDonation.findAll({
        order: [
            ['createdAt', 'DESC'],
        ],
    });
    return dbDonations;
}

async function getAllDonationsByParam(param) {
    const dbDonations = await models.CompletedDonation.findAll({
        where: param,
        include: [ models.Post, models.User ],
        order: [
            ['createdAt', 'DESC'],
        ],
    });
    return dbDonations;
}

async function getDonationByParam(param) {
    const dbDonation = await models.CompletedDonation.findOne({
        where: param,
    });
    return dbDonation;
}

async function deleteDonationByParam(param) {
    await models.CompletedDonation.destroy({
        where: param,
    })
}

async function sumDonationsByPost(postId) {
    const sum = await models.CompletedDonation.sum('amount', { where: { PostId: postId } });
    return sum
}

module.exports = { addDonation,
                   getAllDonations,
                   getAllDonationsByParam,
                   getDonationByParam,
                   deleteDonationByParam,
                   sumDonationsByPost
                };
