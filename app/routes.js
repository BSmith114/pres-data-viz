var express = require('express')
var router = express.Router();
var bodyParser = require('body-parser');
var api = require('./api/elections')

/* API Routes using SQlite */

router.route('/api/get-elections')
	.get(api.getElections)

router.route('/api/get-states')
	.get(api.getStates)	

router.route('/api/get-counties')
	.get(api.getCounties)	

router.route('/api/get-national-results')
	.get(api.getNationalResults)		

router.route('/api/get-state-results')
	.get(api.getStateResults)	

router.route('/api/get-state-results-by-county')
	.get(api.getCountyResults)

router.route('/api/get-election-results')
	// .get(api.getPresidentialElections)
	.get(api.test)

router.get('/pug', (req, res) => {
	res.render('index')
})
	

/* Website Routes */
router.get('*', function(req, res) {
	res.sendfile('./public/index.html')	
});

module.exports = router;
