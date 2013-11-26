exports.hosts = {
	'1': {
        host: 'ci.jruby.org'
    }
}

exports.jobs = {
    '1' : {
        host: '1',
        name: 'jruby-rack-dist'
    },
    
    '2' : {
        host: '1',
        name: 'jruby-launcher'
    }
}

exports.pipeline = {
	gut: {
		jobs : ['1'],
		submodules : {
			ems : {
				jobs : ['1'],
				
				submodules : {
					north : {
						jobs : ['1']
					},
					
					app : {
						jobs : ['2']
					}
				}
			}
		}
	}
}