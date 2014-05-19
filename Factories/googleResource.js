app.factory("googleResource", ["$resource", "auth", function($resource, auth){
	return $resource("https://www.googleapis.com/plus/v1/people/me");
	}
}]);