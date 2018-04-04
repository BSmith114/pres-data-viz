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

    getElections: (req, res, next) => {
        // add error handling for failed db connex
        let db = getdb()
        db.all(`select distinct election from vote;`, [], (err, row) => {
            if (err) {
                throw(err)
                res.status(400).send(err)
            }            
            let elections = [];
            row.forEach(data => {
                elections.push(data.election)
            });
            if (!req.query.p) {
                res.status(200).send(elections);
            }
            else {
                return new Promise((resolve, reject) => {
                    resolve(elections)
                })
            }
        })        
        db.close()
        
    },

    getStates: (req, res, next) => {
        let db = getdb()
        db.all(`select distinct state from vote order by state;`, [], (err, row) => {
            if (err) {
                throw(err)
                res.status(400).send(err)
            }            
            let states = []
            row.forEach(data => {
                states.push(data.state)
            });
            if (!req.query.p) {
                res.status(200).send(states);
            }
            else {
                return new Promise((resolve, reject) => {
                    resolve(states)
                })
            }
        })
        db.close()
    },

    getCounties: (req, res, next) => {
        let db = getdb()
        let sql = `
            select distinct county
            from vote
            where state = ?`
        db.all(sql, [req.query.state], (err, row) => {
            if (err) {
                throw(err)
                res.status(400).send(err)
            }
            let counties = []
            row.forEach(data => {
                counties.push(data.county)
            });            
            if (!req.query.p) {
                res.status(200).send(counties);
            }
            else {
                return new Promise((resolve, reject) => {
                    resolve(counties)
                })
            }
        })
        db.close()
    },

    getNationalResults: (req, res, next ) => {
        let db = getdb()
        let sql = `
            select 
                election
                ,sum(democrat) as democrat
                ,sum(republican) as republican
                ,sum(other) as other
            from vote 
            where election = ?
            group by
                election;`
        db.all(sql, [req.query.election], (err, rows) => {
            if (err) {
                throw(err)
                res.status(400).send(err)
            }
            if (!req.query.p) {
                res.status(200).send(rows);
            }
            else {
                return new Promise((resolve, reject) => {
                    resolve(rows)
                })
            }
        });
        db.close()
    },      

    getStateResults: (req, res, next ) => {
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
        db.all(sql, [req.query.election], (err, rows) => {
            if (err) {
                throw(err)
                res.status(400).send(err)
            }            
            if (!req.query.p) {
                res.status(200).send(rows);
            }
            else {
                return new Promise((resolve, reject) => {
                    resolve(rows)
                })
            }
        });
        db.close()
    },    

    getCountyResults: (req, res, next ) => {
        let db = getdb()        
        let sql = `
            select 
                county
                ,fips
                ,democrat
                ,republican
                ,other
                ,printf("%.2f", cast(democrat_percent as real) * 100) as democrat_percent
                ,printf("%.2f", cast(republican_percent as real) * 100) as republican_percent
                ,printf("%.2f", cast(other_percent as real) * 100) as other_percent
                ,democrat_margin_percent
            from vote 
            where state = ? and election = ?;`
        db.all(sql, [req.query.state, req.query.election], (err, rows) => {
            if (err) {
                throw(err)
                res.status(400).send(err)
            }
            if (!req.query.p) {
                res.status(200).send(rows);
            }
            else {
                return new Promise((resolve, reject) => {
                    resolve(rows)
                })
            }
        });
        db.close()
    },

    getPresidentialElections: (req, res, next) => {
        let db = getdb();
        let vote = {}
        let national = {}
        let states = []
        let sql = `
            select 
                election
                ,state
                ,county
                ,fips
                ,democrat
                ,republican
                ,other
            from vote 
            limit 100`
        db.all(sql, [], (err, rows) => {
            if (err) {
                throw(err)
                res.status(400).send(err)
            }
            rows.forEach(data => {
                states.push(data)
            })
            vote.states = states
            res.status(200).send(vote)
        })        
    },
    test: (req, res, next) => {        
        module.exports.getElections(req, res, next)
        .then(function (result) {
            console.log(result)
            console.log(module.exports.getStates(req, res, next))
        })
    }
};