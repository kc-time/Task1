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
    if (tweet.retweet) {
        const retweet = await Tweet.findById(tweet.retweet)
        if (!retweet) return res.status(400).send('Incorrect tweet')
        tweet.retweet = retweet
    }

    if (tweet.parent) {
        const parent = await Tweet.findById(tweet.parent)
        tweet.parent = parent
    }

    if (tweet.children.length > 0) {
        const children = await Promise.all(tweet.children.map(async itemid => {
                const item = Tweet.findById(itemid)
                return item
        }));
        tweet.children = children.filter((item) => item);
    }

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

export const likeTweet = async (req, res) => {
    const tweet = await Tweet.findById(req.params.tweetid);
    if (!tweet) return res.status(400).send('Incorrect tweet')
    let message;
    const matchIndex = tweet.likes.findIndex((userid) => userid == req.session.userid)
    if (matchIndex !== -1) {
        tweet.likes.splice(matchIndex, 1);
        message = "Unliked";
    } else {
        tweet.likes.push(req.session.userid);
        message = "Liked";

    }
    tweet.save((err, tweet) => {
        if (err) return res.status(400).send('Incorrect tweet')
        return res.send(message)
    })
}

export const reTweet = async (req, res) => {
    let session = req.session;
    let { content } = req.body;
    const tweet = await Tweet.findById(req.params.tweetid)
    if (!tweet) return res.status(400).send('Incorrect tweet')
    
    let newTweet = new Tweet({ 
        author_id: session.userid,
        content,
        retweet: req.params.tweetid
    });

    newTweet.save((err, tweet) => {
        if (err) {
            return res.send(err);
        }

        return res.status(201).send('Retweeted');
    })
}

export const threadTweet = async (req, res) => {
    let session = req.session;
    let { content } = req.body;

    let parentTweet = await Tweet.findById(req.params.tweetid)
    if (!parentTweet) return res.status(400).send('Incorrect tweet')

    let newTweet = new Tweet({ 
        author_id: session.userid,
        content,
        parent: parentTweet._id
    });

    const tweet = await newTweet.save();
    
    if (!tweet) return res.status(400).send('Incorrect tweet')
    parentTweet.children.push(tweet._id)


    parentTweet = await parentTweet.save()

    if (parentTweet) return res.send('Threaded created')

    
}