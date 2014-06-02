var app = angular.module("app", ["ngRoute", "ngResource", "ngProgress", 'angular-loading-bar', "filters", "ui.bootstrap"]);

app.run(function(auth, cfpLoadingBar, $http, $rootScope, googleUserResource, ngProgress){
	// ngProgress.color("#5bc0de");
	cfpLoadingBar.start();
	$http.defaults.headers.common.Authorization = 'Bearer ' + auth.getToken();
	$rootScope.user = googleUserResource.get({user_id: "me"});
});