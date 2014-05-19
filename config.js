app.config(function($routeProvider, $resourceProvider, authProvider){
	$routeProvider
	.when("/", {
		redirectTo: "/contacts"
	})
	.when("/contacts", {
		templateUrl: "index.html"

	})
	.otherwise({
		redirectTo: "/contacts/all",
		templateUrl: "index.html",
		controller: "ContactsCtrl"
	})

	authProvider.config({
		scope: ["email", "profile"],
		redirect_uri: "http://localhost:4567/",
		client_id: "1003842577916-fpin2mov4dtuhthts5qa2rp8vicobp10.apps.googleusercontent.com"
	});
	
});