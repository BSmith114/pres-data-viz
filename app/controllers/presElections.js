"use strict";
const sqlite3 = require('sqlite3').verbose()
const path = require('path')

let getdb = function () {
    let db = new sqlite3.Database(path.join(__dirname, '..', '..', 'db', 'vote.db'), sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.error(err.message);
        }
    });
    return db
};

module.exports = {

    getStateResults: (election) => {
        return new Promise((resolve, reject) => {
            let db = getdb()
            let sql = `
                select 
                    state
                    ,sum(democrat) as democrat
                    ,sum(republican) as republican
                    ,sum(other) as other
                from vote 
                where election = ?
                group by
                    state;`
            db.all(sql, [election], (err, rows) => {
                if (err) {
                    throw(err)
                    res.status(400).send(err)
                }            
                else {
                    resolve(rows)
                }
            });
            db.close()
        })
    },    
};