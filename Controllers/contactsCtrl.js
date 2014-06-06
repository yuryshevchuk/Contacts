angular.module("app").controller("ContactsCtrl", function (jsonToGdataService, cfpLoadingBar,$http, $scope, $location, userContactsResource, userGroupsResource, $routeParams, $rootScope, numberOfNotesOnThePage, ngProgress){
	console.log('fire');
	$scope.groups = {};
	$scope.filter = $location.search();
	$scope.selectedContacts = {};
	$scope.emptyGroup = {};


	userGroupsResource.get({user_email: "default"}, function (groups){
		$scope.groupStatuses = {};
		angular.forEach(groups.feed.entry, function(value){
			$scope.groups[value.id.$t] = value;
			if (value.gContact$systemGroup) {
				$scope.groups[value.id.$t].title.$t = value.title.$t.substring(14);
			}
		});
	});
	
	$scope.$watch('filter', function(newVal, oldVal){
		if ( newVal !== oldVal) {
			$scope.reloadContacts(newVal);
			angular.forEach(newVal, function(value, key){
				$location.search(key, value)
			})
			$rootScope.filter = newVal;
		}
	}, true);

	// var message = jsonToGdataService.contact({ 
	// "gd$name": {
 //     "gd$fullName": {
 //      "$t": "TestNewContact"
 //     },
 //     "gd$givenName": {
 //      "$t": "TestNewContact"
 //     }
 //    },
 //    "gd$email": [
 //     {
 //      "address": "testNewContactMail@gmail.com",
 //      "primary": "true",
 //      "rel": "http://schemas.google.com/g/2005#home"
 //     }
 //    ],
 //    "gd$phoneNumber": [
 //     {
 //      "rel": "http://schemas.google.com/g/2005#home",
 //      "uri": "tel:+380-99-999-9991",
 //      "$t": "+380999999991"
 //     },
 //     {
 //      "rel": "http://schemas.google.com/g/2005#mobile",
 //      "$t": "091-111-4444"
 //     }
 //    ]
 // });





	// userContactsResource.post({user_email: "default"}, message).$promise.then(
 //        function(){
 //        }, function(value){
 //        	console.log(value)
 //        }
 //      );


	

	$rootScope.getGroupTitle = function(groupId) {
		return $scope.groups[groupId]?$scope.groups[groupId].title.$t:'';
	}
	$scope.filterByGroup = function (key){
		$scope.filter.page = 1;
		$scope.filter.group = key;
	}
	$scope.onSelectContactCallback = function(index){
		var contact = $scope.contacts.feed.entry[index];
		if (contact.isChecked) {
			$scope.selectedContacts[index] = contact;
		} else {
			delete $scope.selectedContacts[index];
			//$scope.selectedContacts = $scope.selectedContacts.filter(function(item){return item != contact.id.$t});
		}
	}
	$scope.reloadContacts = function (newVal){
		$scope.selectedContacts = {};
		cfpLoadingBar.start();
			if (!$scope.filter.page) {
				$scope.filter['page'] = 1;
			}
		userContactsResource.get(angular.extend({user_email: "default", "max-results": numberOfNotesOnThePage, 'start-index': 1+numberOfNotesOnThePage*($scope.filter.page-1)}, newVal)).$promise.then(
        function(value){
        	$scope.contacts = value;
        	cfpLoadingBar.complete();
        }, function(){
        }
      );
	}

	$scope.deleteContacts = function () {
		console.log('start deleting contacts....', $scope.selectedContacts);
		angular.forEach($scope.selectedContacts, function(contact, index){
			$http.defaults.headers.common['If-match'] = contact.gd$etag;
			console.log(contact);
			var userId = contact.id.$t.split('/');
			userId = userId[userId.length - 1];
			userContactsResource.delete({user_email: "default", user_id: userId},function(){
				delete $scope.contacts.feed.entry[index];
				delete $scope.selectedContacts[index];
				if (!Object.keys($scope.selectedContacts).length)
					$scope.reloadContacts($scope.filter);
			});
		})
			delete $http.defaults.headers.common['If-match'];
	}

	$scope.deleteGroup = function (group) {
		var shortId;
		console.log('start deleting group....', group);
		$http.defaults.headers.common['If-match'] = group.gd$etag;
		shortId = group.id.$t.split('/');
		shortId = shortId[shortId.length - 1];
		userGroupsResource.delete({user_email: "default", group_id: shortId});
		delete $http.defaults.headers.common['If-match'];
		delete $scope.groups[group.id.$t];
	}
	$scope.isContactsSelected = function () {
		return Object.keys($scope.selectedContacts).length;
	}
	$scope.selectAllContacts = function () {
		var checked = (Object.keys($scope.selectedContacts).length != Object.keys($scope.contacts.feed.entry).length) ? true : false;
		angular.forEach($scope.contacts.feed.entry, function (contact, key){
			contact.isChecked = checked;
			$scope.onSelectContactCallback(key);
		})

	}

	$scope.modalContactsDeleteTitle = function () {
		var dibilizm;
		if ($scope.isContactsSelected()) {
			if ($scope.isContactsSelected() > 1) {
				return ($scope.isContactsSelected() + ' contacts');
			} else {
				angular.forEach($scope.selectedContacts, function (value){
					dibilizm = value.title.$t
				})
				return (dibilizm + ' contact')
			}
		};
	};

	$scope.createGroup = function (group) {
		var creationRequest = jsonToGdataService.group(group);
		userContactsResource.post({user_email: "default"}, creationRequest).$promise.then(function(value){
			console.log(value);
		}, function (){

		});
		console.log(creationRequest);
	}

	$scope.editGroup = function (group) {
		var shortId;
		$http.defaults.headers.common['If-match'] = group.gd$etag;
		shortId = group.id.$t.split('/');
		shortId = shortId[shortId.length - 1];
		userGroupsResource.put({user_email: "default", group_id: shortId}, jsonToGdataService.group(group));
		delete $http.defaults.headers.common['If-match'];
	}
	$scope.reloadContacts($scope.filter);
});


// testContact1, testContact2, testContact3, testContact4, testContact5, testContact6, testContact7, testContact8, testContact9, testContact10