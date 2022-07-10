import { createTweet, getAllTweets, getTweetWithID, updateTweet, deleteTweet, likeTweet, reTweet, threadTweet } from "../controllers/tweetController"
import { authenticate } from "../authenticate";
import express from "express";
const router = express.Router()

router.get('/', getAllTweets)
router.use(authenticate)
router.post('/', createTweet)


router.get('/:tweetid', getTweetWithID)
router.put('/:tweetid', updateTweet)
router.delete('/:tweetid', deleteTweet);

router.post('/:tweetid/like', likeTweet)
router.post('/:tweetid/retweet', reTweet)
router.post('/:tweetid/thread', threadTweet)

export default router;