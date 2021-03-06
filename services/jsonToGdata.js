app.factory('jsonToGdataService', function (){
	var attachment = '';
	var template = "<atom:entry xmlns:atom='http://www.w3.org/2005/Atom' " +
		"xmlns:gd='http://schemas.google.com/g/2005'>" +
		"<atom:category scheme='http://schemas.google.com/g/2005#kind' " +
		"term='http://schemas.google.com/contact/2008#contact' />" +
		attachment + "</atom:entry>";

	var parsers = {
		emailParser: function (key, value) {
			var res ='';
			angular.forEach(value, function (obj){
				var tagAttrs ='';
				angular.forEach(obj, function (content, tag){
					if (tag != '$$hashKey') {
						tagAttrs += ' '+tag +'=' +'"' + content +'"';
					};
				})
				res += createNode(tagFormat(key), '', tagAttrs)
			})
			return res;
		},
		birthdayParser: function (key, value) {
			var tagAttrs= ' when=' + '"' +value.when +'"';
			if (value.when) {
				return createNode(tagFormat(key), '', tagAttrs)
			} else {
				return '';
			}
		},
		phoneParser: function (key, value) {
			var res='', canceled;
			angular.forEach(value, function (obj) {
				var tagValue ='', tagAttrs ='';
				angular.forEach(obj, function (content, tag){
					if (!content) {
						canceled = true;
					};
					if (tag[0] == '$' && tag != '$$hashKey') {
						tagValue = content;
					} else if (tag != '$$hashKey') {
						tagAttrs += ' ' + tag + '=' + '"' + content + '"';
					}
				});
				res += createNode(tagFormat(key), tagValue, tagAttrs)
			});
			if (canceled) {
				return '';
			} else {
				return res;
			}
			
		},
		postParser: function (key, value) {
			var res='';
			angular.forEach(value, function (obj) {
				var tagValue ='', tagAttrs ='';
				angular.forEach(obj, function (content, tag){
					if (angular.isString(content) && tag != '$$hashKey') {
						tagAttrs += ' ' + tag + '=' + '"' + content + '"';
					} else {
						angular.forEach(content, function (value, key){
							if (key[0] == '$') {
								tagValue = createNode(tagFormat(tag), value, '')
							};
						})
					}
				})
				res += createNode(tagFormat(key), tagValue, tagAttrs)
			})
			return res;
		},
		websiteParser: function (key, value) {
			var res='';
			angular.forEach(value, function (obj) {
				var tagAttrs ='';
				angular.forEach(obj, function (content, tag){
					if (tag != "$$hashKey") {
						tagAttrs += ' ' + tag + '=' + '"' + content + '"';
					};
				})
				res += createNode(tagFormat(key), '', tagAttrs)
			})
			return res;
		}
	}




	function parser (key, value, parent) {
		var res ='', tagValue='', tagAttrs='';
		var keys = ['link', 'category', 'gd$etag', 'id', 'app$edited', 'updated', 'xmlns', 'xmlns$batch', 'xmlns$gContact', 'xmlns$gd']
		if (keys.indexOf(key) > -1) {
			return '';
		};
		if (key == 'gd$email') {
			return parsers.emailParser(key, value);
		};
		if (key == 'gContact$birthday') {
			return parsers.birthdayParser(key, value);
		};
		if (key == 'gd$phoneNumber') {
			return parsers.phoneParser(key, value);
		};
		if (key == 'gd$structuredPostalAddress') {
			return parsers.postParser(key, value);
		};
		if (key == 'gContact$website' || key == 'gContact$userDefinedField' || key == 'gContact$groupMembershipInfo') {
			return parsers.websiteParser(key, value);
		};

		if (angular.isString(value) && !parent) {
			res += createNode(tagFormat(key), value);
		};
		if (angular.isArray(value) && !parent) {
			angular.forEach(value, function (attrObj){
				angular.forEach(attrObj, function (value, tag){
					
					// if (!value) {
					// 	return '';
					// };
					if (tag != "$$hashKey") {
						res += parser(tagFormat(tag), value, key);
					};
					
					
				})
			})
			return res;
		};

		if (angular.isString(value) && parent) {
			var tagAttrs='';
			if (key[0] == '$' && key[1] != '$') {
					res += createNode(tagFormat(parent), value, "");
				} else if (key[0] != '$' && key[1] != '$'){
					tagAttrs += ' '+key +'=' +'"' + value +'"';
					res += createNode(tagFormat(parent), "", tagAttrs);
				}
		};

		if (angular.isObject(value) && parent){
			angular.forEach(value, function (tagcontent, tag) {
				var tagValue ='';
				var tagAttrs ='';
				if (!tagcontent) {
					return '';
				};
				if (tag[0] == '$' && tag[1] != '$') {
					tagValue = tagcontent;
					res += createNode(tagFormat(parent), tagValue, tagAttrs);
				} else if (tag[0] != '$' && tag[1] != '$'){
					tagAttrs += ' '+tag +'=' +'"' + tagcontent +'"';
					res += createNode(tagFormat(parent), tagValue, tagAttrs);
				}
			});
			
		};
		if (angular.isObject(value) && !parent) {
			var parse='';
			angular.forEach(value, function (value, tag){
				if (angular.isObject(value) && angular.isString(tag) && tag.indexOf('gd$') > -1) {
					parse += parser(tagFormat(tag), value, tagFormat(tag));
					// res+=parser(tagFormat(tag), value, key);
				}
				if (value && angular.isString(value)) {
					res += createNode(tagFormat(key), value);
				};
			});
			if (parse) {
				res+=parser(tagFormat(key), parse);
			};
		};
		return res;
	};
	function tagFormat (tag) {
		if (angular.isString(tag) && tag.indexOf('$') > -1) {
			tag = tag.replace(/[$]/g, ":")
		};
		return tag;
	};

	function createNode(tagName, tagValue, tagAttrs){
		if (!tagAttrs) {
			tagAttrs = '';
		}
		if (!tagValue) {
			tagValue = '';
		}
		var tagstroke='<' + tagName + tagAttrs+'>' + tagValue + '</' + tagName + '>';
		return tagstroke;
	}

	return {
		contact: function (obj) {
			var res='';
			var template = "<atom:entry xmlns:atom='http://www.w3.org/2005/Atom' " +
			"xmlns:gd='http://schemas.google.com/g/2005'>" +
			"<atom:category scheme='http://schemas.google.com/g/2005#kind' " +
			"term='http://schemas.google.com/contact/2008#contact' />";

			angular.forEach(obj, function(value, key){
				res += parser(key, value);
			})
			template = template + res + "</atom:entry>";
			return template;
		},
		group: function (group) {
			var template;
			if (group.gd$etag) {
				template = '<atom:entry xmlns:gd="http://schemas.google.com/g/2005" ' +
      			'gd:etag="' + group.gd$etag + '">' +
    			'<atom:category scheme="http://schemas.google.com/g/2005#kind" ' +
      			'term="http://schemas.google.com/g/2005#group"/>' +
    			'<atom:id>' + group.id.$t + '</atom:id>' +
    			'<atom:published>' + group.app$edited.$t + '</atom:published>' +
    			'<atom:updated>' + group.updated.$t + '</atom:updated>' +
    			'<atom:title type="text">' + group.title.$t + '</atom:title>' +
    			'<atom:content type="text">' + group.title.$t + '</atom:content>' +
    			'</atom:entry>'
			} else {
				template = '<atom:entry xmlns:gd="http://schemas.google.com/g/2005">' +
	  			'<atom:category scheme="http://schemas.google.com/g/2005#kind" ' +
	    		'term="http://schemas.google.com/contact/2008#group"/>' +
	  			'<atom:title type="text">' + group.title.$t + '</atom:title>' +
				'</atom:entry>'
			}
			return template;
		}
	}
});