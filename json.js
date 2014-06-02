var obj = {
	name: {
		givenName: 'Yuriokama',
		familyName: 'Tagasoki',
		fullName: 'Yuriokama Tagasoki'
	},
	email: [{attr:{address: 'smthgmail@gmail.com'}]
	phoneNumber: [{number: '0631286245', attr: false}, {number: '0631286245', attr: {rel: 'http://schemas.google.com/g/2005#home'}}]
	structuredPostalAddress: {
		city: 'Tokyo',
		street: 'Kandzuu str.',
		country: 'JPN',
		formattedAddress: 'Kandzuu str. Tokyo'
	}
}

var entry = {
	 "gd$name": {
     "gd$fullName": {
      "$t": "Яна"
     },
     "gd$givenName": {
      "$t": "Яна"
     }
    },
    "gd$email": [
     {
      "address": "yanasya7@gmail.com",
      "primary": "true",
      "rel": "http://schemas.google.com/g/2005#home"
     }
    ],
    "gd$phoneNumber": [
     {
      "rel": "http://schemas.google.com/g/2005#home",
      "uri": "tel:+380-93-710-2625",
      "$t": "+380937102625"
     },
     {
      "rel": "http://schemas.google.com/g/2005#mobile",
      "$t": "097-758-9400"
     }
    ],
    "gContact$groupMembershipInfo": [
     {
      "deleted": "false",
      "href": "http://www.google.com/m8/feeds/groups/shevchuk89%40gmail.com/base/6"
     }
}