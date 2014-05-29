app.controller("detailedContactCtrl", function($scope, userContactsResource, userPhotoResource, $routeParams, $rootScope, ngProgress){
	ngProgress.start();
	userContactsResource.get({user_email: "default", user_id: $routeParams.user_id}).$promise.then(
        function(value){
        	$scope.detailedContact = value;
        	ngProgress.complete();
        }, function(){
        	ngProgress.reset();
        });
})