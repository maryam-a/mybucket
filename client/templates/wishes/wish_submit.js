Template.wishSubmit.events({
    'submit form': function(e) {
        e.preventDefault();
        
        var loc = "";
        
        // Location from Profile 
        var profile = Profiles.find({userId: Meteor.userId()});
        var city = profile.fetch()[0].city;
        var state = profile.fetch()[0].state;
        var country = profile.fetch()[0].country;
        var defaultLocation = "" + city + ", " + state + ", " + country + "";
        
        // Possible errors from HTML Geolocation
        var permissionDenied = "User denied the request for Geolocation.";
        var posUnavailable = "Location information is unavailable.";
        var timeout = "The request to get user location timed out.";
        var unknown = "An unknown error occurred.";
        var noSupport = "Geolocation is not supported by this browser.";
        
        
        var search = $(e.target).find('[name=title]').val();    
        
        var opp_name = "";
        var opp_url = "";
        var opp_img = "";                           
        var opp_rating_img = "";
        var opp_review_count = 0;
        
        // Response from geolocation script
        var response = document.getElementById("geocode").innerHTML;
        
        // User does not give permission or errors
        if (response === (permissionDenied || posUnavailable || timeout || unknown || noSupport)) {
            loc = defaultLocation;
            Meteor.call('yelp_opportunity', search , loc, function(error, result) {
                if (error) {
                    return alert(error.reason);
                } else {
                    if (Object.keys(result).length != 0) {
                        opp_name = result.name,
                        opp_url = result.url,
                        opp_img = result.image,
                        opp_rating_img = result.rating_image,
                        opp_review_count = result.review_count
                    }
                }        
                
                var wish = {
                    title: $(e.target).find('[name=title]').val(),
                    category: $('input[name="category"]:checked').val(),
                    completed: "No :(",
                    opportunity: {
                        name: opp_name,
                        url: opp_url,
                        img_url: opp_img,
                        review_img: opp_rating_img,
                        total_reviews: opp_review_count
                    }, 
                    blog: "" 
                };    
                
                Meteor.call('wishInsert', wish, function(err, res){
                    // Display the error to the user and abort
                    if (err) {
                        return alert(err.reason);
                    }
                    // Show this result but route anyway
                    if (res.wishExists) {
                        alert('This wish has already been posted');
                    }
                    Router.go('wishPage');
                });  
            }); 
        } else {
            // Reverse Geocoding
            var latlngStr = response.split(',', 2);
            var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};

            reverseGeocode.getSecureLocation(latlng.lat, latlng.lng, function(location){
                if (reverseGeocode.data.results.length === 0) {
                    loc = defaultLocation;
                } else {    
                    loc = reverseGeocode.getAddrStr();
                }
                
                Meteor.call('yelp_opportunity', search , loc, function(error, result) {
                    if (error) {
                        return alert(error.reason);
                    } else {
                        if (Object.keys(result).length != 0) {
                            opp_name = result.name,
                            opp_url = result.url,
                            opp_img = result.image,
                            opp_rating_img = result.rating_image,
                            opp_review_count = result.review_count
                        }
                    }        
                    
                    var wish = {
                        title: $(e.target).find('[name=title]').val(),
                        category: $('input[name="category"]:checked').val(),
                        completed: "No :(",
                        opportunity: {
                            name: opp_name,
                            url: opp_url,
                            img_url: opp_img,
                            review_img: opp_rating_img,
                            total_reviews: opp_review_count
                        },
                        blog: "" 
                    };    
                    
                    Meteor.call('wishInsert', wish, function(err, res){
                        // Display the error to the user and abort
                        if (err) {
                            return alert(err.reason);
                        }
                        // Show this result but route anyway
                        if (res.wishExists) {
                            alert('This wish has already been posted');
                        }
                        Router.go('wishPage');
                    });  
                }); 
            });              
        }                    
    }
});