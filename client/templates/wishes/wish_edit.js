Template.wishEdit.events({
    'submit form': function(e) {
        e.preventDefault();
        
        var currentWishId = this._id;
        
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
        
        // Do not update opportunity if already completed (provided that title remains the same)
        if (($('input[name="completed"]:checked').val() === ("Yes :D" || true)) 
                && (search === this.title)) {
            var wishProperties = {
                title: $(e.target).find('[name=title]').val(),
                category: $('input[name="category"]:checked').val(),
                completed: $('input[name="completed"]:checked').val(),
                opportunity: {
                    name: this.opportunity.name,
                    url: this.opportunity.url,
                    img_url: this.opportunity.img_url,
                    review_img: this.opportunity.review_img,
                    total_reviews: this.opportunity.review_count
                },
                blog: $('textarea#blog').val()
            };
        
            Wishes.update(currentWishId, {$set: wishProperties}, function(err) {
                if (err) {
                    // Display the error to the user
                    alert(err.reason);
                } else {
                    Router.go('wishPage');
                }
            });
        } else {
            // Title is different or wish is incomplete
            
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
                    
                    var wishProperties = {
                        title: $(e.target).find('[name=title]').val(),
                        category: $('input[name="category"]:checked').val(),
                        completed: $('input[name="completed"]:checked').val(),
                        opportunity: {
                            name: opp_name,
                            url: opp_url,
                            img_url: opp_img,
                            review_img: opp_rating_img,
                            total_reviews: opp_review_count
                        },
                        blog: $('textarea#blog').val()
                    };
                
                    Wishes.update(currentWishId, {$set: wishProperties}, function(err) {
                        if (err) {
                            // Display the error to the user
                            alert(err.reason);
                        } else {
                            Router.go('wishPage');
                        }
                    });
                });
            } else {
                // Reverse Geocoding
                var latlngStr = response.split(',', 2);
                var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
                
                reverseGeocode.getSecureLocation(latlng.lat, latlng.lng, function(location){
                    // Cannot reverse geocode
                    if (reverseGeocode.data.results.length === 0) {
                        loc = defaultLocation;
                    } // Use package to reverse geocode coordinates
                     else {    
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
                        
                        var wishProperties = {
                            title: $(e.target).find('[name=title]').val(),
                            category: $('input[name="category"]:checked').val(),
                            completed: $('input[name="completed"]:checked').val(),
                            opportunity: {
                                name: opp_name,
                                url: opp_url,
                                img_url: opp_img,
                                review_img: opp_rating_img,
                                total_reviews: opp_review_count
                            },
                            blog: $('textarea#blog').val()
                        };
                    
                        Wishes.update(currentWishId, {$set: wishProperties}, function(err) {
                            if (err) {
                                // Display the error to the user
                                alert(err.reason);
                            } else {
                                Router.go('wishPage');
                            }
                        });
                    });        
                });                
            }
        }       
    },
    
    'click .delete': function(e) {
        e.preventDefault();
        
        if (confirm("Delete this wish?")) {
            var currentWishId = this._id;
            Wishes.remove(currentWishId);
            Router.go('wishPage');
        }
    }
});