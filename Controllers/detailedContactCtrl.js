app.controller("detailedContactCtrl", function ($scope, $filter, $location, cfpLoadingBar, $http, jsonToGdataService, userContactsResource, userPhotoResource, $routeParams, $rootScope, ngProgress){
	cfpLoadingBar.start();
	$scope.loadingComplete = false;
		$scope.getContact = function () {
		userContactsResource.get({user_email: "default", user_id: $routeParams.user_id}).$promise.then(
        function(value){
        	$scope.detailedContact = value;
        	if (!$scope.detailedContact.entry.gd$email) {
        		$scope.detailedContact.entry.gd$email = [];
        	};
        	if (!$scope.detailedContact.entry.gd$phoneNumber) {
        		$scope.detailedContact.entry.gd$phoneNumber = [];
        	};
        	if (!$scope.detailedContact.entry.gd$structuredPostalAddress) {
        		$scope.detailedContact.entry.gd$structuredPostalAddress = [];
        	};
        	if (!$scope.detailedContact.entry.gContact$website) {
        		$scope.detailedContact.entry.gContact$website = [];
        	};
        	if (!$scope.detailedContact.entry.gContact$userDefinedField) {
        		$scope.detailedContact.entry.gContact$userDefinedField = [];
        	};
        	console.log($scope.detailedContact)
        	// if (type == 'new') {
        	// 	alert(filters.leaveOnlyId($scope.detailedContact.entry.id.$t))
        	// };
			$scope.modalContactDeleteTitle = function () {
				if ($scope.detailedContact && $scope.detailedContact.entry.gd$name.gd$givenName) {
					return ($scope.detailedContact.entry.gd$name.gd$givenName.$t + ' contact')
				}
			}
        	$scope.loadingComplete = true;
        	cfpLoadingBar.complete();
        }, function(){
        });
	}

	$scope.saveEditedContact = function () {
		var entryWithTitle = {
			"title": {
				"$t": $scope.detailedContact.entry.gd$name.gd$givenName.$t
			}
		}
		angular.extend(entryWithTitle, $scope.detailedContact.entry)
		$http.defaults.headers.common['If-match'] = $scope.detailedContact.entry.gd$etag;
		userContactsResource.put({user_email: "default", user_id: $routeParams.user_id}, jsonToGdataService.contact(entryWithTitle)).$promise.then(
	        function(){
	        	$scope.getContact();
	        }, function(){
	        });
        delete $http.defaults.headers.common['If-match'];
        
	};

	// $scope.showForm = function (show) {
	// 	if ($scope.userId == 'add') {
	// 		show();
	// 	};
	// };

	$scope.saveNewContact = function () {
		var entryWithTitle = {
			"title": {
				"$t": $scope.detailedContact.entry.gd$name.gd$givenName.$t
			}
		}
		var xmlstroke='';
		var id = '';
		angular.extend(entryWithTitle, $scope.detailedContact.entry)
		console.log($scope.detailedContact.entry);
		userContactsResource.post({user_email: "default"}, jsonToGdataService.contact(entryWithTitle)).$promise.then(
        function(value){
        	angular.forEach(value, function (symbol) {
        		xmlstroke += symbol;
        	})
        	id = xmlstroke.substring(xmlstroke.indexOf('<id>'), xmlstroke.indexOf('</id>'))
        	id = $filter('leaveOnlyId')(id);
        	$location.path('/contacts/'+id)
        }, function(){
        });
	};

	$scope.deleteContact = function () {
		$http.defaults.headers.common['If-match'] = $scope.detailedContact.entry.gd$etag;
		userContactsResource.delete({user_email: "default", user_id: $routeParams.user_id}, function(){
			delete $scope.detailedContact;
			$location.path($scope.backToPrevPage())
		});
		delete $http.defaults.headers.common['If-match'];
	}

	// $scope.backToPrevPage = function () {
	// 	console.log('fuck')
	// 	if ($rootScope.filter) {
	// 		$location.path('/contacts')
	// 		angular.forEach($rootScope.filter, function (value, key){
	// 			$location.search(key, value)
	// 		})
			
	// 	}

	// 	var page, q, group, path;
	// 	if ($rootScope.filter) {
	// 		if (!$rootScope.filter.page && !$rootScope.filter.q && !$rootScope.filter.group) {
	// 			return '#/contacts'
	// 		};
	// 		page = ($rootScope.filter.page) ? ('page=' + $rootScope.filter.page) : '';
	// 		q = ($rootScope.filter.q) ? ('&q=' + $rootScope.filter.q) : '';
	// 		group = ($rootScope.filter.group) ? ('&group=' + $rootScope.filter.group) : '';
	// 		path = page + q + group;
	// 		console.log($rootScope.filter, path, $location.path())
	// 		return ('#/contacts?' + path)
	// 	};
	// }

	if ($routeParams.user_id == 'add') {
	
		$scope.$watch("editableForm", function (newVal, oldVal){
			if (newVal) {
				newVal.$show();
				return false;
			};
		})
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
		$scope.getContact();
		$scope.contactPhoto = userPhotoResource.get({user_email: "default", user_id: $routeParams.user_id})
	};

	
})