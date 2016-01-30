Profiles = new Mongo.Collection('profiles');

// Added basic permission to check the profile's owner
Profiles.allow({
    update: function(userId, profile) {
        return ownsDocument(userId, profile);
    }
});

/**
 * Adds the user's profile to the database
 * @param profileAttributes Object elements of user's profile
 * @return Object the profile has its own id and is added to the database
 */
Meteor.methods({
    profileInsert:function(profileAttributes) {
        check(Meteor.userId(), String);
        check(profileAttributes, {
            first_name: String,
            last_name: String, 
            city: String,
            state: String,
            country: String
        });
        
        var profileWithSameTitle = Profiles.findOne({userId: Meteor.userId()});
        if (profileWithSameTitle) {
            return {
                profileExists: true,
                _id: profileWithSameTitle._id
            }
        }
        
        var user = Meteor.user();
        var profile = _.extend(profileAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
        });
        
        var profileId = Profiles.insert(profile);
        
        return {
            _id: profileId
        };
    }
});
