exports.viewAllPosts = (req, res) => {
  res.json('All the posts');
};

exports.createPost = (req, res) => {
  res.json('Created a post');
};

exports.viewPost = (req, res) => {
  res.json('One post');
};

exports.editPost = (req, res) => {
  res.json('Edited a post');
};

exports.deletePost = (req, res) => {
  res.json('Deleted a post');
};
