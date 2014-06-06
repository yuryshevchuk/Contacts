app.provider("auth", function(){
	var config = {
		scope: [],
		client_id: null,
		state: "oauth2callback",
		response_type: 'token',
		redirect_uri: '',
		storage_key: "authData"
	};
	var get = function (key){
		var data = JSON.parse(window.localStorage.getItem(config.storage_key) || '{}');
		return (key) ? data[key] : data;
	};
	var set = function (key, value){
		var data = get();
		data[key] = value;
		window.localStorage.setItem(config.storage_key, JSON.stringify(data));
	};
	// var clearStorage = function () {
	// 	window.localStorage.setItem(config.storage_key, JSON.stringify({}));
	// };
	var checkToken = function () {
		return !!get("token");
	};
	var redirect = function () {
		window.location.href = "https://accounts.google.com/o/oauth2/auth?"
					+ "scope=" + config.scope.join(' ')
					+ "&state=" + config.state
					+ "&redirect_uri=" + config.redirect_uri
					+ "&response_type=" + config.response_type
					+ "&client_id=" + config.client_id;
	};
	var isServiceResponse = function (){
		return window.location.hash.indexOf("state="+config.state) > -1
	};
	var parseResponse = function(){
		if (window.location.hash.indexOf("error=") > -1) {
			return false
		}
		var hash = window.location.hash.split("&");
			angular.forEach(hash, function(h){
				if (h.indexOf("access_token") > -1) {
					var parts = h.split("=");
					set("token", parts[1]);
				}
			})
		return true;
	};
	var validateToken = function($http){
		$http({method: 'GET', url: "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token="+get("token")})
		.success(function(data) {
				if (data.hasOwnProperty("error")) {
					redirect();
				};
			set("user_id", data["user_id"]);
			set("user_email", data["email"]);
		})
		.error(function(data, status, headers, config) {
			redirect();
		});
	};
	this.config = function(options){
		angular.extend(config, options);
	};
	function Auth () {
		this.getToken = function () {
			return get("token");
		}
		this.getUserId = function(){
			return get("user_id");
		}
		this.getUserEmail = function(){
			return get("user_email");
		}
	}
	this.$get = function ($http){
		if (isServiceResponse() && !parseResponse()){
			// clearStorage();
			redirect();
		}
		if (!checkToken()) {
			// clearStorage();
			redirect();
		}
		validateToken($http);
		return new Auth();
	};
});