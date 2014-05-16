var app = angular.module("app", ["ngRoute"]);

app.config(function($routeProvider){
	$routeProvider.when("/", {
		templateUrl: "index.html",
		controller: "AuthCtrl"
	})
	.when("/oauth2callback",{
		controller: "TokenCtrl",
		redirectTo: "/"
	})
	// .when("/state=", {
	// 	templateUrl: "index.html",
	// 	controller: "ContactsCtrl",
	// 	redirectTo: "/#"
	// })
});

app.factory("authFactory", function($window, $location){
	return {
		redirectToOauth: function (){
			$window.location.href = "https://accounts.google.com/o/oauth2/auth?"
			+ "scope=email%20profile&"
			+ "state=%2Fprofile&"
			+ "redirect_uri=http%3A%2F%2Flocalhost%3A4567%2Foauth2callback&"
			+ "response_type=token&"
			+ "client_id=1003842577916-fpin2mov4dtuhthts5qa2rp8vicobp10.apps.googleusercontent.com";
		},
		getToken: function (){
			var currentURL = $location.absUrl();
			var paramPartOfURL = currentURL.slice(currentURL.indexOf('#') + 1);
			alert(paramPartOfURL);
			var hashes = [], res;
			var hash = paramPartOfURL.split("&");
				for (var i = 0; i < hash.length; i++) {
					hashes = hash[i].split("=");
					if (hashes[0] == 'access_token') {
						res = hashes[1];
					};
				};
			alert(res);
			return res;
		}
	}
});
app.controller("TokenCtrl", function(authFactory){
	app.value("token", {token: authFactory.getToken()})
});
app.controller("ContactsCtrl", function($scope){
	$scope.content = 'This is your content';
});
app.controller('AuthCtrl', function (authFactory, token){
	if (!token) {
		authFactory.redirectToOauth();
		token = authFactory.getToken();
	}
	alert(token);
});



// app.controller('AuthCtrl', function ($scope, $http){
//         $http({method: 'POST', url: url})
//         .success(function(data, status, headers, config) {
//             console.log(data);
//         })
//         .error(function(data, status, headers, config) {
//         });
// });