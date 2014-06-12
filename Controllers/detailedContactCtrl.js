app.controller("detailedContactCtrl", function (auth, $window, $scope, $filter, $location, cfpLoadingBar, $http, jsonToGdataService, userContactsResource, userPhotoResource, userGroupsResource, $routeParams, $rootScope){
	cfpLoadingBar.start();
	$scope.groups = {};

	$scope.open = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();
	    $scope.opened = true;
  	};
	$scope.dateOptions = {
		formatYear: 'yy',
		startingDay: 1
	};
	$scope.format = 'dd.MM.yyyy';
	$scope.birthDate;
	$scope.$watch('birthDate', function (newVal, oldVal) {
		if (newVal != oldVal && newVal) {
			console.log(newVal)
			$scope.detailedContact.entry.gContact$birthday.when = $filter('date')(newVal, 'yyyy-MM-dd')
			console.log($scope.detailedContact.entry.gContact$birthday.when)
		};
  	});
	userGroupsResource.get({user_email: "default"}, function (groups){
		angular.forEach(groups.feed.entry, function(value){
			$scope.groups[value.id.$t] = value;
			if (value.gContact$systemGroup) {
				$scope.groups[value.id.$t].title.$t = value.title.$t.substring(14);
			}
		});
	});
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
        	if (!$scope.detailedContact.entry.gContact$groupMembershipInfo) {
        		$scope.detailedContact.entry.gContact$groupMembershipInfo = [];
        	};
        	if (!$scope.detailedContact.entry.gContact$birthday) {
        		$scope.detailedContact.entry.gContact$birthday = {'when': ''};
        	};

			$scope.modalContactDeleteTitle = function () {
				if ($scope.detailedContact && $scope.detailedContact.entry.gd$name.gd$givenName) {
					return ($scope.detailedContact.entry.gd$name.gd$givenName.$t + ' contact')
				}
			}
        	$scope.loadingComplete = true;
        	cfpLoadingBar.complete();
        });
	}

	$scope.saveEditedContact = function () {
		var entryWithTitle = {
			"title": {
				"$t": $scope.detailedContact.entry.gd$name.gd$fullName.$t
			}
		}
		angular.extend(entryWithTitle, $scope.detailedContact.entry)
		$http.defaults.headers.common['If-match'] = $scope.detailedContact.entry.gd$etag;
		userContactsResource.put({user_email: "default", user_id: $routeParams.user_id}, jsonToGdataService.contact(entryWithTitle)).$promise.then(
	        function(){
	        }, function(){
	        });
        delete $http.defaults.headers.common['If-match'];
        
	};

	$scope.saveNewContact = function () {
		var entryWithTitle = {
			"title": {
				"$t": $scope.detailedContact.entry.gd$name.gd$fullName.$t
			}
		}
		var xmlstroke='';
		var id = '';
		angular.extend(entryWithTitle, $scope.detailedContact.entry)

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

	$scope.getTitleOfGroup = function (groupId) {
		return $scope.groups[groupId]?$scope.groups[groupId].title.$t:'';
	}

	$scope.deleteInfoField = function (arr, index) {
		arr.splice(index, 1)
	}

	$scope.backToPrevPage = function () {
		console.log('fuck')
		$window.history.back()
	}

	$scope.updateTime = function () {
		if ($scope.detailedContact && $scope.detailedContact.entry.updated) {
			var timeArr = $scope.detailedContact.entry.updated.$t.split('T');
			var clock = timeArr[1].split('.')
			return timeArr[0] + ' at ' + clock[0];
		} else {
			return '';
		}
	}

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
			     "gd$fullName": {
			      "$t": ""
			     }
			    },
			    "gContact$groupMembershipInfo": [],
			    "gd$email": [],
			    "gd$phoneNumber": [],
			    "gContact$birthday": {
			   		"when": ""
			  	 },
			     "gd$structuredPostalAddress": [],
			     "gContact$website":[],
			     "gContact$userDefinedField": []
			}
        	$scope.loadingComplete = true;
		cfpLoadingBar.complete();
	} else {
		$scope.saveContact = $scope.saveEditedContact
		$scope.getContact();
		$scope.contactPhoto = userPhotoResource.get({user_email: "default", user_id: $routeParams.user_id})
	};

	
})