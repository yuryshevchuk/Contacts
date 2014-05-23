angular.module("app").controller("ContactsCtrl", function($scope, userContactsResource, userGroupsResource, $routeParams, $rootScope, numberOfNotesOnThePage){
	$scope.count = 1;
	console.log('fire')
	$scope.contacts = userContactsResource.get({user_email: "default", "start-index": (1+numberOfNotesOnThePage*($routeParams.page-1)), "max-results": numberOfNotesOnThePage});
	$scope.groups = userGroupsResource.get({user_email: "default"});
	// $scope.loadMore = function (){
	// 	$scope.count++;
	// 	console.log("test")
	// 	$scope.contacts = userContactsResource.get({user_email: "default", "start-index": (1+numberOfNotesOnThePage/2*($scope.count-1)), "max-results": numberOfNotesOnThePage});
	// }
});
