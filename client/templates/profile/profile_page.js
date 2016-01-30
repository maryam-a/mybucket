Template.profilePage.helpers({
    
    profileExists: function() {
        return Profiles.find({userId: Meteor.userId()}).count() != 0;
    },
     ownProfile: function() {
        return this.userId === Meteor.userId();
    },
    profiles: function() {
        return Profiles.find({});
    },
    username: function() {
        var profile = Profiles.findOne({author: Meteor.user().username});
        
        if (profile) {
            return Profiles.findOne({author: Meteor.user().username}).first_name;
        } else {
             return Meteor.user().username;
        }
    }
});