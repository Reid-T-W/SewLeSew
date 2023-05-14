const models = require('../models/index');

async function getUserByParam(param) {
  const dbUser = await models.User.findOne({
    where: param,
  });
  return dbUser;
}

async function registerUser(dict) {
  const user = await models.User.create(dict);
  return user;
}

async function updateUserByParam(dict, email) {
  await models.User.update(
    dict,
    {
      where: email,
    },
  );
}

module.exports = { getUserByParam, registerUser, updateUserByParam };
