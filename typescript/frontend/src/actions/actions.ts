import * as actions from "../actionTypes/actionTypes";
export const AddBlocks = (description: any) => ({
    type: actions.BLOCKS_LOADED,
    payload : description
})

export const addBlockDetails = (description: any) => ({
    type: actions.BLOCK_DETAILS_LOADED,
    payload: description
})

export const addBlockTransactions = (description: any) => ({
    type: actions.BLOCK_TRANSACTIONS_LOADED,
    payload: description
})