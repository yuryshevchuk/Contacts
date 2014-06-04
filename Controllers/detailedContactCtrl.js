app.controller("detailedContactCtrl", function ($scope, cfpLoadingBar, $http, jsonToGdataService, userContactsResource, userPhotoResource, $routeParams, $rootScope, ngProgress){
	cfpLoadingBar.start();

	$scope.saveEditedContact = function () {
		var entryWithTitle = {
			"title": {
				"$t": $scope.detailedContact.entry.gd$name.gd$givenName.$t
			}
		}
		angular.extend(entryWithTitle, $scope.detailedContact.entry)
		$http.defaults.headers.common['If-match'] = $scope.detailedContact.entry.gd$etag;
		userContactsResource.put({user_email: "default", user_id: $routeParams.user_id}, jsonToGdataService.contact(entryWithTitle)).$promise.then(
        function(value){
        }, function(){
        });
        delete $http.defaults.headers.common['If-match'];
	};


	$scope.saveNewContact = function () {
		var entryWithTitle = {
			"title": {
				"$t": $scope.detailedContact.entry.gd$name.gd$givenName.$t
			}
			// "gd$name": {
			// 	"gd$fullName": {
			// 		"$t": $scope.detailedContact.entry.gd$name.gd$givenName.$t
			// 	}
			// }
		}
		angular.extend(entryWithTitle, $scope.detailedContact.entry)
		console.log($scope.detailedContact.entry);
		userContactsResource.post({user_email: "default"}, jsonToGdataService.contact(entryWithTitle)).$promise.then(
        function(value){
        }, function(){
        });
	};


	if ($routeParams.user_id == 'add') {
		$scope.saveContact = $scope.saveNewContact
		$scope.detailedContact = {entry:{}};
		$scope.userId = $routeParams.user_id
			$scope.detailedContact.entry = {
				 "gd$name": {
			     "gd$givenName": {
			      "$t": ""
			     }
			    },
			    "gd$email": [],
			    "gd$phoneNumber": [],
			    "gContact$birthday": {
			   		"when": ""
			  	 },
			     "gd$structuredPostalAddress": [],
			     "gContact$website":[]
			}
	cfpLoadingBar.complete();

	} else {
	$scope.saveContact = $scope.saveEditedContact
	userContactsResource.get({user_email: "default", user_id: $routeParams.user_id}).$promise.then(
        function(value){
        	$scope.detailedContact = value;
        	cfpLoadingBar.complete();
        }, function(){
        });
	};

	
})