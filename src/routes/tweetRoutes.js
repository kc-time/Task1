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

export default router;