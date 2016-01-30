// Returns a cursor referencing all of the wishes in the database
Meteor.publish('wishes', function() {
    return Wishes.find();
});

// Returns a cursor referencing all of the suggestions in the database
Meteor.publish('explore', function() {
    return Explore.find();
});

// Returns a cursor referencing all of the profiles in the database
Meteor.publish('profiles', function() {
    return Profiles.find();
});
