import React, { useEffect, useState } from 'react'
import FormContainer from '../../../../../components/DKG_FormContainer'
import SubHeader from '../../../../../components/DKG_SubHeader'
import GeneralInfo from '../../../../../components/DKG_GeneralInfo'
import { useSelector } from 'react-redux'
import { apiCall } from '../../../../../utils/CommonFunctions'
import TableComponent from '../../../../../components/DKG_Table'
import Btn from '../../../../../components/DKG_Btn'
import { useNavigate } from 'react-router-dom'

const ViSummary = () => {
    const viGeneralInfo = useSelector(state => state.viDuty);
    const {token} = useSelector(state => state.auth);
    const [tableData, setTableData] = useState([])

    const navigate = useNavigate();

    const handleBtnClick = (record) => {
        
        navigate("/visual/inspection", {state: record})
    }

    const columns = [
        {
            title: "Heat Number",
            dataIndex: "heatNo",
            key: "heatNumber",
        },
        {
            title: "Rail ID",
            dataIndex: "railId",
            key: "railId",
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (_, record) => (
                <div>
                    <Btn text="Edit" onClick={() => handleBtnClick(record)} />
                </div>
            )
        }
    ]

    console.log("TABLE dATA: ", tableData)

    const populateData = async () => {
        console.log("POPULATE DATA CAKLLED")
        try {
            const {data} = await apiCall("GET", `/vi/getViSummary?dutyId=${viGeneralInfo.dutyId}`, token)
            setTableData(data.responseData || [])
        }
        catch(error){
        }
    }

    useEffect(() => {
        populateData();
    }, [])
  return (
    <FormContainer>
        <SubHeader title="Visual Inspection Summary" link="/" />
        <GeneralInfo data={viGeneralInfo} />

        <h1 className='font-semibold !text-md'>Rail ID and corresponding heat numbers of the data entered in the shift</h1>

        <TableComponent dataSource={tableData} columns={columns}/>
    </FormContainer>
  )
}

export default ViSummary
