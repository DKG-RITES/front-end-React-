import React, { useEffect, useState } from 'react'
import FormContainer from '../../../../../../components/DKG_FormContainer'
import SubHeader from '../../../../../../components/DKG_SubHeader'
import data from "../../../../../../utils/frontSharedData/testSampleDec/testSampleDec.json"
import GeneralInfo from '../../../../../../components/DKG_GeneralInfo';
import { Divider, Table, message } from 'antd';
import IconBtn from '../../../../../../components/DKG_IconBtn';
import Btn from '../../../../../../components/DKG_Btn';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons';
import { apiCall } from '../../../../../../utils/CommonFunctions';
import { useSelector } from 'react-redux';

const { testSampleTableData } = data;

const TestSampleList = () => {
  const [currentTablePage, setCurrentTablePage] = useState(1);
  const [tablePageSize, setTablePageSize] = useState(5);
  const navigate = useNavigate();

  const handleRowClick = (heatNo) => {
    message.success(heatNo);
  };

  const location = useLocation();
  const {state} = location;

  console.log("Stateee: ", location.state);


  const handleClick = () => {
    navigate('/stage/newTestSampleDeclaration', {state: {module: state?.module, dutyId: state?.dutyId, generalInfo: state?.generalInfo}});
  }

  const handlePageSizeChange = (value) => {
     setTablePageSize(value);
     setCurrentTablePage(1);
  };

  const columns = [
    {
      title: "S/No",
      dataIndex: "sNo",
      key: "sNo",
      render: (_, __, index) => index+1
    },
    {
      title: "Heat No.",
      dataIndex: "heatNumber",
      key: "heatNo",
    },
    {
      title: "Timing",
      dataIndex: "createdAt",
      key: "timing",
      render: (epoch) => new Date(epoch*1000)?.toLocaleString() || ""
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    // {
    //   title: "Edit",
    //   fixed: "right",
    //   render: (_, record) => (
    //     <IconBtn
    //       icon={EditOutlined}
    //       onClick={() => handleRowClick(record.heatNo)}
    //     />
    //   ),
    // },
  ];

  const [testSampleTableData, setTestSampleTableData] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    populateData();
  }, [])
  
  if(!state || !state.dutyId){
    message.error("Reach the page from an ongoing duty in a module.")
    return <Navigate to="/" />
  }



  const populateData = async () => {
    try{
      const {data} = await apiCall("GET", "/rolling/getAllTestSamples", token)
      setTestSampleTableData(data?.responseData || [])
    }
    catch(erorr){
      message.error("Error fetchng data.")
    }
  }

  return (
    <FormContainer>
      <SubHeader title='Test Sample - Declaration' link={state?.redirectTo} />
      <GeneralInfo data={state?.generalInfo} />

      <Divider>Rail Test Sample Record</Divider>

      <Table
        columns={columns}
        dataSource={testSampleTableData}
        scroll={{ x: true }}
        pagination={{
          current: currentTablePage,
          pageSize: tablePageSize,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20"],
          onChange: (page) => setCurrentTablePage(page),
          onShowSizeChange: (current, size) => handlePageSizeChange(size),
        }}
      />

      <div className='flex justify-center mt-4'>
        <Btn onClick={handleClick}>Add Test Sample Declaration</Btn>
      </div>
    </FormContainer>
  )
}

export default TestSampleList