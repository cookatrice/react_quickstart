var req1 = new Promise(function(resolve, reject) { 
	setTimeout(function() { resolve('작업1'); }, 3000);
});
var req2 = new Promise(function(resolve, reject) { 
	setTimeout(function() { resolve('작업2'); }, 1000);
});

Promise.race([req1, req2]).then(function(results) {
	console.log('Resolve : ', results);
}).catch(function(err) {
	console.log('Reject : ', err);
});