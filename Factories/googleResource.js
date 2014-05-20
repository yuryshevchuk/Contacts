app.factory("googleUserResource", function($resource){
	return $resource("https://www.googleapis.com/plus/v1/people/:user_id", {user_id: '@id'});
});