Template.wishItem.helpers({
    ownWish: function() {
        return this.userId === Meteor.userId();
    },
    
    blogPresent: function() {
        return Wishes.findOne({_id: this._id}).blog != "";
    },    
    
    opportunityPresent: function()  {
        return Wishes.findOne({_id: this._id}).opportunity.name != "";
    }
});

Template.wishItem.events({
   'click .delete': function(e) {
        e.preventDefault();
        
        if (confirm("Delete this wish?")) {
            var currentWishId = this._id;
            Wishes.remove(currentWishId);
            Router.go('wishPage');
        }
    }
});