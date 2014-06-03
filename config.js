app.config(function($routeProvider, $resourceProvider, authProvider, $httpProvider){
	$routeProvider
	.when("/", {
		templateUrl: "index.html",
		redirectTo: "/contacts"
	})
	.when("/contacts", {
		templateUrl: "views/contacts/contacts.html",
		controller: "ContactsCtrl",
		reloadOnSearch: false
	})
	.when("/contacts/:user_id", {
		templateUrl: "views/contacts/detailed.html",
		controller: "detailedContactCtrl"
	})
	.when("/loggedout", {
		template: "<h2>You are not loged anymore</h2><a href='#/contacts/page/1' class='btn btn-info'>Log In</a>",
		controller: "logCtrl"
	})
	.otherwise({
		redirectTo: "/contacts"
	})

	authProvider.config({
		scope: ["email", "profile","https://www.google.com/m8/feeds"],
		redirect_uri: "http://localhost:4567/",
		client_id: "1003842577916-fpin2mov4dtuhthts5qa2rp8vicobp10.apps.googleusercontent.com"
	});
	$httpProvider.defaults.headers.common['GData-Version'] = '3.0';
});
app.value("numberOfNotesOnThePage", '30');