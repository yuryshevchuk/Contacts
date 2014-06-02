app.factory('jsonToGdataService', function (){
	var attachment = '';
	var template = "<atom:entry xmlns:atom='http://www.w3.org/2005/Atom'" +
		"xmlns:gd='http://schemas.google.com/g/2005'>" +
		"<atom:category scheme='http://schemas.google.com/g/2005#kind'" +
		"term='http://schemas.google.com/contact/2008#contact'/>" +
		attachment + "</atom:entry>";
	
	function parser (key, value, parent) {
		var res ='', tagValue='', tagAttrs='';
		console.log(key, value, parent);
		if (angular.isString(value)) {
			res += createNode(key, value);
			console.log('0 parsing string', key, value);
		};
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
					tagAttrs += tag +'=' +'"' + value +'"';
				}
			});
			console.log('2 parsing obj with parent', parent, tagValue, tagAttrs)
			res += createNode(tagFormat(parent), tagValue, tagAttrs);
		};
		if (angular.isObject(value) && !parent) {
			var parse='';
			angular.forEach(value, function (value, tag){
				console.log('3 parsing obj', tag, value, key);
				if (angular.isObject(value) && angular.isString(tag) && tag.indexOf('gd$') > -1) {
					parse += parser(tagFormat(tag), value, tagFormat(tag));
					console.log(value, parse)
					return;
				}
				res+=parser(tagFormat(tag), value, key);
			});
			if (parse) {
				res+=parser(tagFormat(key), parse);
			};
		};
		return res;
	};
	function tagFormat (tag) {
		if (angular.isString(tag) && tag.indexOf('gd$') > -1) {
			tag = tag.replace(/[$]/g, ":")
		};
		return tag;
	};

	function createNode(tagName, tagValue, tagAttrs){
		var space = ' ';
		if (!tagAttrs) {
			tagAttrs = '';
			space = '';
		}
		if (!tagValue) {
			tagValue = '';
		}
		var tagstroke='<' + tagName + space + tagAttrs+'>' + tagValue + '</' + tagName + '>';
		return tagstroke;
	}

	return {
		contact: function (obj) {
			var res='';
			var template = "<atom:entry xmlns:atom='http://www.w3.org/2005/Atom'" +
			"xmlns:gd='http://schemas.google.com/g/2005'>" +
			"<atom:category scheme='http://schemas.google.com/g/2005#kind'" +
			"term='http://schemas.google.com/contact/2008#contact'/>";
			
			angular.forEach(obj, function(value, key){
				res += parser(key, value);
			})
			template = template + res + "</atom:entry>";
			console.log('template', template)
			return template;
		}
	}
})