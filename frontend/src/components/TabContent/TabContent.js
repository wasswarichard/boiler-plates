import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from "../../utilities/DataTable/Table/Table";
import store from "../../store/store";
import axios from "axios";
import config from "../../Helpers/config.json";
import {addBlockDetails, addBlockTransactions} from "../../actions/actions";
import useFullPageLoader from "../../hooks/useFullPageLoader/useFullPageLoader";
import _ from "underscore"

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function TabContent({modelInfo}) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [blockDetails, setBlockDetails] = useState({});
    const [blockTransactions, setBlockTransactions] = useState([]);
    const [loader, showLoader, hideLoader] = useFullPageLoader();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const headers = [
        {name: "Hash", field: "hash", type: "input"},
        {name: "Height", field: "height", type:"input"},
        {name: "Time", field: "time", type: "date"},
        {name: "Block Index", field: "block_index", type: 'input'}
    ]

    useEffect(() => {
        showLoader();
        const loadBlocks = async () => {
            await axios.get(`${config.apiUrl}/blocks/v1a/blocks/${modelInfo.hash}`)
                .then(response => {
                    hideLoader();
                    store.dispatch(addBlockDetails({
                        ..._.pick(response.data, ['size', 'block_index', 'prev_block'])
                    }));
                    store.dispatch(addBlockTransactions({
                        ..._.pick(response.data, ['transactions'])
                    }))
                    setBlockDetails({..._.pick(response.data, ['size', 'block_index', 'prev_block'])})
                    setBlockTransactions(response.data.transactions)
                }).catch(error => {
                    hideLoader();
                })
        };
        loadBlocks();
    }, []);

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{ backgroundColor: '#1b4053' }}>
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Block Details" {...a11yProps(0)} />
                    <Tab label="Transactions" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                {loader}
                {
                    blockDetails.size && (
                        <div>
                            <div><span> Previous Block : {blockDetails.prev_block} </span></div>
                            <div><span> Block Index: {blockDetails.block_index}</span></div>
                            <div><span> Block Size: {blockDetails.size}</span></div>
                        </div>
                    )
                }
            </TabPanel>
            <TabPanel value={value} index={1}>
                {/*<Table headers={headers} loader={loader} blocks={blockTransactions}/>*/}
            </TabPanel>
        </div>
    );
}
