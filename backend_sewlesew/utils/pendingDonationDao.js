const models = require('../models/index');

async function addPendingDonation(dict) {
    const pendingDonation = await models.PendingDonation.create(
        dict
    );
    return pendingDonation;
}

async function getAllPendingDonations() {
    const dbPendingDonations = await models.PendingDonation.findAll({
        order: [
            ['createdAt', 'DESC'],
        ],
    });
    return dbPendingDonations;
}

async function getAllPendingDonationsByParam(param) {
    const dbPendingDonations = await models.PendingDonation.findAll({
        where: param,
        include: [ models.Post, models.User ],
        order: [
            ['createdAt', 'DESC'],
        ],
    });
    return dbPendingDonations;
}

async function getPendingDonationByParam(param) {
    const dbPendingDonation = await models.PendingDonation.findOne({
        where: param,
    });
    return dbPendingDonation;
}

async function deletePendingDonationByParam(param) {
    await models.PendingDonation.destroy({
        where: param,
    })
}

module.exports = { addPendingDonation,
                   getAllPendingDonations,
                   getAllPendingDonationsByParam,
                   getPendingDonationByParam,
                   deletePendingDonationByParam};
