Template.wishPage.helpers({
    ownWish: function() {
        return this.userId === Meteor.userId();
    },
     
    wishes: function() {
        // Sorts according to date (descending order)
        return Wishes.find({}, {sort: {submitted: -1}});
    },
    
    username: function() {
        var profile = Profiles.findOne({author: Meteor.user().username});
        
        if (profile) {
            return Profiles.findOne({author: Meteor.user().username}).first_name;
        } else {
             return Meteor.user().username;
        }
    }, 
    
    noWishes : function() {
        return Wishes.find({userId: Meteor.user()._id}).count() === 0;
    },
    
    newUser : function() {
        return Wishes.find({userId: Meteor.user()._id}).count() === 0 &&
                    Profiles.find({userId: Meteor.user()._id}).count() === 0
    }, 
    
    completed : function() {
        return Wishes.find({userId: Meteor.user()._id, completed: "Yes :D"}).fetch();
    },
    
    incomplete: function() {
        return Wishes.find({userId: Meteor.user()._id, completed: "No :("}).fetch();
    }
    
});

    	