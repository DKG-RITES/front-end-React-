import React, { useEffect, useState } from 'react'
import FormContainer from '../../../../../components/DKG_FormContainer';
import SubHeader from '../../../../../components/DKG_SubHeader';
import GeneralInfo from '../../../../../components/DKG_GeneralInfo';
import data from "../../../../../utils/frontSharedData/qct/qct.json";
import FormBody from '../../../../../components/DKG_FormBody';
import { useNavigate } from 'react-router-dom';
import FormDropdownItem from '../../../../../components/DKG_FormDropdownItem';
import { Table, Divider, Form, Button } from 'antd';
import Btn from '../../../../../components/DKG_Btn';
import { FilterFilled, CloseCircleOutlined } from "@ant-design/icons";
import { apiCall } from '../../../../../utils/CommonFunctions';
import { useSelector } from 'react-redux';
import TableComponent from '../../../../../components/DKG_Table';
import FormInputItem from '../../../../../components/DKG_FormInputItem';
// Removed endQctDuty import - no longer needed

const { millDropdownList, railSectionList, railGradeList, qctList, sampleDeclarationColumns, sampleDeclarationData } = data;

const columns = [
  {
    title: "S No.",
    dataIndex: "sNo",
    render: (_, __, index) => index+1,
  },
  {
    title: "QCT",
    dataIndex: "qctType",
    filterable: true
  },
  {
    title: "Mill",
    dataIndex: "mill",
    filterable: true
  },

  {
    title: "Rail Grade and Rail Section",
    dataIndex: "rg",
    render: (_, row) => row.railGrade + " , " + row.railSection,
    filterable: true
  },
  {
    title: "Sample Month",
    dataIndex: "sampleMonth",
    filterable: true
  },
  {
    title: "No. Of Samples",
    dataIndex: "sampleCount",
    filterable: true
  },
]

