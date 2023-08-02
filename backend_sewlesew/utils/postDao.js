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
      models.Document,
      models.CompletedDonation]
  });
  return dbPosts;
}

async function registerPost(dict) {
  console.log("In postDao registerPost line 42")
  const post = await models.Post.create(
    dict
    );
    console.log("In postDao registerPost line 46", post)
  return post;
}

async function registerPictureForPost(picturesList) {
  // const picture = await models.Picture.create(
  //   dict
  //   );
  const pictures = await models.Picture.bulkCreate(
    picturesList
  )
  return pictures;
}

async function registerVideoForPost(videoList) {
  const dict = videoList[0]
  // console.log("In postDao line 62 ", videoList, dict)
  const video = await models.Video.create(
    dict
  );
  // const videos = await models.Video.bulkCreate(
  //   videoList
  // )
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