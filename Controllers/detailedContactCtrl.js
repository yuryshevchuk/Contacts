app.controller("detailedContactCtrl", function ($scope, cfpLoadingBar, userContactsResource, userPhotoResource, $routeParams, $rootScope, ngProgress){
	cfpLoadingBar.start();

	if ($routeParams.user_id == 'add') {
		$scope.detailedContact = {entry:{}};
		$scope.userId = $routeParams.user_id
			$scope.detailedContact.entry = {
				"title": {
			   	"$t": ""
			 	 },
				 "gd$name": {
			     "gd$fullName": {
			      "$t": ""
			     }
			    },
			    "gd$email": [
			     {
			      "address": ""
			     }
			    ],
			    "gd$phoneNumber": [
			     {
			      "$t": ""
			     }
			    ],
			    "gContact$groupMembershipInfo": [
			     {
			      "deleted": "false",
			      "href": "http://www.google.com/m8/feeds/groups/shevchuk89%40gmail.com/base/6"
			     }
			     ],
			     "gContact$birthday": {
			   		"when": ""
			  	 },
			     "gd$structuredPostalAddress": [
			   	 {
			     "rel": "http://schemas.google.com/g/2005#home",
				    "gd$formattedAddress": {
				     "$t": ""
				  	 }
				}
				]
			}

	cfpLoadingBar.complete();



	} else {
	userContactsResource.get({user_email: "default", user_id: $routeParams.user_id}).$promise.then(
        function(value){
        	$scope.detailedContact = value;
        	cfpLoadingBar.complete();
        }, function(){
        });
	};



})