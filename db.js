const {MongoClient} = require('mongodb');

const dbUrl = 'mongodb://localhost:27017';
const dbName = 'users-list';

async function connect(collection) {
  const client = await MongoClient.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = client.db(dbName);
  return db.collection(collection);
}

function getUsers() {
  return connect('users');
}

function getPosts() {
  return connect('posts');
}

async function deleteUser(id) {
  (await getUsers())
    .deleteOne({
      _id: id,
    });
}

async function deletePost(id) {
  (await getPosts())
    .deleteOne({
      _id: id,
    });
}

module.exports = {
  connect,
  getUsers,
  getPosts,
  deleteUser,
  deletePost,
};