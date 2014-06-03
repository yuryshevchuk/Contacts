app.controller('contactsAddingCtrl', function ($scope){
	$scope.postData = {gd$email: [{$t:''}]};
	$scope.addNewEmailInput = function () {
		$scope.postData.gd$email.push({$t: ''});
		console.log('data', $scope.postData);
	}
})