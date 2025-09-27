import React, { useState, useEffect, useCallback } from "react";
import SubHeader from "../../../../../components/DKG_SubHeader";
import FormContainer from "../../../../../components/DKG_FormContainer";
import GeneralInfo from "../../../../../components/DKG_GeneralInfo";
import data from "../../../../../utils/frontSharedData/VisualInspection/VI.json";
import { Divider, Table, Spin, Alert, Select } from 'antd';
import FormBody from "../../../../../components/DKG_FormBody";
import Btn from "../../../../../components/DKG_Btn";
import { useNavigate } from 'react-router-dom'
import FormDropdownItem from "../../../../../components/DKG_FormDropdownItem";
import { FilterFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { apiCall } from "../../../../../utils/CommonFunctions";

// Import only static configuration data, not the actual data
const { lineNumberList, summaryList } = data;

// Define columns for live data tables
const acceptanceColumns = [
  { title: "Rail Class", dataIndex: "railClass", key: "railClass", align: "center" },
  { title: "Accepted Length (m)", dataIndex: "acceptedLength", key: "acceptedLength", align: "center" },
  { title: "Accepted Number", dataIndex: "acceptedNo", key: "acceptedNo", align: "center" },
  { title: "Total Length (m)", dataIndex: "totalLength", key: "totalLength", align: "center" }
];

const rejectionColumns = [
  { title: "Defect Type", dataIndex: "defectType", key: "defectType", align: "center" },
  { title: "Defect Category", dataIndex: "defectCategory", key: "defectCategory", align: "center" },
  { title: "Location", dataIndex: "location", key: "location", align: "center" },
  { title: "Position", dataIndex: "position", key: "position", align: "center" }
];

const compiledColumns = [
  { title: "Description", dataIndex: "description", key: "description", align: "center" },
  { title: "Count", dataIndex: "count", key: "count", align: "center" },
  { title: "Percentage", dataIndex: "percentage", key: "percentage", align: "center" }
];

const defectColumns = [
  { title: "Defect Category", dataIndex: "defectCategory", key: "defectCategory", align: "center" },
  { title: "Defect Type", dataIndex: "defectType", key: "defectType", align: "center" },
  { title: "Count", dataIndex: "count", key: "count", align: "center" },
  { title: "Percentage", dataIndex: "percentage", key: "percentage", align: "center" }
];

const railwiseColumns = [
  { title: "S.No.", dataIndex: "serialNo", key: "serialNo", align: "center" },
  { title: "Rail ID", dataIndex: "railId", key: "railId", align: "center" },
  { title: "Heat No", dataIndex: "heatNo", key: "heatNo", align: "center" },
  { title: "Heat Status", dataIndex: "heatStatus", key: "heatStatus", align: "center" },
  { title: "Actual Offered Length", dataIndex: "actualOfferedLength", key: "actualOfferedLength", align: "center" },
  { title: "Acceptance", dataIndex: "acceptance", key: "acceptance", align: "center" },
  { title: "Rejection", dataIndex: "rejection", key: "rejection", align: "center" },
  { title: "Remarks", dataIndex: "remarks", key: "remarks", align: "center" }
];

const VIShiftSummary = () => {
  const navigate = useNavigate();
  const viGeneralInfo = useSelector(state => state.viDuty);
  const { token } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    lineNumber: '', summary: 'Acceptance Summary'
  });

  // Data states
  const [loading, setLoading] = useState(false);
  const [acceptanceData, setAcceptanceData] = useState([]);
  const [rejectionData, setRejectionData] = useState([]);
  const [compiledData, setCompiledData] = useState([]);
  const [defectAnalysisData, setDefectAnalysisData] = useState([]);
  const [railwiseData, setRailwiseData] = useState([]);
  const [rawViData, setRawViData] = useState([]);

  const handleChange = (fieldName, value) => {
    console.log("Dropdown changed:", { fieldName, value, valueType: typeof value });
    setFormData(prev => {
      const newFormData = {
        ...prev,
        [fieldName]: value
      };
      console.log("New form data:", newFormData);
      console.log("Summary comparison:", {
        newSummary: newFormData.summary,
        isAcceptance: newFormData.summary === 'Acceptance Summary',
        isDefect: newFormData.summary === 'Defect Analysis Summary',
        isRailwise: newFormData.summary === 'Inspected Railwise Summary'
      });
      return newFormData;
    });
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
      console.log("Raw API response:", data?.responseData);
      return data?.responseData || [];
    } catch (error) {
      console.error("Error fetching VI data:", error);
      return [];
    }
  };

  // Process raw VI data to create acceptance summary
  const processAcceptanceSummary = (rawData) => {
    console.log("Processing acceptance data:", { rawDataLength: rawData.length, lineNumberFilter: formData.lineNumber });

    const filtered = formData.lineNumber ?
      rawData.filter(item => {
        console.log("Filtering item:", {
          itemLineNumber: item.lineNumber,
          itemLineNumberType: typeof item.lineNumber,
          filterLineNumber: formData.lineNumber,
          filterLineNumberType: typeof formData.lineNumber,
          areEqual: item.lineNumber === formData.lineNumber,
          areEqualString: String(item.lineNumber) === String(formData.lineNumber)
        });
        // Handle different formats: "Line 1" vs "1"
        const extractNumber = (str) => {
          if (!str) return '';
          const match = str.toString().match(/\d+/);
          return match ? match[0] : str.toString();
        };

        const itemLineNum = extractNumber(item.lineNumber);
        const filterLineNum = extractNumber(formData.lineNumber);

        console.log("Extracted numbers:", { itemLineNum, filterLineNum, match: itemLineNum === filterLineNum });

        return item.lineNumber === formData.lineNumber ||
               String(item.lineNumber) === String(formData.lineNumber) ||
               itemLineNum === filterLineNum;
      }) :
      rawData;

    console.log("Filtered data length:", filtered.length);

    // Flatten all acceptance data from all rails
    const allAcceptanceData = [];
    filtered.forEach(item => {
      if (item.acptDataList && item.acptDataList.length > 0) {
        item.acptDataList.forEach(acpt => {
          allAcceptanceData.push({
            ...acpt,
            totalLength: (parseFloat(acpt.acceptedLength || 0) * parseInt(acpt.acceptedNo || 0)).toFixed(2)
          });
        });
      }
    });

    console.log("Processed acceptance data:", allAcceptanceData.length);
    return allAcceptanceData;
  };

  // Process raw VI data to create rejection summary
  const processRejectionSummary = (rawData) => {
    const extractNumber = (str) => {
      if (!str) return '';
      const match = str.toString().match(/\d+/);
      return match ? match[0] : str.toString();
    };

    const filtered = formData.lineNumber ?
      rawData.filter(item => {
        const itemLineNum = extractNumber(item.lineNumber);
        const filterLineNum = extractNumber(formData.lineNumber);
        return item.lineNumber === formData.lineNumber ||
               String(item.lineNumber) === String(formData.lineNumber) ||
               itemLineNum === filterLineNum;
      }) :
      rawData;

    // Flatten all defect data from all rails
    const allDefectData = [];
    filtered.forEach(item => {
      if (item.defectDataList && item.defectDataList.length > 0) {
        item.defectDataList.forEach(defect => {
          allDefectData.push(defect);
        });
      }
    });

    return allDefectData;
  };

  // Process raw VI data to create defect analysis
  const processDefectAnalysis = (rawData) => {
    const extractNumber = (str) => {
      if (!str) return '';
      const match = str.toString().match(/\d+/);
      return match ? match[0] : str.toString();
    };

    const filtered = formData.lineNumber ?
      rawData.filter(item => {
        const itemLineNum = extractNumber(item.lineNumber);
        const filterLineNum = extractNumber(formData.lineNumber);
        return item.lineNumber === formData.lineNumber ||
               String(item.lineNumber) === String(formData.lineNumber) ||
               itemLineNum === filterLineNum;
      }) :
      rawData;

    const defectAnalysis = {};
    filtered.forEach(item => {
      if (item.defectDataList && item.defectDataList.length > 0) {
        item.defectDataList.forEach(defect => {
          const type = defect.defectType || 'Unknown';
          const category = defect.defectCategory || 'Others';
          const key = `${category}-${type}`;

          if (!defectAnalysis[key]) {
            defectAnalysis[key] = {
              defectCategory: category,
              defectType: type,
              count: 0,
              percentage: 0
            };
          }
          defectAnalysis[key].count += 1;
        });
      }
    });

    // Calculate percentages
    const result = Object.values(defectAnalysis);
    const totalDefects = result.reduce((total, defect) => total + defect.count, 0);

    result.forEach(defect => {
      defect.percentage = totalDefects > 0 ? ((defect.count / totalDefects) * 100).toFixed(2) : '0.00';
    });

    return result;
  };

  // Process raw VI data to create railwise summary
  const processRailwiseSummary = (rawData) => {
    const extractNumber = (str) => {
      if (!str) return '';
      const match = str.toString().match(/\d+/);
      return match ? match[0] : str.toString();
    };

    const filtered = formData.lineNumber ?
      rawData.filter(item => {
        const itemLineNum = extractNumber(item.lineNumber);
        const filterLineNum = extractNumber(formData.lineNumber);
        return item.lineNumber === formData.lineNumber ||
               String(item.lineNumber) === String(formData.lineNumber) ||
               itemLineNum === filterLineNum;
      }) :
      rawData;

    return filtered.map((item, index) => {
      // Calculate acceptance summary
      const acceptanceSummary = item.acptDataList?.map(acpt =>
        `${acpt.railClass}: ${acpt.acceptedLength}m x ${acpt.acceptedNo}`
      ).join(', ') || 'None';

      // Calculate rejection summary
      const rejectionSummary = [];
      if (item.rej13 > 0) rejectionSummary.push(`${item.rej13} x 13m`);
      if (item.rej12 > 0) rejectionSummary.push(`${item.rej12} x 12m`);
      if (item.rej11 > 0) rejectionSummary.push(`${item.rej11} x 11m`);
      if (item.rej10 > 0) rejectionSummary.push(`${item.rej10} x 10m`);
      if (item.rejCompLength > 0) rejectionSummary.push(`${item.rejCompLength}m`);

      return {
        key: item.railId,
        serialNo: index + 1,
        railId: item.railId,
        heatNo: item.heatNo,
        heatStatus: item.heatStatus,
        actualOfferedLength: item.actualOfferedLength,
        acceptance: acceptanceSummary,
        rejection: rejectionSummary.join(', ') || 'None',
        remarks: item.remarks || '-'
      };
    });
  };

  // Main function to fetch all data
  const fetchAllData = useCallback(async () => {
    if (!viGeneralInfo.dutyId || !token) return;

    setLoading(true);
    try {
      // Fetch raw VI data using existing API
      const rawData = await fetchViData();
      setRawViData(rawData);

      console.log("=== API RESPONSE ANALYSIS ===");
      console.log("Raw data length:", rawData.length);
      console.log("Raw data sample (first item):", rawData.length > 0 ? rawData[0] : "No data");
      console.log("Line numbers in data:", rawData.map(item => item.lineNumber));
      console.log("Unique line numbers:", [...new Set(rawData.map(item => item.lineNumber))]);
      console.log("Line number filter:", formData.lineNumber);
      console.log("Filter type:", typeof formData.lineNumber);
      console.log("=== END API ANALYSIS ===");

      // Process data to create different summaries
      const acceptance = processAcceptanceSummary(rawData);
      const rejection = processRejectionSummary(rawData);
      const defectAnalysis = processDefectAnalysis(rawData);
      const railwise = processRailwiseSummary(rawData);

      // Create compiled summary from raw data
      const totalRails = rawData.length;
      const totalAcceptedRails = rawData.filter(item =>
        item.acptDataList && item.acptDataList.length > 0
      ).length;
      const totalRejectedRails = rawData.filter(item =>
        item.rej13 > 0 || item.rej12 > 0 || item.rej11 > 0 || item.rej10 > 0 || item.rejCompLength > 0
      ).length;

      const compiled = [
        {
          key: 'total_inspected',
          description: 'Total Rails Inspected',
          count: totalRails,
          percentage: '100.00'
        },
        {
          key: 'total_accepted',
          description: 'Total Accepted Rails',
          count: totalAcceptedRails,
          percentage: totalRails > 0 ? ((totalAcceptedRails / totalRails) * 100).toFixed(2) : '0.00'
        },
        {
          key: 'total_rejected',
          description: 'Total Rejected Rails',
          count: totalRejectedRails,
          percentage: totalRails > 0 ? ((totalRejectedRails / totalRails) * 100).toFixed(2) : '0.00'
        }
      ];

      setAcceptanceData(acceptance);
      setRejectionData(rejection);
      setCompiledData(compiled);
      setDefectAnalysisData(defectAnalysis);
      setRailwiseData(railwise);

      console.log("=== FINAL DATA SUMMARY ===");
      console.log("Raw data length:", rawData.length);
      console.log("Line number filter:", formData.lineNumber);
      console.log("Summary type:", formData.summary);
      console.log("Processed data lengths:", {
        totalRails,
        acceptance: acceptance.length,
        rejection: rejection.length,
        compiled: compiled.length,
        defectAnalysis: defectAnalysis.length,
        railwise: railwise.length
      });
      console.log("Acceptance data sample:", acceptance.slice(0, 2));
      console.log("Defect analysis data sample:", defectAnalysis.slice(0, 2));
      console.log("Railwise data sample:", railwise.slice(0, 2));
      console.log("=== END SUMMARY ===");
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
                      formField='lineNumber'
                      dropdownArray={[
                        { key: '', value: 'All Lines' },
                        ...lineNumberList.filter(item => item.key !== 'All lines')
                      ]}
                      valueField={'key'}
                      visibleField={'value'}
                      onChange={handleChange}
                      className='w-full'
                      value={formData.lineNumber}
                    />
                </div>

                <div className='flex items-center gap-x-2'>
                    <FormDropdownItem
                      label='Summary'
                      name='summary'
                      formField='summary'
                      dropdownArray={summaryList}
                      valueField={'key'}
                      visibleField={'value'}
                      onChange={handleChange}
                      className='w-full'
                      value={formData.summary}
                    />
                </div>
            </div>
        </FormBody>



        {formData.summary === 'Acceptance Summary' && (
            <Spin spinning={loading}>
                <Divider>
                  Length Wise Acceptance Summary
                  {formData.lineNumber ? ` - Line ${formData.lineNumber}` : ' - All Lines'}
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
            <Spin spinning={loading}>
                <Divider>
                  Inspected Railwise Summary
                  {formData.lineNumber ? ` - Line ${formData.lineNumber}` : ' - All Lines'}
                </Divider>

                <Table
                    dataSource={railwiseData}
                    columns={railwiseColumns}
                    scroll={{ x: true }}
                    bordered
                    pagination={{
                      pageSize: 10,
                      showSizeChanger: true,
                      pageSizeOptions: ["10", "20", "50"],
                    }}
                    locale={{
                      emptyText: loading ? "Loading..." : "No railwise data available"
                    }}
                />

                <div className='flex justify-center mt-4'>
                    <Btn htmlType='submit' onClick={handleClick} className='w-[25%]'>Go Home</Btn>
                </div>
            </Spin>
        )}
    </FormContainer>
  )
}

export default VIShiftSummary