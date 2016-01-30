Template.register.onRendered(function(){
    var validator = $('.register').validate({
        submitHandler: function(e) {
            var username = $('[name=username]').val();
            var email = $('[name=email]').val();
            var password = $('[name=password]').val();
            var y = document.getElementById("tryAgain");

            
            Accounts.createUser({
                username: username,
                email: email,
                password: password
            }, function(err) {
                if (err) {
                    console.log(err.reason);
                     y.innerHTML = err.reason;
                } else {
                    Router.go('wishPage'); 
                }
            });
        },
        
        rules: {
            username: {
                required: true
            },
            email: {
                required: true,
                email:true
            },
            password: {
                required: true,
                minlength: 6
            }
        },
        
        messages: {
            username: {
                required: "You must enter a username."
            },
            email: {
                required: "You must enter an email address.",
                email: "You've entered an invalid email address"
            },
            password: {
                required: "You must enter a password",
                minlength: "Your password must be at least {0}"
            }
        }
    });
});