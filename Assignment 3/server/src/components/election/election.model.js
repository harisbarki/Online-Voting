let mongoose = require('mongoose');
let Schema = mongoose.Schema;

/**
 * @module  User
 * @description contain the details of Attribute
 */

let Election = new Schema({

	name: {
		type: String,
		required: true
	},

	electionStrategy: {
		type: String,
		required: true
	},

	dateFrom: {
		type: Date,
	},

	dateTo: {
		type: Date,
	},

	isDistrictElections: {
		type: Boolean,
	},

	numberOfDistricts: {
		type: Int16Array,
	},

	candidatesStrategy: {
		type: String,
	},

	usersStrategy: {
		type: String,
	},

	userObjectConditions: {
		type: String,
	},

	candidates: [
		{
			_id: false,
			candidateId: {
				type: Schema.ObjectId,
				ref: 'Users'
			},
			numOfVotes: {
				type: Int16Array
			}
		}
	],

	voters: [
		{
			_id: false,
			voterId: {
				type: Schema.ObjectId,
				ref: 'Users'
			}
		}
	]
});


Election.statics = {
	save: function (requestData) {
		return this.create(requestData);
	},
	findUpdate: function (query, user) {
		return this.findOneAndUpdate(query, user);
	},
	update: function (user) {
		return user.save();
	},

	find: function (query) {
		return this.findOne(query);
	},

	findByIdAndEmail: function (id, email) {
		return this.findOne({email: email, _id: id});
	}
};

let election = mongoose.model('user', Election);

/** export schema */
module.exports = {
	Election: election
};
