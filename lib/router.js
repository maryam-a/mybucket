// Default settings
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() { 
        return [Meteor.subscribe('wishes'),
         Meteor.subscribe('profiles'), 
         Meteor.subscribe('explore')]; }
});

// Users must login in order to submit wishes; else the home page will be shown
Router.map(function() {
    this.route('home', {path: '/'});
    this.route('wishPage');
});

// If not logged in, route to home page
var requireLogin = function() {
    if (! (Meteor.user() || Meteor.loggingIn())) {
            Router.go('home');
    } else {
        this.next();
    }
};

// If logged in, route to wishPage
var goToDashboard = function() {
    if (Meteor.user()) {
        Router.go('wishPage');
    } else {
        this.next();
    }
};

// Routes for custom login system
Router.route('/login', {name: 'login'});
Router.route('/register', {name: 'register'});
Router.route("/forgot_password", {name: 'forgotPassword'});

// Routes to page with completed wishes: Allows user to filter the completed wishes
Router.route('wishPage/complete', {name: 'completedWishes'});

// Routes to page with incomplete wishes: Allows user to filter incomplete wishes
Router.route('wishPage/incomplete', {name: 'incompleteWishes'});

// Routes to page with profiles: Allows user to see his/her profile information
Router.route('/profiles', { name: 'profilePage' });

// Routes to Explore page: Allows user to see suggestions
Router.route('/explore', {name: 'explore'});

// Routes to Help page
Router.route('/help', {name: 'help'});

// Routes to under construction page
Router.route('/under_construction', {name: 'underConstruction'});

// Routes to wish edit page: Allows user to edit wishes
Router.route('/wishes/:_id/edit', {
    name: 'wishEdit',
    data: function() { return Wishes.findOne(this.params._id); }
});

// Routes to profile edit page: Allows user to edit profile
Router.route('/profiles/:_id/edit', {
    name: 'profileEdit',
    data: function() { return Profiles.findOne(this.params._id); }
});

// Routes to wish submit page: Allows user to submit a wish
Router.route('/submit', {name: 'wishSubmit'});

// Routes to profile submit page: Allows user to submit a profile
Router.route('/submit_profile', {name: 'profileSubmit'});


// Cannot find wish
Router.onBeforeAction('dataNotFound', {only: ['wishPage']});
// Login required to access wishes, profile, suggestions
Router.onBeforeAction(requireLogin, {except: ['home', 'login', 'register', 'forgotPassword']});
// If signed in, show wishPage
Router.onBeforeAction(goToDashboard, {only: ['home']});