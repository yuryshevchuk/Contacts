app.factory("logout", function($resource, auth){
	return $resource("https://accounts.google.com/o/oauth2/revoke?token="+auth.getToken);
});