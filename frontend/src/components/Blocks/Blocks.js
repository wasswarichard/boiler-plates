import React, {useEffect, useState} from "react";
import useFullPageLoader from "../../hooks/useFullPageLoader/useFullPageLoader";
import config from "../../Helpers/config.json";
import axios from "axios";
import Table from "../../utilities/DataTable/Table/Table";
import store from "../../store/store";
import {AddBlocks} from "../../actions/actions"
import PreviewModal from "../PreviewModal/PreviewModal";
import useSWR from 'swr';

const Blocks = () => {
    const [blocks, setBlocks] = useState([]);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [modalInfo, setModalInfo] = useState({})
    const [show, setShow] = useState(false)

    useEffect(() => {
       modalInfo.hash && setShow(true)
    }, [modalInfo])

    const handleClose = () => {
        setShow(false)
    }

    const headers = [
        {name: "Hash", field: "hash", type: "input"},
        {name: "Height", field: "height", type:"input"},
        {name: "Time", field: "time", type: "date"},
        {name: "Block Index", field: "block_index", type: 'input'}
    ]
    useEffect(() => {
        showLoader();
        const loadBlocks = async () => {
            await axios.get(`${config.apiUrl}/blocks/v1a/blocks`)
                .then(response => {
                    hideLoader();
                    store.dispatch(AddBlocks({...response.data}))
                    setBlocks(response.data);
                }).catch(error => {
                    hideLoader();
                })
        };
        loadBlocks();
    }, []);

    return (
        <div className="main-content">
            <main>
                <Table headers={headers} loader={loader} blocks={blocks} setModalInfo={setModalInfo}/>
            </main>
            {show ? <PreviewModal show={show} modelInfo={modalInfo} handleClose={handleClose}/> : null}
        </div>
    )
}
export default Blocks;