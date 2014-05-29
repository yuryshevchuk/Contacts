app.factory("userGroupsResource", function($resource){
	return $resource("https://www.googleapis.com/m8/feeds/groups/:user_email/full/:user_id", {user_email: "@user_email", user_id: "@user_id"},
		{
			get: {method:'GET', params:{alt:'json'}},
			put: {method:'PUT', params:{alt:'json'}},
			delete: {method: 'DELETE'}
		});
});