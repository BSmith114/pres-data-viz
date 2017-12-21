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

        
db.all(sql.counties, [], (err, rows) => {
    if (err) {
        throw err;
    }
    console.log(rows)
})

