const { authService } = require('../../Services/Auth.service');
const User = require('../../Models/User.model')

const createUser = async (req,res) => {
	try {
        console.log('entered in create')
        const user = new User({
            email: 'beast@gmail.com',
            first_name: 'Mohan',
            last_name: 'xMM',
            age: '27',
            city: 'Mumbai',
            country: 'Maharastra',
            school_name: 'Montessori',
            college_name: 'Engineering college',
            interests: ['coding'],
            connections: [{email:'test@gmail.com', first_name: 'Jaganx', last_name: 'xJJ'}],
            connection_requests: [],
            phone: '1234353532',
            posts: [],
            profile_photo: '',
            bio: 'I"m a decent coder'
        }, )
		let data = await User.create(user)
        console.log('completed data creation')
        // console.log(data)
        res.status(201).send(data)
		return
	} catch (error) {
		return
	}
};

module.exports = createUser;