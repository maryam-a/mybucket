Template.profileItem.helpers({
    ownProfile: function() {
        return this.userId === Meteor.userId();
    }
});