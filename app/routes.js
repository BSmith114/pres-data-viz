var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var api = require('./api/elections');
var ctrl = require('./controllers/presElections')
var pug = require('pug');

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

	
// Website routes
// specific election
router.get('/:election(2000|2004|2008|2012|2016)', (req, res) => {	
	let electionResults = {}
	ctrl.getNationalResults(req.params.election)
	.then((nationalResults) => {
		electionResults.nationalResults = nationalResults
		return ctrl.getStateResults(req.params.election)
	})	
	.then((stateResults) => {
		electionResults.stateResults = stateResults
		res.render('elections', {
			title: 'Presidential Elections Results',
			election: req.params.election,
			results: electionResults
		})
	})
})

// homepage
router.get('/', (req, res) => {
	res.render('index', {
		title: "Election Results"
	})
})

// test page
router.get('/test/test', (req, res) => {
	res.sendfile('./public/test.html')
})

router.get('*', (req, res) => {
	res.status(404).send("NOOOOPE")
})

module.exports = router;
