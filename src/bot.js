const LineConnect = require('./connect');
let line = require('./main.js');
let LINE = new line();


const auth = {
	authToken: 'EDrP9Kj0YwDDWVERChZ9.cwYNH0UlnnkN5j13+N1vEq.hNbQGndY4g+BOGpXlibfsrGH1BDUWsnYeDC9487/d58=',
	certificate: '542ff3c1bdc252e3c8da1596f040f95cfcba9be9a33a842ad0b29bcebddd801d',
	email: 'oug47539@zwoho.com',
	password: 'Apple234'
}

let client =  new LineConnect();
//let client =  new LineConnect(auth);

client.startx().then(async (res) => {
	
	while(true) {
		try {
			ops = await client.fetchOps(res.operation.revision);
		} catch(error) {
			console.log('error',error)
		}
		for (let op in ops) {
			if(ops[op].revision.toString() != -1){
				res.operation.revision = ops[op].revision;
				LINE.poll(ops[op])
			}
		}
	}
});

