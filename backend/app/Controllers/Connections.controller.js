const { allConnections } = require('../services/Connections.service')

const getConnections = async (req, res) => {
	try {
		const id = req.params.id
		const post = await allConnections(id)
		res.json(post)
	}
	catch (err) {
	res.status(500).send(err)
	}
};

const addConnection = () => {

};

const removeConnection = () => {

};

module.exports = {
	getConnections,
	addConnection,
	removeConnection
}