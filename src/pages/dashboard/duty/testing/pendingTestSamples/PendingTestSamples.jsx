import React, { useEffect, useState } from 'react'
import FormContainer from '../../../../../components/DKG_FormContainer'
import SubHeader from '../../../../../components/DKG_SubHeader'
import GeneralInfo from '../../../../../components/DKG_GeneralInfo'
import data from '../../../../../utils/frontSharedData/Testing/Testing.json'
import FormBody from '../../../../../components/DKG_FormBody'
import { FilterFilled } from '@ant-design/icons';
import FormDropdownItem from '../../../../../components/DKG_FormDropdownItem'
import { Checkbox, Divider, Select, Table, Form } from 'antd'
import Search from "../../../../../components/DKG_Search"
import Btn from '../../../../../components/DKG_Btn';
import { useNavigate } from "react-router-dom";
import { apiCall } from '../../../../../utils/CommonFunctions'
import { useSelector } from 'react-redux'
import { testStatusDropdown } from '../../../../../utils/Constants'
import ChemicalTest from './ChemicalTest'
import HardnessTest from './HardnessTest'
import { Button } from 'antd';

const { pendingTestSamplesData: sampleData, testingGeneralInfo, railGradeList, testCategoryList, millList } = data;


const checkBoxItems = [
    { "key": 1, "value": "Regular" },
    { "key": 2, "value": "USB" },
    { "key": 3, "value": "LOB" }
]

const checkBoxItemsSec = [
    { "key": 1, "value": "Accepting Test" },
    { "key": 2, "value": "Retest" }
]

const PendingTestSamples = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        mill: '', railGrade: '', testCategory: ''
    })
    const [tableData, setTableData] = useState([])
    const [checkedValues, setCheckedValues] = useState([])
    const [checkedValuesSec, setCheckedValuesSec] = useState([])

    const handleChange = (fieldName, value) => {
        setFormData(prev => {
          return {
            ...prev,
            [fieldName]: value
          }
        })
    }

    const handleClick = () => {
        navigate('/testing/home')
    };

    const saveRecord = () => {
        
    }


