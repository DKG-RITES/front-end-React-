import React, { useState } from "react";
import SubHeader from "../../../../../components/DKG_SubHeader";
import FormContainer from "../../../../../components/DKG_FormContainer";
import GeneralInfo from "../../../../../components/DKG_GeneralInfo";
import data from "../../../../../utils/frontSharedData/VisualInspection/VI.json";
import { Divider, Table } from 'antd';
import FormBody from "../../../../../components/DKG_FormBody";
import Btn from "../../../../../components/DKG_Btn";
import { useNavigate } from 'react-router-dom'
import FilterTable from "../../../../../components/DKG_FilterTable";
import FormDropdownItem from "../../../../../components/DKG_FormDropdownItem";
import { FilterFilled } from "@ant-design/icons";

const { acceptanceData: sampleData, rejectionData: sampleDataSec, compiledData, defectAnalysisData, lineNumberList, acceptanceColumns, rejectionColumns, compiledColumns, defectColumns, visualInspectionGeneralInfo, summaryList } = data;

const VIShiftSummary = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    lineNumber: '', summary: ''
  })

  const handleChange = (fieldName, value) => {
    setFormData(prev=>{
      return {
        ...prev,
        [fieldName]: value
      }
    })
  }

  const handleClick = () => {
    navigate('/visual/home')
  }

  return (
    <FormContainer>
        <SubHeader title="Visual Inspection - Shift Summary" link="/visual/home" />
        <GeneralInfo data={visualInspectionGeneralInfo} />

        <FormBody initialValues={formData}>
            <div className='grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-x-4'>
                <div className='flex items-center gap-x-2'>
                    <FilterFilled />
                    <FormDropdownItem label='Line Number' name='lineNumber' dropdownArray={lineNumberList} valueField={'key'} visibleField={'value'} onChange={handleChange} className='w-full' />
                </div>

                <div className='flex items-center gap-x-2'>
                    <FormDropdownItem label='Summary' name='summary' dropdownArray={summaryList} valueField={'key'} visibleField={'value'} onChange={handleChange} className='w-full' />
                </div>
            </div>
        </FormBody>

        {formData.summary === 'Acceptance Summary' && (
            <>
                <Divider>Length Wise Acceptance Summary</Divider>

                <Table
                    dataSource={sampleData}
                    columns={acceptanceColumns}
                    scroll={{ x: true }}
                    bordered
                    pagination={{
                    pageSize: 8,
                    showSizeChanger: true,
                    pageSizeOptions: ["8", "16", "32"],
                    }}
                />

                <Divider>Rejection Summary</Divider>

                <Table
                    dataSource={sampleDataSec}
                    columns={rejectionColumns}
                    scroll={{ x: true }}
                    bordered
                    pagination={{
                    pageSize: 5,
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "20"],
                    }}
                />

                <Divider>Compiled Summary</Divider>

                <Table
                    dataSource={compiledData}
                    columns={compiledColumns}
                    scroll={{ x: true }}
                    bordered
                    pagination={{
                    pageSize: 5,
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "20"],
                    }}
                />

                <div className='flex justify-center mt-4'>
                    <Btn onClick={handleClick} className='w-[25%]'>Go Home</Btn>
                </div>
            </>
        )}

        {formData.summary === 'Defect Analysis Summary' && (
            <>
                <Divider>Defect Analysis Summary</Divider>

                <Table 
                    dataSource={defectAnalysisData} 
                    columns={defectColumns} 
                    bordered
                    pagination={{
                    pageSize: 5,
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "20"],
                    }}
                />

                <div className='flex justify-center mt-4'>
                    <Btn htmlType='submit' onClick={handleClick} className='w-[25%]'>Go Home</Btn>
                </div>
            </>
        )}

        {formData.summary === 'Inspected Railwise Summary' && (
            <>
                <FilterTable />

                <div className='flex justify-center mt-4'>
                    <Btn htmlType='submit' onClick={handleClick} className='w-[25%]'>Go Home</Btn>
                </div>
            </>
        )}
    </FormContainer>
  )
}

export default VIShiftSummary