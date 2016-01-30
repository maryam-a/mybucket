Template.login.onRendered(function(){
     var validator = $('.login').validate({
        submitHandler: function(e) {
            // User's email or username
            var loginInfo = $('[name=loginInfo]').val();
            var password = $('[name=password]').val();
            var x = document.getElementById("tryAgain");
            
            // Alerts user of incorrect login details
            Meteor.loginWithPassword(loginInfo, password, function(err) {
                if (err) {
                    console.log(err.reason);
                    x.innerHTML = err.reason;
                } else {
                    Router.go('wishPage');
                }           
            });  
        },
        // Validation
        rules: {
            userInfo: {
                required: true
            },
            password: {
                required: true,
                minlength: 6
            }
        },
        
        messages: {
            loginInfo: {
                required: "You must enter a username or an email address."
            },
            password: {
                required: "You must enter a password",
                minlength: "Your password must be at least {0}"
            }
        }
    });
});