/**
 * Returns the response from the Yelp API
 * @param search String the user's wish
 * @param loc String the user's location (determined from reverse geocoding or from the profile)
 * @return Object the name and image of the business and mandatory items (url, star ratings, reviews) 
 *          as per the agreement of API use
 */

Meteor.methods({
    yelp_opportunity: function(search, loc) {
        check(search, String);
        check(loc, String);
        
        var yelp = new Yelp({
            consumer_key: Meteor.settings.yelp.consumerKey,
            consumer_secret: Meteor.settings.yelp.consumerSecret,
            token: Meteor.settings.yelp.token,
            token_secret: Meteor.settings.yelp.tokenSecret
        });
        
        var Future = Npm.require('fibers/future');
        var future = new Future();
        var onComplete = future.resolver();
        
        var doc = {};
        
        var yelp_response = yelp.search({term: search, location: loc, limit: '1'}).then(function (data) {
            
        if (data["businesses"].length === 0) {
            doc = {}
        } else {
            doc = {
                name: data["businesses"][0]["name"],
                url: data["businesses"][0]["url"],
                image: data["businesses"][0]["image_url"],
                rating_image: data["businesses"][0]["rating_img_url"],
                review_count: data["businesses"][0]["review_count"]
            }
        }
        
        onComplete();
        
        }).catch(console.log.bind(console));
        
        Future.wait(future);

        return doc;
    }
});