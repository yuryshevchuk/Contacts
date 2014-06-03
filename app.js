var app = angular.module("app", ["ngRoute", "ngResource", "ngProgress", 'angular-loading-bar', "xeditable", "filters", "ui.bootstrap"]);

app.run(function(auth, cfpLoadingBar, $http, $rootScope, googleUserResource, ngProgress, editableOptions, editableThemes){
	// ngProgress.color("#5bc0de");
	editableOptions.theme = 'bs3';
	editableThemes.bs3.inputClass = 'input-sm';
	editableThemes.bs3.buttonsClass = 'btn-sm';
	cfpLoadingBar.start();
	$http.defaults.headers.common.Authorization = 'Bearer ' + auth.getToken();
	$rootScope.user = googleUserResource.get({user_id: "me"});
});