const QctSampleList = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({shiftRemarks: null})
  const [tableData, setTableData] = useState([]);
  const [clbList, setClbLst] = useState([]);
  const [filteredQctList, setFilteredQctList] = useState([]);
  const [instrumentCategoryList, setInstrumentCategoryList] = useState([]);
  const [instrumentList, setInstrumentList] = useState([]);
  const [qList, setQList] = useState([]);

  const [filters, setFilters] = useState({
    mill: null,
    railSection: null,
    railGrade: null,
    qct: null
  });

  const [form] = Form.useForm();

  const handleChange = (fieldName, value) => {
    setFormData(prev => {
      return {
        ...prev,
        [fieldName]: value
      }
    })
  }

  const handleFinish = () => {
    let updatedQctList = [];

    if (filters.mill) {
      updatedQctList = qList.filter(
        (record) => record.mill === filters.mill
      );
    }

    if (filters.railSection) {
      updatedQctList = updatedQctList.filter(
        (record) => record.railSection === filters.railSection
      );
    }

    if (filters.railGrade) {
      updatedQctList = updatedQctList.filter(
        (record) => record.railGrade === filters.railGrade
      );
    }

    if (filters.qct) {
      updatedQctList = updatedQctList.filter(
        (record) => record.qct === filters.qct
      );
    }
  
    setFilteredQctList(updatedQctList);
  };

  console.log("Tabledata: ", tableData)

  const handleClick = () => {
    navigate('/qct/newSampleDeclaration')
  }

  const {token} = useSelector(state => state.auth)
  const {dutyId} = useSelector(state => state.qctDuty)
  // Use dummy duty ID if no actual duty is started
  const qctGeneralInfo = {
    date: new Date().toLocaleDateString('en-GB'),
    shift: 'A', // Default shift
    dutyId: dutyId || 'QCT_DUMMY_DUTY_001' // Use dummy duty ID when no actual duty
  }

  const populateData = async () => {
    try {
      const {data} = await apiCall("GET", "/qct/getPendingTestSummary", token)
      setTableData(data?.responseData || [])
    }
    catch(error){

    }
  }

  // Remove end duty functionality - not needed anymore
  // const dispatch = useDispatch();
  // const handleFormSubmit = async () => {
  //     await dispatch(endQctDuty(formData)).unwrap();
  //     navigate('/')
  //   }

  useEffect(() => {
    populateData();
  }, [])



  return (
    <FormContainer>
      <SubHeader title='QCT - Sample List' link='/' />
      <GeneralInfo data={qctGeneralInfo} />

      {/* <FormBody initialValues={formData}> */}
        {/* <div className='grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-x-4'>
          <div className='flex items-center gap-x-2'>
            <FilterFilled />
            <FormDropdownItem label='Mill' name='mill' dropdownArray={millDropdownList} valueField='key' visibleField='value' onChange={handleChange} className='w-full' />
          </div>

          <div className='flex items-center gap-x-2'>
            <FilterFilled />         
            <FormDropdownItem label ='Rail Section' name='railSection' dropdownArray={railSectionList} valueField='key' visibleField='value' onChange = {handleChange} className='w-full' />
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-x-4'>
          <div className='flex items-center gap-x-2'>
            <FilterFilled />
            <FormDropdownItem label='Rail Grade' name='railGrade' dropdownArray={railGradeList} valueField='key' visibleField='value' onChange={handleChange} className='w-full' />
          </div>

          <div className='flex items-center gap-x-2'>
            <FilterFilled />          
            <FormDropdownItem label ='QCT' name='qct' dropdownArray={qctList} valueField='key' visibleField='value' onChange = {handleChange} className='w-full' />
          </div>
        </div> */}
        <Form
          initialValues={filters}
          form={form}
          layout="vertical"
          onFinish={handleFinish}
        >
          <div className="grid grid-cols-2 gap-x-4">
            <FormDropdownItem
              label="Mill"
              name="mill"
              formField="mill"
              dropdownArray={millDropdownList}
              valueField="key"
              visibleField="value"
              onChange={(fieldName, value) =>
                handleChange(fieldName, value, setFilters)
              }
              className="w-full"
            />
            <FormDropdownItem
              label="Rail Section"
              name="railSection"
              formField="railSection"
              dropdownArray={railSectionList}
              visibleField="value"
              valueField="key"
              onChange={(fieldName, value) =>
                handleChange(fieldName, value, setFilters)
              }
              className="w-full"
            />
            <FormDropdownItem
              label="Rail Grade"
              name="railGrade"
              formField="railGrade"
              dropdownArray={railGradeList}
              visibleField="value"
              valueField="key"
              onChange={(fieldName, value) =>
                handleChange(fieldName, value, setFilters)
              }
              className="w-full"
            />
            <FormDropdownItem
              label="QCT"
              name="qct"
              formField="qct"
              dropdownArray={qctList}
              valueField="key"
              visibleField="value"
              onChange={(fieldName, value) =>
                handleChange(fieldName, value, setFilters)
              }
              className="w-full"
            />

            <Btn htmlType="submit" text="Search" className="w-full" />
            <Button
              className="flex gap-2 items-center border-darkBlue text-darkBlue"
              onClick={() => window.location.reload()}
            >
              <span>
                <CloseCircleOutlined />
              </span>
              <span>Reset</span>
            </Button>
          </div>
        </Form>

        <Divider className=''>Samples Declared Pending for Testing</Divider>

        <TableComponent
          hideExport
          hideManageColumns
          dataSource={tableData} 
          columns={columns} 
          scroll={{ x: true }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30"],
          }}
        />

        <div className='flex justify-center mt-4'>
          <Btn onClick={handleClick}>Declare New Sample for Testing</Btn>
        </div>
        <div className="mb-8"></div> {/* Add this for extra space after the button */}
      {/* </FormBody> */}

      
    </FormContainer>
  )
}

export default QctSampleList