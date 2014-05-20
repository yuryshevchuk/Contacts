angular.module('filters').filter('leaveOnlyId', function(){
	return function (text){
		var arr = text.split("/");
		return arr[arr.length-1]
	}
})