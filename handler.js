const config = require('config');
const twit = require('twit');

// Personal Account
const varTwit = new twit({
    consumer_key: config.twitter_personalAccount.consumer_key,
    consumer_secret: config.twitter_personalAccount.consumer_secret,
    access_token: config.twitter_personalAccount.access_token,
    access_token_secret: config.twitter_personalAccount.access_token_secret,
});

// Official Account
// const varTwit = new twit({
//     consumer_key: config.twitter_officialAccount.consumer_key,
//     consumer_secret: config.twitter_officialAccount.consumer_secret,
//     access_token: config.twitter_officialAccount.access_token,
//     access_token_secret: config.twitter_officialAccount.access_token_secret,
// });
// function retweet() {
module.exports.twitterBot = (event, context, callback) => {
    let params = {
        // q:'#100DaysOfCode OR #coronavirus OR #CommunityShield min_retweets:20 lang:en',
        q:'#100DaysOfCode OR #Trending OR #codenewbies OR #codinglife OR #CodeNewbie OR #GirlsWhoCode OR #coronavirus OR #javascript  min_retweets:20 lang:en',
        result_type:'recent',
        count:150
    }
    varTwit.get('search/tweets', params,(err,data,response)=>
    {
        let tweets = data.statuses
        if(!err)
        {
            for(let dat of tweets)
            {
                let retweetId = dat.id_str;
                varTwit.post('statuses/retweet/:id', {id: retweetId}, (err, response)=>
                varTwit.post('favorites/create', {id: retweetId}, (err, response)=>
                {
                    if (response) {
                        console.log('Post retweeted and Favorited!!! with retweetID - ' + retweetId);
                        return callback(null, 'Post retweeted and Favorited!!! with retweetID - ' + retweetId);
                    }
                    if (err) {
                        console.log('Already RETWEETED...');
                        return callback('Already RETWEETED...', null)
                    }
                }))
                
            }
        }
    })
}