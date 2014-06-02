app.factory('jsonToGdataService', function (){
	var attachment = '';
	var template = "<atom:entry xmlns:atom='http://www.w3.org/2005/Atom'" +
		"xmlns:gd='http://schemas.google.com/g/2005'>" +
		"<atom:category scheme='http://schemas.google.com/g/2005#kind'" +
		"term='http://schemas.google.com/contact/2008#contact'/>" +
		attachment + "</atom:entry>";
	


	function parser (key, value, parent) {
		var res ='', tagValue='', tagAttrs='';

		if (angular.isArray(value)) {
			angular.forEach(value, function (attrObj){
				angular.forEach(attrObj, function (value, tag){
					parser(tagFormat(tag), value, key);
					console.log('1 parsing array', tag, value, key)
				})
			})
		};
		if (angular.isObject(value) && parent){
			angular.forEach(value, function (value, tag) {
				if (tag[0] == '$') {
					tagValue = value;
				} else {
					tagAttrs += tag +'=' +'"' + value +'"' + ' ';
				}
			});
			console.log('2 parsing obj with parent', parent, tagValue, tagAttrs)
			res += createNode(tagFormat(parent), tagValue, tagAttrs);
		};

		if (angular.isObject(value)) {
			angular.forEach(value, function (value, tag){
				console.log('3 parsing obj', tag, value, key);
				res+=parser(tagFormat(tag), value, key);
			});
		};

		return res;
	};
	function tagFormat (tag) {
		console.log('tag before:', tag);
		var re = /[$]/g;
		if (angular.isString(tag) && tag.indexOf('gd$') > -1) {
			tag = tag.replace(re, ":")
		};

		console.log('tag after:', tag);
		return tag;
	}
	function createNode(tagName, tagValue, tagAttrs){
		var tagstroke='<'+tagName+ ' ' +tagAttrs+'>'+tagValue+'</'+tagName+'>';
		return tagstroke;
	}


	function arrValueParser (attrObj, tag) {
		
	}

	





	return {
		contact: function (obj) {
			var res='';
			angular.forEach(obj, function(value, key){
				res += parser(key, value);
			})
			console.log('res', res)
			return res;
		}
	}
})