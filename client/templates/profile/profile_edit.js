Template.profileEdit.events({
    'submit form': function(e) {
        e.preventDefault();
        
        var currentProfileId = this._id;
        
        var profileProperties = {
             first_name: $(e.target).find('[name=first_name]').val(),
            last_name: $(e.target).find('[name=last_name]').val(),
            city: $(e.target).find('[name=city]').val(),
            state: $(e.target).find('[name=state]').val(),
            country: $(e.target).find('[name=country]').val()
        }
        
        Profiles.update(currentProfileId, {$set: profileProperties}, function(err) {
            if (err) {
                // Display the error to the user
                alert(err.reason);
            } else {
                Router.go('profilePage');
            }
        });
    }
});