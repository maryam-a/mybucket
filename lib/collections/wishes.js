Wishes = new Mongo.Collection('wishes');

// Added basic permission to check the wish's owner
Wishes.allow({
    update: function(userId, wish) {
        return ownsDocument(userId, wish);
    },
    remove: function(userId, wish) {
        return ownsDocument(userId, wish);
    }
});

/**
 * Adds the user's wish to the database
 * @param wishAttribute Object user's wish
 * @return Object the wish has its own id and is added to the database
 */
Meteor.methods({
    wishInsert:function(wishAttributes) {
        check(Meteor.userId(), String);
        check(wishAttributes, {
            title: String,
            category: String, 
            completed: String,
            opportunity: {
                name: String,
                url: String,
                img_url: String,
                review_img: String,
                total_reviews: Number
            }, blog: String          
        });
        
        var wishWithSameTitle = Wishes.findOne({title: wishAttributes.title});
        if (wishWithSameTitle) {
            return {
                wishExists: true,
                _id: wishWithSameTitle._id
            }
        }
        
        var user = Meteor.user();
        var wish = _.extend(wishAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
        });
        
        var wishId = Wishes.insert(wish);
        
        return {
            _id: wishId
        };
    }
});
