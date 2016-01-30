Template.forgotPassword.helpers({
	resetPassword : function() {
		if (Accounts._resetPasswordToken) {
			Session.set('resetPassword', Accounts._resetPasswordToken);
		} 
		return Session.get('resetPassword');
	}
});

Template.forgotPassword.events({

	'submit #recovery-form' : function(e) {
		e.preventDefault()
		var email = $(e.target).find('[name=recovery-email]').val();

		Session.set('loading', true);
		Accounts.forgotPassword({email: email}, function(err){
			if (err){
				Session.set('displayMessage', 'Password Reset Error')
			} else {
				Session.set('displayMessage', 'Email Sent. Please check your email.')
			}
			Session.set('loading', false);
		});
	},

	'submit #new-password' : function(e) {
		e.preventDefault();
		var password = $(e.target).find('[name=new-password-password]').val();
		Session.set('loading', true);
		Accounts.resetPassword(Session.get('resetPassword'), password, function(err){
			if (err)
				Session.set('displayMessage', 'Password Reset Error. Sorry');
			else {
				Session.set('resetPassword', null);
			}
			Session.set('loading', false);
		});
	}
});