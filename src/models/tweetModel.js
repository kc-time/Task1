import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ObjectId = mongoose.Schema.ObjectId;
const TweetSchema = new Schema({
    content: {
        type: String,
        required: 'Enter your content'
    },
    likes: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ],
    children: [
        {
            type: ObjectId,
            ref: 'Tweet'
        }
    ],
    parent: {
        type: ObjectId,
        ref: 'Tweet'
    },
    retweet: {
        type: ObjectId,
        ref: 'Tweet'
    },
    author_id: {
        type: ObjectId,
        ref: 'User'
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Tweet", TweetSchema)
