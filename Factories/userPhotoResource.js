app.factory("userPhotoResource", function($resource){
	return $resource("https://www.googleapis.com/m8/feeds/photos/media/:user_email/:user_id", {user_email: "@user_email", user_id: "@user_id"},
		{
			get: {
				method:'GET',
				params:{alt:'json'},
				headers: {
					'Content-Type': 'image/*'
				}
			}
		});
});