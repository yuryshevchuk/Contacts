app.factory("userGroupsResource", function($resource){
	return $resource("https://www.googleapis.com/m8/feeds/groups/:user_email/full/:group_id", {user_email: "@user_email", group_id: "@group_id"},
		{
			get: {method:'GET', params:{alt:'json'}},
			post: {
				method:'POST',
				headers: {'Content-Type': 'application/atom+xml'}
			},
			delete: {method: 'DELETE'}
		});
});