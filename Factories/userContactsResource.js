app.factory("userContactsResource", function($resource){
	return $resource("https://www.googleapis.com/m8/feeds/contacts/:user_email/full/:user_id", {user_email: "@user_email", user_id: "@user_id"},
		{
			get: {method:'GET', params:{alt:'json'}},
			post: {
				method:'POST',
				headers: {'Content-Type': 'application/atom+xml'}
			},
			put: {
				method: 'PUT',
				headers: {'Content-Type': 'application/atom+xml'}
			},
			delete: {method: 'DELETE'}
		});
});