const pool = require('./pool');
const fetch = require('node-fetch');
const config = require('./config.json')
const postBlocks = require('../controllers/blocks').postBlocks;
pool.on('connect', ()=> {
    console.log('connected to the database')
})

const createBlocksTable = () => {
    const dataCreateQuery = `CREATE TABLE IF NOT EXISTS blocks
    (
        hash character varying(400),
        height character varying(100),
        time character varying(100),
        block_index character varying(100)
    )
    `;
    pool.query(dataCreateQuery)
        .then(res => {
            fetch(`${config.externalApi}/blocks/${Date.parse("June 26, 2021")}?format=json`)
                .then(response => response.json())
                .then(data => {
                    postBlocks(data)
                        .then(user =>{

                        })
                        .catch(error => {
                            console.log(error)
                        })
                })
        })
        .catch(err => {
            console.log(err);
            pool.end();
        })
};

const createRawBlockTable = () => {
    const dataCreateQuery = `CREATE TABLE IF NOT EXISTS rawblocks
    (
        hash character varying(100),
        size character varying(100),
        block_index character varying(100),
        time character varying(100),
        prev_block character varying(100),
        next_block character varying(100)
    )
    `;
    pool.query(dataCreateQuery)
        .then(res => {
           console.log(res);
           pool.end();
        })
        .catch(err => {
            console.log(err);
            pool.end();
        })
}

const createAllTables = () => {
    createBlocksTable();
    // createRawBlockTable();
}

process.argv.includes('--create-data-tables') && createAllTables();

exports.createAllTables = createAllTables;