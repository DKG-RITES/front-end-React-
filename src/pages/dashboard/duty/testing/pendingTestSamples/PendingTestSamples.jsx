import React, { useEffect, useState } from 'react'
import FormContainer from '../../../../../components/DKG_FormContainer'
import SubHeader from '../../../../../components/DKG_SubHeader'
import GeneralInfo from '../../../../../components/DKG_GeneralInfo'
import data from '../../../../../utils/frontSharedData/Testing/Testing.json'
import FormBody from '../../../../../components/DKG_FormBody'
import { FilterFilled, ReloadOutlined } from '@ant-design/icons';
import FormDropdownItem from '../../../../../components/DKG_FormDropdownItem'
import { Checkbox, Divider, Select, Table, Form, Button, Space, Tooltip } from 'antd'
import Search from "../../../../../components/DKG_Search"
import Btn from '../../../../../components/DKG_Btn';
import { useNavigate } from "react-router-dom";
import { apiCall } from '../../../../../utils/CommonFunctions'
import { useSelector } from 'react-redux'
import { testStatusDropdown } from '../../../../../utils/Constants'
import ChemicalTest from './ChemicalTest'
import HardnessTest from './HardnessTest';

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
    const {token} = useSelector(state => state.auth)

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
        render: (value) => (value && value.toString().trim()) ? value : <span className="text-gray-500">N/A</span>
    },
    {
        title: "Strand",
        dataIndex: "strand",
        render: (value) => (value && value.toString().trim()) ? value : <span className="text-gray-500">N/A</span>
    },
    {
        title: "Mill",
        dataIndex: "mill",
        render: (value) => (value && value.toString().trim()) ? value : <span className="text-gray-500">N/A</span>
    },
    {
        title: "Grade",
        dataIndex: "railGrade",
        render: (value) => (value && value.toString().trim()) ? value : <span className="text-gray-500">N/A</span>
    },
    {
        title: "Sample Type",
        dataIndex: "sampleType",
        key: "sampleType",
        align: "center",
        render: (value) => (value && value.toString().trim()) ? value : <span className="text-gray-500">N/A</span>
    },
    {
        title: "Lot",
        dataIndex: "sampleLot",
        render: (value) => (value && value.toString().trim()) ? value : <span className="text-gray-500">N/A</span>
    },
    {
        title: "BSP Sample ID",
        dataIndex: "sampleId",
        render: (value) => (value && value.toString().trim()) ? value : <span className="text-gray-500">N/A</span>
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
        align: "center",
        render: (testsMarked) => {
            if (!testsMarked || !testsMarked.toString().trim()) {
                return <span className="text-gray-500">N/A</span>;
            }
            return testsMarked;
        }
    },
    {
        title: "Action",
        key: "action",
        align: "center",
        render: (_, record) => {
            console.log("Record data:", record);
            console.log("Tests marked:", record.testsMarked);
            const tests = record.testsMarked?.split(',').map(test => test.trim()).filter(test => test && test.length > 0) || [];
            console.log("Parsed tests:", tests);

            // If no tests are available, display N/A
            if (!tests || tests.length === 0 || !record.testsMarked || !record.testsMarked.toString().trim()) {
                return (
                    <div className='flex justify-center items-center text-gray-500'>
                        N/A
                    </div>
                );
            }

            return (
                <div className='flex flex-col gap-2'>
                    {tests?.map((test, index) => {
                        let path = '';
                        let buttonText = '';

                        // Clean up the test name for better matching
                        const cleanTest = test.trim();
                        console.log("Processing test:", cleanTest);

                        // Comprehensive test name mapping with case-insensitive matching
                        const lowerTest = cleanTest.toLowerCase();

                        if (lowerTest.includes('chemical')) {
                            path = '/testing/chemical';
                            buttonText = 'Test for Chemical';
                        } else if (lowerTest.includes('n2') || lowerTest.includes('nitrogen')) {
                            path = '/testing/n2';
                            buttonText = 'Test for N2';
                        } else if (lowerTest.includes('fwt')) {
                            path = '/testing/fwt';
                            buttonText = `Test for ${cleanTest}`;
                        } else if (lowerTest.includes('mechanical')) {
                            path = '/testing/mechanical';
                            buttonText = 'Test for Mechanical';
                        } else if ((lowerTest.includes('sp') && !lowerTest.includes('bsp')) || lowerTest === 'sp') {
                            path = '/testing/sp';
                            buttonText = 'Test for SP';
                        } else if (lowerTest.includes('ir') || lowerTest.includes('inclusion rating')) {
                            path = '/testing/ir';
                            buttonText = 'Test for IR';
                        } else if (lowerTest.includes('o2') || lowerTest.includes('oxygen')) {
                            path = '/testing/o2';
                            buttonText = 'Test for O2';
                        } else if (lowerTest.includes('tensile foot') || lowerTest.includes('tensilef')) {
                            path = '/testing/tensilefoot';
                            buttonText = 'Test for Tensile Foot';
                        } else if (lowerTest.includes('micro') || lowerTest.includes('microstructure')) {
                            path = '/testing/micro';
                            buttonText = 'Test for Micro';
                        } else if (lowerTest.includes('decarb') || lowerTest.includes('decarburization') || lowerTest.includes('deca')) {
                            path = '/testing/decarb';
                            buttonText = 'Test for Decarb';
                        } else if (lowerTest.includes('rsh') || lowerTest.includes('residual stress')) {
                            path = '/testing/rsh';
                            buttonText = 'Test for RSH';
                        } else if (lowerTest.includes('ph') || lowerTest.includes('phosphorus')) {
                            path = '/testing/ph';
                            buttonText = 'Test for PH';
                        } else if (lowerTest.includes('tensile') && !lowerTest.includes('foot')) {
                            path = '/testing/tensile';
                            buttonText = 'Test for Tensile';
                        } else if (lowerTest.includes('hardness') || lowerTest.includes('hb')) {
                            path = '/testing/hardness';
                            buttonText = 'Test for Hardness';
                        } else if (lowerTest.includes('sulphur') || lowerTest.includes('sulfur') || lowerTest.includes('s ')) {
                            path = '/testing/chemical';
                            buttonText = 'Test for Sulphur';
                        } else if (lowerTest.includes('macro') || lowerTest.includes('macrostructure')) {
                            path = '/testing/macro';
                            buttonText = 'Test for Macro';
                        } else {
                            console.warn("Unmatched test name:", cleanTest);
                            // Still create a button with generic mapping
                            path = '/testing/chemical'; // Default fallback
                            buttonText = `Test for ${cleanTest}`;
                        }

                        return (
                            <Button
                                key={index}
                                onClick={() => navigate(path, {
                                    state: {
                                        heatNo: record.heatNo,
                                        strand: record.strand,
                                        sampleId: record.sampleId,
                                        sampleLot: record.sampleLot,
                                        sampleType: record.sampleType,
                                        testName: cleanTest,
                                        testType: cleanTest.toUpperCase()
                                    }
                                })}
                            >
                                {buttonText}
                            </Button>
                        );
                    })}
                </div>
            );
        }
    }
];

    const testingGeneralInfo = useSelector((state) => state.testingDuty);

    const populateData = async ()  => {
        try{
            const {data}  = await apiCall("GET", "/testing/getPendingTestDtls", token)
            console.log("Pending Test Samples API Response:", data.responseData);
            setTableData(data.responseData || []);
        }
        catch(error){
            console.error("Error fetching pending test samples:", error);
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

