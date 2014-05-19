var app = angular.module("app", ["ngRoute", "ngResource"]);

app.run(function(auth, $http){
	$http.defaults.headers.common.Authorization = 'Bearer ' + auth.getToken();
	
});