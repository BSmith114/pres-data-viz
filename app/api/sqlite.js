const sqlite3 = require('sqlite3').verbose()
const path = require('path')

let db = new sqlite3.Database(path.join(__dirname, '..', '..', 'db', 'vote.db'), sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.log(__dirname)
        return console.error(err.message);
    }
    console.log('Connected to vote database.')
});

let sql = {};
sql.counties = `
    select distinct 
        county
        ,state 
    from 
        vote`;

        
let getCounties = function() {
    db.all(sql.counties, [], (err, row) => {
    if (err) {
        throw err;
    }
    console.log(rows)
})
};

let getElections = function () {
    db.all(`select distinct election from vote`, [], (err, row) => {
    elections = [];
    row.forEach(data => {
        elections.push(data.election)
    });
    console.log(elections);
})};