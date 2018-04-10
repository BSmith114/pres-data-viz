import React from 'react'
import ReactDOM from 'react-dom'
import HelloWorld from './elections/HelloWorld.jsx'

var elex = require('./elections/electionResults')

window.addEventListener('load', function () {
    let election = window.location.href.split('/').pop()
    elex.buildElectoralMap(election)
});

ReactDOM.render(<HelloWorld />, document.getElementById('react'))

console.log('did that thing')

