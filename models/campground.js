var mongoose = require(`mongoose`)

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [{type: mongoose.Schema.Types.ObjectID,
                ref: 'Comment'
            }
        ],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: `User`
        } ,
        username: String
    },
    price: String
});

module.exports = mongoose.model('Campground', campgroundSchema);