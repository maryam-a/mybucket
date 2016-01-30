Template.profileSubmit.events({
    'submit form': function(e) {
        e.preventDefault();
        
        var profile = {
            first_name: $(e.target).find('[name=first_name]').val(),
            last_name: $(e.target).find('[name=last_name]').val(),
            city: $(e.target).find('[name=city]').val(),
            state: $(e.target).find('[name=state]').val(),
            country: $(e.target).find('[name=country]').val()
        };
        
        Meteor.call('profileInsert', profile, function(err, res){
            // Display the error to the user and abort
            if (err) {
                return alert(err.reason);
            }
            // Show this result but route anyway
            if (res.profileExists) {
                alert('This profile has already been posted');
            }
            Router.go('profilePage');
        });        
    }
});