const pendingTestSamplesColumns = [
    {
        title: "S. No.",
        dataIndex: "serialNumber",
        fixed: "left",
        render: (_, __, index) => index +1
    },
    {
        title: "Heat No.",
        dataIndex: "heatNo",
        key: "heatNo",
        fixed: "left",
    },
    {
        title: "Strand",
        dataIndex: "strand",
    },
    {
        title: "Mill",
        dataIndex: "mill",
    },
    {
        title: "Grade",
        dataIndex: "railGrade",
    },
    {
        title: "Sample Type",
        dataIndex: "sampleType",
        key: "sampleType",
        align: "center"
    },
    {
        title: "Lot",
        dataIndex: "sampleLot",
    },
    {
        title: "BSP Sample ID",
        dataIndex: "sampleID",
    },
    {
        title: "App Sample Identification",
        dataIndex: "sampleIdentification",
        key: "sampleIdentification",
        align: "center",
        render: () => "N/A"
    },
    {
        title: "Test",
        dataIndex: "testsMarked",
        key: "test",
        align: "center"
    },
    {
        title: "Action",
        key: "action",
        align: "center",
        render: (_, record) => {
            const tests = record.testsMarked?.split(',').map(test => test.trim()) || [];
            
            return (
                <div className='flex flex-col gap-2'>
                    {tests?.map((test, index) => {
                        let path = '';
                        switch(test) {
                            case 'Chemical':
                                path = '/testing/chemical';
                                break;
                            case 'N2':
                                path = '/testing/n2';
                                break;
                            case 'FWT ST':
                            case 'FWT HS':
                            case 'FWT ST SR':
                                path = '/testing/fwt';
                                break;
                            case 'Mechanical':
                                path = '/testing/mechanical';
                                break;
                            case 'SP':
                                path = '/testing/sp';
                                break;
                            case 'IR':
                                path = '/testing/ir';
                                break;
                            case 'O2':
                                path = '/testing/o2';
                                break;
                            case 'Tensile Foot':
                                path = '/testing/tensilefoot';
                                break;
                            case 'Micro':
                                path = '/testing/micro';
                                break;
                            case 'Decarb':
                                path = '/testing/decarb';
                                break;
                            case 'RSH':
                                path = '/testing/rsh';
                                break;
                            case 'PH':
                                path = '/testing/ph';
                                break;
                            case 'Tensile':
                                path = '/testing/tensile';
                                break;
                            default:
                                return null;
                        }
                        return (
                            <Button 
                                key={index}
                                onClick={() => navigate(path, { 
                                    state: { 
                                        heatNo: record.heatNo,
                                        strand: record.strand,
                                        sampleId: record.sampleID,
                                        sampleLot: record.sampleLot,
                                        sampleType: record.sampleType
                                    }
                                })}

                                // onClick={saveRecord()}
                            >
                                {"Test for " + test}
                            </Button>
                        );
                    })}
                </div>
            );
        }
    }
];

    const {token}  = useSelector((state) => state.auth);
    const testingGeneralInfo = useSelector((state) => state.testingDuty);
    const populateData = async ()  => {
        try{
            const {data}  = await apiCall("GET", "/testing/getPendingTestDtls", token)
            setTableData(data.responseData || []);

        }
        catch(error){
        }
    }

    const [form] = Form.useForm();

    useEffect(() =>{
        populateData();
    }, [])

  return (
    <FormContainer>
        <SubHeader title="Pending Test Samples" link="/testing/home" />
        <GeneralInfo data={testingGeneralInfo} />

        {/* <FormBody initialValues={formData}>
            <div className='grid grid-cols-1 md:grid-cols-3 sm:grid-cols-3 gap-x-4'>
                <div className='flex items-center gap-x-2'>
                    <FilterFilled />
                    <FormDropdownItem label='Rail Grade' name='railGrade' dropdownArray={railGradeList} valueField='key' visibleField='value' onChange={handleChange} className='w-full' />
                </div>

                <div className='flex items-center gap-x-2'>
                    <FilterFilled />         
                    <FormDropdownItem label ='Test Category' name='testCategory' dropdownArray={testCategoryList} valueField='key' visibleField='value' onChange = {handleChange} className='w-full' />
                </div>

                <div className='flex items-center gap-x-2'>
                    <Checkbox.Group
                        options={checkBoxItems.map(item => ({key: item.key, label: item.value, value: item.key }))}
                        value={checkedValues}
                        onChange={(checkedValues) => setCheckedValues(checkedValues)}
                        className='mb-6 sm:mb-0'
                    />
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 sm:grid-cols-3 gap-x-4'>
                <div className='flex items-center gap-x-2'>
                    <FilterFilled />
                    <FormDropdownItem label='Mill' name='mill' dropdownArray={millList} valueField='key' visibleField='value' onChange={handleChange} className='w-full' />
                </div>

                <div className='flex justify-center items-center mb-6 sm:mb-0'>
                    <Search placeholder='Search by S. No.' />
                </div>

                <div className='flex items-center gap-x-2'>
                    <Checkbox.Group
                        options={checkBoxItemsSec.map(item => ({key: item.key, label: item.value, value: item.key }))}
                        value={checkedValuesSec}
                        onChange={(checkedValuesSec) => setCheckedValuesSec(checkedValuesSec)}
                        className='mb-6 sm:mb-0'
                    />
                </div>
            </div>

            <Divider className='mt-0 mb-6' /> */}

            <Table
                dataSource={tableData}
                columns={pendingTestSamplesColumns}
                scroll={{ x: true }}
                bordered
                pagination={{
                pageSize: 5,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "20"],
                }}
            />

            <div className='flex justify-center'>
                <Btn onClick={handleClick}>OK</Btn>
            </div>
        {/* </FormBody> */}

    </FormContainer>
  )
}

export default PendingTestSamples

