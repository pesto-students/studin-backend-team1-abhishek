// const postsService = require('../services/Posts.service')
const Post = require('../Models/Posts.model')
const User = require('../Models/User.model')

const getPost = async (req, res) => {
	try {
		const id = req.params.postId
		const post = await getPost(id)
		// const post = {id: "detailed post data"}
		res.json(post)
		return
	}
	catch (err) {
		res.status(500).send(err)
		return
	}
};

const getAllPosts = async (req, res) => {
	try {
		const allPosts = await Post.find()
		res.status(200).json({status: "OK", data: allPosts})
		return
		// res.status(200).send("Get all posts for current user");
	} catch (error) {
		console.log('Error occured when retrieving all posts')
		return
	}
};
const createPost = async (req, res) => {
	try {
		const { body } = req;
		// if (!body.post_title || !body.post || !body.likes || !body.comments){
		// 	return;
		// }
		const currentUser = await User.findOne({email: 'test@gmail.com'})
		// const currentUser = User.findById('63368e37db18210e620a568f')
		console.log(currentUser._id)
		console.log('creating a new post 3')
		const newPost = {
			post_author: currentUser._id,
			post_title: 'Killer Miller',
			post_content: 'random post content',
			post: 'Miller walked down the lane like a dumb killer',
			post_image: '',
			likes: [],
			comments: []
		}
		const createdPost = await Post.create(newPost);
		res.status(201).json({ status: "OK", data: createdPost });
		return
	} catch (error) {
		console.log('Error occured when creating post')
		console.log(error)
		return
	}

};

const deletePost = async (req, res) => {
	try {
		const {id} = req.params;
		console.log()
		const deletedPost = await Post.deleteOne({post_title: "Killer Miller"});
		res.status(200).json({ status: "OK", data: deletedPost });
		// res.send("Deleted 1 post for current user");
		return
	} catch (error) {
		console.log('Error occured when deleting post')
		return
	}

};

const addLike = async(req,res) => {
	try {
		const filter = { post_title: 'Killer Miller' };
		const update = { $inc: {
			likes: 1 // Increments by 1. Similarly, -2 will decrement by 2.
			} 
		};

		const oldDocument = await Post.updateOne(filter, update);
		// console.log(oldDocument.n); // Number of documents matched
		// console.log(oldDocument.nModified); // Number of documents modified
		res.status(200).json({ status: "OK", data: oldDocument });
		// const updatedLikes = Post.updateOne()
		return
	} catch (error) {
		console.log('Error occured when adding like')
		return
	}
};
const removeLike = async(req,res) => {
	try {
		const filter = { post_title: 'Killer Miller' };
		const update = { $inc: {
			likes: -1 // Increments by 1. Similarly, -2 will decrement by 2.
			} 
		};

		const oldDocument = await Post.updateOne(filter, update);
		// console.log(oldDocument.n); // Number of documents matched
		// console.log(oldDocument.nModified); // Number of documents modified
		res.status(200).json({ status: "OK", data: oldDocument });
		return
	} catch (error) {
		console.log('Error occured when removing like')
		return
	}
};
const addComment = async(req,res) => {
	try {
		const { id } = req.params;
		console.log(id)
		const { author, text } = req.body;
		let oldDocument = await Post.updateOne(
			// { _id: id }, 
			{ post_title: "Killer Miller"},
			{ $push: { comments: { author, text }} 
		});
		res.status(200).json({ status: "OK", data: oldDocument });		
		return
	} catch (error) {
		console.log('Error occured when adding comment')
		console.log(error)
		return
	}
};
const removeComment = async(req,res) => {
	try {
		return
	} catch (error) {
		console.log('Error occured when removing comment')
		return
	}
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