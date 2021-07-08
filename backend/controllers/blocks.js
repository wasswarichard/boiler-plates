const pool = require("../db/pool")
const config = require('../db/config.json')
const fetch = require('node-fetch');
const _ = require('underscore')
const postBlocks = (block) => {
    return new Promise((resolve, reject) => {
        try {
            block.forEach( data => {
                pool.query(`INSERT INTO public."blocks" (hash, height, time, block_index) VALUES ($1, $2, $3, $4)`, [data.hash, data.height, data.time, data.block_index], (error, results) => {
                    if(error) return  reject(error)
                    return resolve(results)
                })
            })

        } catch (error) {
            return  reject(error);
        }

    })
}

const postBlockDetails = (details) => {
    return new Promise((resolve, reject) => {
        try {
            pool.query(`INSERT INTO public."rawblocks" ( hash, size, block_index, time, prev_block, next_block) VALUES ($1, $2, $3, $4, $5, $6)`, [details.hash, details.size, details.block_index, details.time, details.prev_block, details.next_block], (error, results) => {
                if(error) return  reject(error)
                return resolve(results)
            })

        } catch (error) {
            return reject(error)
        }
    })
}

const getBlocks = () => {
    return new Promise((resolve, reject) => {
        try {
            pool.query(`SELECT * FROM public."blocks"`, (error, result) => {
                if (error) return  reject(error);
                return resolve(result.rows);
            })
        } catch (error) {
            return reject(error)
        }
    })
}

const getBlockDetails = (block) => {
    return new Promise((resolve, reject) => {
        try {
            fetch(`${config.externalApi}/rawblock/${block}`)
                .then(response => response.json())
                .then(data => {
                    return resolve({
                        ..._.pick(data, ['size', 'block_index', 'prev_block']),
                        transactions: data.tx
                    })
                })
                .catch(error => {
                    return reject(error)
                })
        }
        catch (error){
            return reject(error)
        }
    })
}

module.exports = {postBlocks, getBlocks, getBlockDetails}