exports.hosts = {
	'1': {
		host: '10.62.57.220',
		port: '8080',
		context: '/',
		username: '',
		password: ''
	},
	'2' : {
		host: '10.67.18.155',
		port: '8080',
		context: '/',
		username: 'admin',
		password: 'admin'
	},
	'3' : {
		host: '10.62.100.161',
		port: '80',
		context: '/jenkins',
		username: '',
		password: ''
	}
};

exports.jobs = {
	'1' : {
		host : '1',
		name : 'EMS_CIAutoDeploy'
	},
	'2' : {
		host : '1',
		name : 'APP_UROP_BUILD'
	},
	'3' : {
		host : '1',
		name : 'APP_GSM_BUILD'
	},
	'4' : {
		host : '1',
		name : 'APP_AG_BUILD'
	},
	'5' : {
		host : '1',
		name : 'APP_GUT_BUILD_TEST'
	},
	'6' : {
		host : '1',
		name : 'ems-naf-gut-buildTest-V12.13.30'
	}
};

exports.pipeline = {
	gut: {
		jobs : ['1'],
		submodules : {
			ems : {
				jobs : ['1'],
				
				submodules : {
					north : {
						jobs : ['6']
					},
					
					app : {
						jobs : ['2', '3', '4', '5']
					}
				}
			}
		}
	}
}