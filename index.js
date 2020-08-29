const config = require('config');
const twit = require('twit');
const varTwit = new twit({
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    access_token: config.access_token,
    access_token_secret: config.access_token_secret,
});


function retweet()
{
    let params = {
        // q:'#100DaysOfCode OR #coronavirus OR #CommunityShield min_retweets:20 lang:en',
        q:'#100DaysOfCode OR #codeztech min_retweets:20 lang:en',
        result_type:'recent',
        count:100
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
                    if (response)
                    console.log('Post retweeted and Favorited!!! with retweetID - ' + retweetId)
                    if (err)
                    console.log('Already RETWEETED...')
                }))
                
            }
        }
    })
}

retweet();
// setInterval(retweet,60000)