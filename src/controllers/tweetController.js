import Tweet from "../models/tweetModel";
export const createTweet = (req, res) => {
    let session = req.session;
    let { content } = req.body;
    let newTweet = new Tweet({ 
        author_id: session.userid,
        content
    });

    newTweet.save((err, tweet) => {
        if (err) {
            return res.send(err);
        }

        return res.status(201).json(tweet);
    })
}

export const getAllTweets = (req, res) => {

    Tweet.find({}, (err, tweet) => {
        if (err) {
            return res.send(err);
        }

        return res.json(tweet);
    })
}

export const getTweetWithID = async (req, res) => {

    const tweet = await Tweet.findById(req.params.tweetid)
    if (!tweet) return res.status(400).send('Incorrect tweet')


    return res.json(tweet)
}

export const updateTweet = (req, res) => {

    Tweet.findOneAndUpdate({ _id: req.params.tweetid, author_id: req.session.userid}, req.body, { new: true }, (err, tweet) => {
        if (err) {
            return res.status(400).send(err);
        }
        return res.json(tweet);
    })
}

export const deleteTweet = (req, res) => {
    Tweet.deleteOne({ _id: req.params.tweetid, author_id: req.session.userid}, (err, tweet) => {
        if (err) {
            return res.status(400).send(err);
        }
        if (tweet.deletedCount > 0)
            return res.status(200).send('Deleted tweet')
        else {
            return res.status(400).send('Tweet not found')
        }
    })
}
