const postsService = require('../services/Posts.service')

const getPost = async (req, res) => {
	try {
		const id = req.params.postId
		const post = await getPost(id)
		// const post = {id: "detailed post data"}
		res.json(post)
	}
	catch (err) {
	res.status(500).send(err)
	}
};

const getAllPosts = (req, res) => {
	const allPosts = postsService.getAllPosts();
	res.send({status: "OK", data: allPosts})
	// res.status(200).send("Get all posts for current user");
};
const createPost = (req, res) => {
	const { body } = req;
	if (!body.name || !body.mode || !body.equipment || !body.exercises || !body.trainerTips){
		return;
	}
	const newPost = {
		name: body.name,
		mode: body.mode,
		equipment: body.equipment,
		exercises: body.exercises,
		trainerTips: body.trainerTips,
	}
	const createdPost = postsService.createPost(newPost);
	res.status(201).send({ status: "OK", data: createPost });
};
const deletePost = (req, res) => {
	const deletedPost = postsService.deletePost();
	res.send("Deleted 1 post for current user");
};

const addLike = () => {

};
const removeLike = () => {

};
const addComment = () => {

};
const removeComment = () => {

};

module.exports =  {
	getPost,
	getAllPosts,
	createPost,
	deletePost,
	addLike,
	removeLike,
	addComment,
	removeComment
}