import React, { useState, useEffect, useCallback } from "react";
import SubHeader from "../../../../../components/DKG_SubHeader";
import FormContainer from "../../../../../components/DKG_FormContainer";
import GeneralInfo from "../../../../../components/DKG_GeneralInfo";
import data from "../../../../../utils/frontSharedData/VisualInspection/VI.json";
import { Divider, Table, Spin, Alert, Badge } from 'antd';
import FormBody from "../../../../../components/DKG_FormBody";
import Btn from "../../../../../components/DKG_Btn";
import { useNavigate } from 'react-router-dom'
import FilterTable from "../../../../../components/DKG_FilterTable";
import FormDropdownItem from "../../../../../components/DKG_FormDropdownItem";
import { FilterFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { apiCall } from "../../../../../utils/CommonFunctions";

const { acceptanceData: sampleData, rejectionData: sampleDataSec, compiledData, defectAnalysisData, lineNumberList, acceptanceColumns, rejectionColumns, compiledColumns, defectColumns, visualInspectionGeneralInfo, summaryList } = data;

const VIShiftSummary = () => {
  const navigate = useNavigate();
  const viGeneralInfo = useSelector(state => state.viDuty);
  const { token } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    lineNumber: '', summary: ''
  });

  // Data states
  const [loading, setLoading] = useState(false);
  const [acceptanceData, setAcceptanceData] = useState([]);
  const [rejectionData, setRejectionData] = useState([]);
  const [compiledData, setCompiledData] = useState([]);
  const [defectAnalysisData, setDefectAnalysisData] = useState([]);

  const handleChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleClick = () => {
    navigate('/visual/home');
  };

  // Use existing API and process data to create summaries
  const fetchViData = async () => {
    try {
      const { data } = await apiCall(
        "GET",
        `/vi/getViSummary?dutyId=${viGeneralInfo.dutyId}`,
        token
      );
      return data?.responseData || [];
    } catch (error) {
      console.error("Error fetching VI data:", error);
      return [];
    }
  };

  // Process raw VI data to create acceptance summary
  const processAcceptanceSummary = (rawData) => {
    const filtered = formData.lineNumber ?
      rawData.filter(item => item.lineNumber === formData.lineNumber) :
      rawData;

    // Group by accepted lengths and create summary
    const lengthGroups = {};
    filtered.forEach(item => {
      if (item.acptDataList && item.acptDataList.length > 0) {
        item.acptDataList.forEach(acpt => {
          const length = acpt.acceptedLength || 0;
          if (!lengthGroups[length]) {
            lengthGroups[length] = { length, count: 0, totalLength: 0 };
          }
          lengthGroups[length].count += 1;
          lengthGroups[length].totalLength += parseFloat(length) || 0;
        });
      }
    });

    return Object.values(lengthGroups);
  };

  // Process raw VI data to create rejection summary
  const processRejectionSummary = (rawData) => {
    const filtered = formData.lineNumber ?
      rawData.filter(item => item.lineNumber === formData.lineNumber) :
      rawData;

    const rejectionGroups = {};
    filtered.forEach(item => {
      if (item.defectDataList && item.defectDataList.length > 0) {
        item.defectDataList.forEach(defect => {
          const type = defect.defectType || 'Unknown';
          if (!rejectionGroups[type]) {
            rejectionGroups[type] = { defectType: type, count: 0, totalLength: 0 };
          }
          rejectionGroups[type].count += 1;
          rejectionGroups[type].totalLength += parseFloat(defect.rejectedLength) || 0;
        });
      }
    });

    return Object.values(rejectionGroups);
  };

  // Process raw VI data to create defect analysis
  const processDefectAnalysis = (rawData) => {
    const filtered = formData.lineNumber ?
      rawData.filter(item => item.lineNumber === formData.lineNumber) :
      rawData;

    const defectAnalysis = {};
    filtered.forEach(item => {
      if (item.defectDataList && item.defectDataList.length > 0) {
        item.defectDataList.forEach(defect => {
          const type = defect.defectType || 'Unknown';
          const category = defect.defectCategory || 'Others';

          if (!defectAnalysis[category]) {
            defectAnalysis[category] = {};
          }
          if (!defectAnalysis[category][type]) {
            defectAnalysis[category][type] = {
              defectCategory: category,
              defectType: type,
              count: 0,
              percentage: 0
            };
          }
          defectAnalysis[category][type].count += 1;
        });
      }
    });

    // Flatten and calculate percentages
    const result = [];
    const totalDefects = Object.values(defectAnalysis).reduce((total, category) =>
      total + Object.values(category).reduce((catTotal, defect) => catTotal + defect.count, 0), 0
    );

    Object.values(defectAnalysis).forEach(category => {
      Object.values(category).forEach(defect => {
        defect.percentage = totalDefects > 0 ? ((defect.count / totalDefects) * 100).toFixed(2) : 0;
        result.push(defect);
      });
    });

    return result;
  };

  // Main function to fetch all data
  const fetchAllData = useCallback(async () => {
    if (!viGeneralInfo.dutyId || !token) return;

    setLoading(true);
    try {
      // Fetch raw VI data using existing API
      const rawData = await fetchViData();

      // Process data to create different summaries
      const acceptance = processAcceptanceSummary(rawData);
      const rejection = processRejectionSummary(rawData);
      const defectAnalysis = processDefectAnalysis(rawData);

      // Create compiled summary from acceptance and rejection data
      const compiled = [
        {
          key: 'total_inspected',
          description: 'Total Rails Inspected',
          count: rawData.length,
          percentage: '100.00'
        },
        {
          key: 'total_accepted',
          description: 'Total Accepted',
          count: acceptance.reduce((sum, item) => sum + item.count, 0),
          percentage: rawData.length > 0 ? ((acceptance.reduce((sum, item) => sum + item.count, 0) / rawData.length) * 100).toFixed(2) : '0.00'
        },
        {
          key: 'total_rejected',
          description: 'Total Rejected',
          count: rejection.reduce((sum, item) => sum + item.count, 0),
          percentage: rawData.length > 0 ? ((rejection.reduce((sum, item) => sum + item.count, 0) / rawData.length) * 100).toFixed(2) : '0.00'
        }
      ];

      setAcceptanceData(acceptance);
      setRejectionData(rejection);
      setCompiledData(compiled);
      setDefectAnalysisData(defectAnalysis);

      console.log("Data updated:", {
        acceptance: acceptance.length,
        rejection: rejection.length,
        compiled: compiled.length,
        defectAnalysis: defectAnalysis.length
      });
    } catch (error) {
      console.error("Error fetching all data:", error);
    } finally {
      setLoading(false);
    }
  }, [viGeneralInfo.dutyId, token, formData.lineNumber, formData.summary]);

  // Initial data fetch and when filters change
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  return (
    <FormContainer>
        <SubHeader title="Visual Inspection - Shift Summary" link="/visual/home" />
        <GeneralInfo data={viGeneralInfo} />

        <FormBody initialValues={formData}>
            <div className='grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-x-4'>
                <div className='flex items-center gap-x-2'>
                    <FilterFilled />
                    <FormDropdownItem
                      label='Line Number'
                      name='lineNumber'
                      dropdownArray={[
                        { key: '', value: 'All Lines' },
                        ...lineNumberList
                      ]}
                      valueField={'key'}
                      visibleField={'value'}
                      onChange={handleChange}
                      className='w-full'
                    />
                </div>

                <div className='flex items-center gap-x-2'>
                    <FormDropdownItem label='Summary' name='summary' dropdownArray={summaryList} valueField={'key'} visibleField={'value'} onChange={handleChange} className='w-full' />
                </div>
            </div>
        </FormBody>

        {formData.summary === 'Acceptance Summary' && (
            <Spin spinning={loading}>
                <Divider>
                  Length Wise Acceptance Summary
                  {formData.lineNumber ? ` - Line ${formData.lineNumber}` : ' - All Lines'}
                  <Badge count={acceptanceData.length} className="ml-2" />
                </Divider>

                <Table
                    dataSource={acceptanceData}
                    columns={acceptanceColumns}
                    scroll={{ x: true }}
                    bordered
                    pagination={{
                      pageSize: 8,
                      showSizeChanger: true,
                      pageSizeOptions: ["8", "16", "32"],
                    }}
                    locale={{
                      emptyText: loading ? "Loading..." : "No acceptance data available"
                    }}
                />

                <Divider>
                  Rejection Summary
                  <Badge count={rejectionData.length} className="ml-2" />
                </Divider>

                <Table
                    dataSource={rejectionData}
                    columns={rejectionColumns}
                    scroll={{ x: true }}
                    bordered
                    pagination={{
                      pageSize: 5,
                      showSizeChanger: true,
                      pageSizeOptions: ["5", "10", "20"],
                    }}
                    locale={{
                      emptyText: loading ? "Loading..." : "No rejection data available"
                    }}
                />

                <Divider>
                  Compiled Summary
                  <Badge count={compiledData.length} className="ml-2" />
                </Divider>

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
                    locale={{
                      emptyText: loading ? "Loading..." : "No compiled data available"
                    }}
                />

                <div className='flex justify-center mt-4'>
                    <Btn onClick={handleClick} className='w-[25%]'>Go Home</Btn>
                </div>
            </Spin>
        )}

        {formData.summary === 'Defect Analysis Summary' && (
            <Spin spinning={loading}>
                <Divider>
                  Defect Analysis Summary
                  {formData.lineNumber ? ` - Line ${formData.lineNumber}` : ' - All Lines'}
                  <Badge count={defectAnalysisData.length} className="ml-2" />
                </Divider>

                <Table
                    dataSource={defectAnalysisData}
                    columns={defectColumns}
                    bordered
                    pagination={{
                      pageSize: 5,
                      showSizeChanger: true,
                      pageSizeOptions: ["5", "10", "20"],
                    }}
                    locale={{
                      emptyText: loading ? "Loading..." : "No defect analysis data available"
                    }}
                />

                <div className='flex justify-center mt-4'>
                    <Btn htmlType='submit' onClick={handleClick} className='w-[25%]'>Go Home</Btn>
                </div>
            </Spin>
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