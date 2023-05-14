const models = require('../models/index');

async function getAllPosts() {
    const dbPosts = await models.Post.findAll({
        include: [ models.Picture,
                   models.User,
                   models.Video,
                   models.Document],
        order: [
          ['createdAt', 'DESC'],
        ],
    });
    return dbPosts;
}

async function getAllPostsByParam(param) {
    const dbPosts = await models.Post.findAll({
        where: param,
        include: [ models.Picture,
          models.User,
          models.Video,
          models.Document],
        order: [
          ['createdAt', 'DESC'],
        ],
    });
    return dbPosts;
}

async function getPostByParam(param) {
  const dbPosts = await models.Post.findOne({
    where: param,
    include: [ models.Picture,
      models.User,
      models.Video,
      models.Document]
  });
  return dbPosts;
}

async function registerPost(dict) {
  const post = await models.Post.create(
    dict
    );
  return post;
}

async function registerPictureForPost(dict) {
  const picture = await models.Picture.create(
    dict
    );
  return picture;
}

async function registerVideoForPost(dict) {
  const video = await models.Video.create(
    dict
    );
  return video;
}

async function registerDocumentForPost(dict) {
  const document = await models.Document.create(
    dict
  );
  return document;
}

async function updatePostByParam(dict, id) {
  await models.Post.update(
    dict,
    {
      where: id,
    },
  );
}

async function deletePostByParam(param) {
    await models.Post.destroy({
        where: param,
    });
}

module.exports = { getPostByParam,
                   registerPost,
                   registerPictureForPost,
                   registerVideoForPost,
                   registerDocumentForPost,
                   updatePostByParam,
                   deletePostByParam,
                   getAllPostsByParam,
                   getAllPosts };