/**
 * Calls the Yelp API and adds the suggestion to the wish database
 * @param wishTitle String the user's wish
 * @param categoryName String the category of the user's wish
 * @return Routes to the wishPage after add the wish to the database
 */
var yelp_function = function(wishTitle, categoryName) {
    
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
    
    var opp_name = "";
    var opp_url = "";
    var opp_img = "";                           
    var opp_rating_img = "";
    var opp_review_count = 0;
    
    // Getting the result from yelp
    // Response from geolocation script
    var response = document.getElementById("geocode").innerHTML;
    
    // User does not give permission or errors
    if (response === (permissionDenied || posUnavailable || timeout || unknown || noSupport)) {
        loc = defaultLocation;
        Meteor.call('yelp_opportunity', wishTitle, loc, function(error, result) {
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
                title: wishTitle,
                category: categoryName,
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
    }else {
        // Reverse Geocoding
        var latlngStr = response.split(',', 2);
        var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};

        reverseGeocode.getSecureLocation(latlng.lat, latlng.lng, function(location){
            if (reverseGeocode.data.results.length === 0) {
                loc = defaultLocation;
            } else {    
                loc = reverseGeocode.getAddrStr();
            }
            Meteor.call('yelp_opportunity', wishTitle, loc, function(error, result) {
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
                    title: wishTitle,
                    category: categoryName,
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


Template.explore.helpers({
    categories: function() {
        return Explore.find({});
    }
});


Template.explore.events({
    'click .category-button' : function () {
    	$('.items').fadeOut();
    },
    'click #btn-Nature' : function () {
    	$('#div-Nature').fadeIn("slow");
    },
    'click #btn-DIY' : function () {
    	$('#div-DIY').fadeIn("slow");
    },
    'click #btn-Milestones' : function () {
    	$('#div-Milestones').fadeIn("slow");
    },
    'click #btn-Events' : function () {
    	$('#div-Events').fadeIn("slow");
    },
    'click #btn-Travel' : function () {
    	$('#div-Travel').fadeIn("slow");
    },
    'click #btn-Sports' : function () {
    	$('#div-Sports').fadeIn("slow");
    },
    'click #btn-Arts' : function () {
    	$('#div-Arts').fadeIn("slow");
    },
    'click #btn-Skills' : function () {
    	$('#div-Skills').fadeIn("slow");
    },
    'click #btn-Volunteering' : function () {
    	$('#div-Volunteering').fadeIn("slow");
    },
    'click #btn-Leisure' : function () {
    	$('#div-Leisure').fadeIn("slow");
    },
    'click #btn-Food' : function () {
    	$('#div-Food').fadeIn("slow");
    },
    'click #explore-1' : function(e) {
         e.preventDefault();
         yelp_function("Get a tattoo", "Events");       
    },
    'click #explore-2' : function(e) {
         e.preventDefault();
         yelp_function("Go horseback riding", "Events");       
    },
    'click #explore-3' : function(e) {
         e.preventDefault();
         yelp_function("Go cliff diving", "Events");       
    },
    'click #explore-4' : function(e) {
         e.preventDefault();
         yelp_function("Fly in a hot air balloon", "Events");       
    },
    'click #explore-5' : function(e) {
         e.preventDefault();
         yelp_function("Get wine testing", "Events");       
    },
    'click #explore-6' : function(e) {
         e.preventDefault();
         yelp_function("Sing 'Thrift Shop' in a thrift shop", "Events");       
    },
    'click #explore-7' : function(e) {
         e.preventDefault();
         yelp_function("Try surfing", "Events");       
    },
    'click #explore-8' : function(e) {
         e.preventDefault();
         yelp_function("Go indoor rock climbing", "Events");       
    },
    'click #explore-9' : function(e) {
         e.preventDefault();
         yelp_function("Scream in a haunted house", "Events");       
    },
    'click #explore-10' : function(e) {
         e.preventDefault();
         yelp_function("Play Carnival in Trinidad and Tobago", "Travel");       
    },
    'click #explore-11' : function(e) {
         e.preventDefault();
         yelp_function("Travel to Paris", "Travel");       
    },
    'click #explore-12' : function(e) {
         e.preventDefault();
         yelp_function("Visit Yellowstone National Park", "Travel");       
    },
    'click #explore-13' : function(e) {
         e.preventDefault();
         yelp_function("Run through tulip fields in the Netherlands", "Travel");       
    },
    'click #explore-14' : function(e) {
         e.preventDefault();
         yelp_function("Sing 'Let It Go' in the Ice Caves in Alaska", "Travel");       
    },
    'click #explore-15' : function(e) {
         e.preventDefault();
         yelp_function("See the Sea of Stars on Vaadhoo Island", "Travel");       
    },
    'click #explore-16' : function(e) {
         e.preventDefault();
         yelp_function("Float in the Dead Sea", "Travel");       
    },
    'click #explore-17' : function(e) {
         e.preventDefault();
         yelp_function("Snorkel in the Great Blue Hole, Belize", "Travel");       
    },
    'click #explore-18' : function(e) {
         e.preventDefault();
         yelp_function("Visit all the sites where LOTR was filmed", "Travel");       
    },
    'click #explore-19' : function(e) {
         e.preventDefault();
         yelp_function("See the Red Sox in Fenway Park", "Sports");       
    },
    'click #explore-20' : function(e) {
         e.preventDefault();
         yelp_function("Catch a baseball during a baseball game", "Sports");       
    },
    'click #explore-21' : function(e) {
         e.preventDefault();
         yelp_function("Go to the Super Bowl", "Sports");       
    },
    'click #explore-22' : function(e) {
         e.preventDefault();
         yelp_function("Attend an Olympics", "Sports");       
    },
    'click #explore-23' : function(e) {
         e.preventDefault();
         yelp_function("See a FC Barcelona vs Manchester United soccer match", "Sports");       
    },
    'click #explore-24' : function(e) {
         e.preventDefault();
         yelp_function("Cheer on the cyclists in Tour de France", "Sports");       
    },
    'click #explore-25' : function(e) {
         e.preventDefault();
         yelp_function("Complete an Iron Man marathon", "Sports");       
    },
    'click #explore-26' : function(e) {
         e.preventDefault();
         yelp_function("Watch the NBA Finals live", "Sports");       
    },
    'click #explore-27' : function(e) {
         e.preventDefault();
         yelp_function("Watch Wimbledon live", "Sports");       
    },
    'click #explore-28' : function(e) {
         e.preventDefault();
         yelp_function("Attend a ballet performance", "Arts");       
    },
    'click #explore-29' : function(e) {
         e.preventDefault();
         yelp_function("Direct a play", "Arts");       
    },
    'click #explore-30' : function(e) {
         e.preventDefault();
         yelp_function("Watch a silent movie", "Arts");       
    },
    'click #explore-31' : function(e) {
         e.preventDefault();
         yelp_function("Draw someone's portrait", "Arts");       
    },
    'click #explore-32' : function(e) {
         e.preventDefault();
         yelp_function("See the London Symphony Orchestra", "Arts");       
    },
    'click #explore-33' : function(e) {
         e.preventDefault();
         yelp_function("Throw some clay onto a wheel", "Arts");       
    },
    'click #explore-34' : function(e) {
         e.preventDefault();
         yelp_function("Sing in front of a crowd", "Arts");       
    },
    'click #explore-35' : function(e) {
         e.preventDefault();
         yelp_function("Make your own jewelry", "Arts");       
    },
    'click #explore-36' : function(e) {
         e.preventDefault();
         yelp_function("Create your own logo", "Arts");       
    },
    'click #explore-37' : function(e) {
         e.preventDefault();
         yelp_function("Learn to make own website", "Skills");       
    },
    'click #explore-38' : function(e) {
         e.preventDefault();
         yelp_function("Learn the foxtrot", "Skills");       
    },
    'click #explore-39' : function(e) {
         e.preventDefault();
         yelp_function("Learn a new language", "Skills");       
    },
    'click #explore-40' : function(e) {
         e.preventDefault();
         yelp_function("Earn a black belt in martial arts", "Skills");       
    },
    'click #explore-41' : function(e) {
         e.preventDefault();
         yelp_function("Learn to drive", "Skills");       
    },
    'click #explore-42' : function(e) {
         e.preventDefault();
         yelp_function("Learn to play the ukelele", "Skills");       
    },
    'click #explore-43' : function(e) {
         e.preventDefault();
         yelp_function("Master two programming language", "Skills");       
    },
    'click #explore-44' : function(e) {
         e.preventDefault();
         yelp_function("Learn to ski", "Skills");       
    },
    'click #explore-45' : function(e) {
         e.preventDefault();
         yelp_function("Take a genetic course", "Skills");       
    },
    'click #explore-46' : function(e) {
         e.preventDefault();
         yelp_function("Volunteer at a hospice", "Volunteering");       
    },
    'click #explore-47' : function(e) {
         e.preventDefault();
         yelp_function("Help out at a soup kitchen", "Volunteering");       
    },
    'click #explore-48' : function(e) {
         e.preventDefault();
         yelp_function("Volunteer at the Boston Marathon", "Volunteering");       
    },
    'click #explore-49' : function(e) {
         e.preventDefault();
         yelp_function("Take care of animals in a shelter", "Volunteering");       
    },
    'click #explore-50' : function(e) {
         e.preventDefault();
         yelp_function("Organize a beach clean up", "Volunteering");       
    },
    'click #explore-51' : function(e) {
         e.preventDefault();
         yelp_function("Donate blood", "Volunteering");       
    },
    'click #explore-52' : function(e) {
         e.preventDefault();
         yelp_function("Tutor a high school student", "Volunteering");       
    },
    'click #explore-53' : function(e) {
         e.preventDefault();
         yelp_function("VVolunteer with the Red Cross", "Volunteering");       
    },
    'click #explore-54' : function(e) {
         e.preventDefault();
         yelp_function("Donate clothes to the Salvation Army", "Volunteering");       
    },
    'click #explore-55' : function(e) {
         e.preventDefault();
         yelp_function("Go to a concert", "Leisure");       
    },
    'click #explore-56' : function(e) {
         e.preventDefault();
         yelp_function("Read all of Jane Austen's books", "Leisure");       
    },
    'click #explore-57' : function(e) {
         e.preventDefault();
         yelp_function("Watch all of the Disney", "Leisure");       
    },
    'click #explore-58' : function(e) {
         e.preventDefault();
         yelp_function("Get a signed copy of your favourite", "Leisure");       
    },
    'click #explore-59' : function(e) {
         e.preventDefault();
         yelp_function("Get backstage passes to a concert", "Leisure");       
    },
    'click #explore-60' : function(e) {
         e.preventDefault();
         yelp_function("Attend a movie premiere", "Leisure");       
    },
    'click #explore-61' : function(e) {
         e.preventDefault();
         yelp_function("Watch all the Star Wars movies", "Leisure");       
    },    
    'click #explore-62' : function(e) {
         e.preventDefault();
         yelp_function("Attend a free concert", "Leisure");       
    },
    'click #explore-63' : function(e) {
         e.preventDefault();
         yelp_function("Visit the Boston Public Library", "Leisure");       
    },
    'click #explore-64' : function(e) {
         e.preventDefault();
         yelp_function("Try chicken and waffles", "Food");       
    },
    'click #explore-65' : function(e) {
         e.preventDefault();
         yelp_function("Make your own pizza", "Food");       
    },
    'click #explore-66' : function(e) {
         e.preventDefault();
         yelp_function("Try Mongolian food", "Food");       
    },
    'click #explore-67' : function(e) {
         e.preventDefault();
         yelp_function("Eat McDonalds in at least countries", "Food");       
    },
    'click #explore-68' : function(e) {
         e.preventDefault();
         yelp_function("Brew your own beer", "Food");       
    },
    'click #explore-69' : function(e) {
         e.preventDefault();
         yelp_function("Master the soufle", "Food");       
    },
    'click #explore-70' : function(e) {
         e.preventDefault();
         yelp_function("Eat a moon cake", "Food");       
    },
    'click #explore-71' : function(e) {
         e.preventDefault();
         yelp_function("Try In-N-Out", "Food");       
    },
    'click #explore-72' : function(e) {
         e.preventDefault();
         yelp_function("Dip your fries into your milkshake", "Food");       
    },
    'click #explore-73' : function(e) {
         e.preventDefault();
         yelp_function("Trek the Appalachian", "Nature");       
    },
     'click #explore-74' : function(e) {
         e.preventDefault();
         yelp_function("Watch the sunrise from a mountain", "Nature");       
    },
     'click #explore-75' : function(e) {
         e.preventDefault();
         yelp_function("Go camping", "Nature");       
    },
     'click #explore-76' : function(e) {
         e.preventDefault();
         yelp_function("Go white water rafting", "Nature");       
    },
     'click #explore-77' : function(e) {
         e.preventDefault();
         yelp_function("Zip line through a forest", "Nature");       
    },
     'click #explore-78' : function(e) {
         e.preventDefault();
         yelp_function("Catch a fish in a lake", "Nature");       
    },
     'click #explore-79' : function(e) {
         e.preventDefault();
         yelp_function("Soak in a hot springs", "Nature");       
    },
     'click #explore-80' : function(e) {
         e.preventDefault();
         yelp_function("Take a wild food foraging tour", "Nature");       
    },
     'click #explore-81' : function(e) {
         e.preventDefault();
         yelp_function("Go apple picking", "Nature");       
    },
     'click #explore-82' : function(e) {
         e.preventDefault();
         yelp_function("Start your own   herb garden", "DIY");       
    },
    'click #explore-83' : function(e) {
         e.preventDefault();
         yelp_function("Make your own jewelry", "DIY");       
    },
    'click #explore-84' : function(e) {
         e.preventDefault();
         yelp_function("Landscape your backyard", "DIY");       
    },
    'click #explore-85' : function(e) {
         e.preventDefault();
         yelp_function("Use your old tshirts to make a quilt", "DIY");       
    },
    'click #explore-86' : function(e) {
         e.preventDefault();
         yelp_function("Crochet yourself a hat and scarf", "DIY");       
    },
    'click #explore-87' : function(e) {
         e.preventDefault();
         yelp_function("Build cool things with Arduino", "DIY");       
    },
    'click #explore-88' : function(e) {
         e.preventDefault();
         yelp_function("Make your own door sign", "DIY");       
    },
    'click #explore-89' : function(e) {
         e.preventDefault();
         yelp_function("Make your own flashlight", "DIY");       
    },
    'click #explore-90' : function(e) {
         e.preventDefault();
         yelp_function("Build a binary clock", "DIY");       
    },
    'click #explore-91' : function(e) {
         e.preventDefault();
         yelp_function("Earn a college degree", "Milestones");       
    },
    'click #explore-92' : function(e) {
         e.preventDefault();
         yelp_function("Get married", "Milestones");       
    },
    'click #explore-93' : function(e) {
         e.preventDefault();
         yelp_function("Buy your own car", "Milestones");       
    },
    'click #explore-94' : function(e) {
         e.preventDefault();
         yelp_function("Buy your first home", "Milestones");       
    },
    'click #explore-95' : function(e) {
         e.preventDefault();
         yelp_function("Get your first full time job", "Milestones");       
    },
    'click #explore-96' : function(e) {
         e.preventDefault();
         yelp_function("Earn your master's degree", "Milestones");       
    },
    'click #explore-97' : function(e) {
         e.preventDefault();
         yelp_function("Get a pet", "Milestones");       
    },
    'click #explore-98' : function(e) {
         e.preventDefault();
         yelp_function("Fall in love", "Milestones");       
    },
    'click #explore-99' : function(e) {
         e.preventDefault();
         yelp_function("Discover your true passion", "Milestones");       
    }   
  });