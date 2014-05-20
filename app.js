var app = angular.module("app", ["ngRoute", "ngResource", "filters"]);

app.run(function(auth, $http, $rootScope, googleUserResource){
	$http.defaults.headers.common.Authorization = 'Bearer ' + auth.getToken();
	$rootScope.user = googleUserResource.get({user_id: "me"});
});