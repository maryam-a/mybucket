Template.loggedInHeader.helpers({
    username: function() {
        var profile = Profiles.findOne({author: Meteor.user().username});
        
        if (profile) {
            return Profiles.findOne({author: Meteor.user().username}).first_name;
        } else {
             return Meteor.user().username;
        }
    }
});

Template.loggedInHeader.events({
    'click .logout': function(e){
        e.preventDefault();
        Meteor.logout();
        Router.go('home');
    }
});