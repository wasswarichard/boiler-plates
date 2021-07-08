import React, {useEffect, useState} from "react";
import TablePagination from "../TablePagination/TablePagination";
import TableHeader from "../TableHeader/TableHeader";
import TableSearch from "../TableSearch/TableSearch";
import { v4 as uuid_v4 } from "uuid";

const Table = ({headers, loader, blocks, setModalInfo}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [TableData, setTableData] = useState([]);
    const [TableDataPerPage] = useState(10);

    useEffect(() => {
        setTableData(blocks)
    }, [blocks])

    const indexOfLastBlock =  currentPage * TableDataPerPage;
    const indexOfFirstBlock = indexOfLastBlock - TableDataPerPage;
    const currentTableData =  TableData.slice(indexOfFirstBlock, indexOfLastBlock)
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const checkModal = (block) => {
        setModalInfo && setModalInfo(block)
    }

    const addTableRow = (block) => {
            let index = [];
            for (let x in block) {
                index.push(x)
            }
            return(
                <tr key={uuid_v4()} style={{cursor: 'pointer'}} onClick={() => checkModal(block)}>
                    {index.map(data => {
                        return (<td key={uuid_v4()}>{block[data]} </td>)
                    })}
                </tr>
            )
    }

    return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <TablePagination eventsPerPage={TableDataPerPage} totalEvents={TableData.length} paginate={paginate}/>
                    </div>
                    {loader}
                </div >
                <div  style={{overflow: "auto"}}>
                    <table  id="dtBasicExample" className="table table-striped table-bordered table-sm" cellSpacing="0" width="50%">
                        <TableHeader headers={headers}/>
                        <tbody>
                        <tr>
                            {headers.map(head => (<td key={uuid_v4()} className="th-sm">
                                <TableSearch search={head}/></td>))}
                        </tr>
                        {
                            currentTableData.length > 0 && currentTableData.map(result => {
                                return addTableRow(result)
                            })
                        }
                        </tbody>
                    </table>
                </div>

            </div>
    )
}
export default Table;