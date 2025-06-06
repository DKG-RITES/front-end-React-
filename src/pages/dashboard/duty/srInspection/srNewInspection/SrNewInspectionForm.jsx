import React, { useState, useEffect, useCallback, useMemo } from 'react'
import FormContainer from '../../../../../components/DKG_FormContainer';
import SubHeader from '../../../../../components/DKG_SubHeader';
import GeneralInfo from '../../../../../components/DKG_GeneralInfo';
import data from "../../../../../utils/frontSharedData/srInspection/srInspection.json";
import FormDropdownItem from '../../../../../components/DKG_FormDropdownItem';
import { Form, message } from "antd";
import { useSelector } from 'react-redux';
import FormInputItem from '../../../../../components/DKG_FormInputItem';
import Btn from '../../../../../components/DKG_Btn';
import IconBtn from '../../../../../components/DKG_IconBtn';
import { PlusOutlined } from '@ant-design/icons';
import { regexMatch } from "../../../../../utils/Constants";
import { useLocation, useNavigate } from "react-router-dom";
import { apiCall } from '../../../../../utils/CommonFunctions';
import { FilterFilled, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { railSectionList, railGradeList, defectList } = data;

const SrNewInspectionForm = () => {
  const [form] = Form.useForm();

  const location = useLocation();

  const data = useMemo( () => (location?.state?.data || {}), [location?.state?.data]);

  const edittable = Object.keys(data).length !== 0;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    railSectionInspected: null,
    railGradeInspected: null, 
    remarks: null, 
    acceptance26mClA: null,
    acceptance26mClA01: null,
    acceptance26mClB: null,
    acceptance26mIu: null,
    acceptance25mClA: null,
    acceptance25mClA01: null,
    acceptance25mClB: null,
    acceptance25mIu: null,
    acceptance24mClA: null,
    acceptance24mClA01: null,
    acceptance24mClB: null,
    acceptance24mIu: null,
    acceptance13mClA: null,
    acceptance13mClA01: null,
    acceptance13mClB: null,
    acceptance13mIu: null,
    acceptance12mClA: null,
    acceptance12mClA01: null,
    acceptance12mClB: null,
    acceptance12mIu: null,
    acceptance11mClA: null,
    acceptance11mClA01: null,
    acceptance11mClB: null,
    acceptance11mIu: null,
    acceptance10mClA: null,
    acceptance10mClA01: null,
    acceptance10mClB: null,
    acceptance10mIu: null,
    rejection26m: null,
    cutbart26m: null,
    refinish26m: null,
    rejection13m: null,
    cutbart13m: null,
    refinish13m: null,
    utnpRejection26m: null,
    utnpCutbart26m: null,
    utnpRefinish26m: null,
    utnpRejection13m: null,
    utnpCutbart13m: null,
    utnpRefinish13m: null,
    rejectionAnalysisDtls: [
      //   {
      //       rejection26mAnalysisDefect: null,
      //       rejection26mAnalysisNumber: null,
      //       rejection13mAnalysisDefect: null,
      //       rejection13mAnalysisNumber: null,
      //   }
    ],
  })

  const { token } = useSelector((state) => state.auth);
  const sriGeneralInfo = useSelector((state) => state.sriDuty);

  const [rejection26mAnalysisNumberRule, setRejection26mAnalysisNumberRule] = useState([]);
  const [rejection13mAnalysisNumberRule, setRejection13mAnalysisNumberRule] = useState([]);

  const handleRejAnaDtlChange = (fieldName, value, index) => {

    if(fieldName === "rejection26mAnalysisNumber"){
      const isInteger = regexMatch.intRegex.test(value);

      if(!isInteger){
        setRejection26mAnalysisNumberRule(prev => {
          const deepClone = [...prev];
          deepClone[index] = [
            {
              validator: (_, value) =>
                Promise.reject(new Error(`Value must be numeric.`)),
            },
          ]

          return deepClone;
        })
      }
      else{
        setRejection26mAnalysisNumberRule(prev => {
          const deepClone = [...prev];
          deepClone[index] = [];
          return deepClone;
        })
      }
    }
    else if(fieldName === "rejection13mAnalysisNumber"){
      const isInteger = regexMatch.intRegex.test(value);

      if(!isInteger){
        setRejection13mAnalysisNumberRule(prev => {
          const deepClone = [...prev];
          deepClone[index] = [
            {
              validator: (_, value) =>
                Promise.reject(new Error(`Value must be numeric.`)),
            },
          ]

          return deepClone;
        })
      }
      else{
        setRejection13mAnalysisNumberRule(prev => {
          const deepClone = [...prev];
          deepClone[index] = [];
          return deepClone;
        })
      }
    }
    setFormData(prev => {
        const rejAnaDtlsUpdated = prev.rejectionAnalysisDtls;
        rejAnaDtlsUpdated[index][fieldName] = value;
        return {
            ...prev,
            rejectionAnalysisDtls: rejAnaDtlsUpdated
        }
    })
  }

  const handleChange = (fieldName, value) => {
    setFormData((prev) => {
      return {
        ...prev,
        [fieldName]: value,
      };
    });
  };

  const addNewRejAnalysisDtl = () => {
    setFormData((prev) => {
      return {
        ...prev,
        rejectionAnalysisDtls: [
          ...prev.rejectionAnalysisDtls,
          {
            rejection26mAnalysisDefect: null,
            rejection26mAnalysisNumber: null,
            rejection13mAnalysisDefect: null,
            rejection13mAnalysisNumber: null,
          },
        ],
      };
    });
  };

  const getSafeValue = (value) => Number(value) || 0;

  const stdWt =
    (formData.railSectionInspected === "60E1" || formData.railSectionInspected === "60E1A1") ? 60.21 : 51.89;

  const totalTonnesAccepted = stdWt * (
    (26 * (getSafeValue(formData?.acceptance26mClA) + getSafeValue(formData?.acceptance26mClA01) + getSafeValue(formData?.acceptance26mClB) + getSafeValue(formData?.acceptance26mIu))) + 
    (25 * (getSafeValue(formData?.acceptance25mClA) + getSafeValue(formData?.acceptance25mClA01) + getSafeValue(formData?.acceptance25mClB) + getSafeValue(formData?.acceptance25mIu))) + 
    (24 * (getSafeValue(formData?.acceptance24mClA) + getSafeValue(formData?.acceptance24mClA01) + getSafeValue(formData?.acceptance24mClB) + getSafeValue(formData?.acceptance24mIu))) + 
    (13 * (getSafeValue(formData?.acceptance13mClA) + getSafeValue(formData?.acceptance13mClA01) + getSafeValue(formData?.acceptance13mClB) + getSafeValue(formData?.acceptance13mIu))) + 
    (12 * (getSafeValue(formData?.acceptance12mClA) + getSafeValue(formData?.acceptance12mClA01) + getSafeValue(formData?.acceptance12mClB) + getSafeValue(formData?.acceptance12mIu))) + 
    (11 * (getSafeValue(formData?.acceptance11mClA) + getSafeValue(formData?.acceptance11mClA01) + getSafeValue(formData?.acceptance11mClB) + getSafeValue(formData?.acceptance11mIu))) + 
    (10 * (getSafeValue(formData?.acceptance10mClA) + getSafeValue(formData?.acceptance10mClA01) + getSafeValue(formData?.acceptance10mClB) + getSafeValue(formData?.acceptance10mIu)))
  );
// + getSafeValue(formData?.cutbart26m) + getSafeValue(formData?.refinish26m)
  const totalTonnesRejected =
    stdWt * (26 * (getSafeValue(formData?.rejection26m) )) +
    getSafeValue(formData?.acceptance25mClA) + getSafeValue(formData?.acceptance25mClA01) + 
    getSafeValue(formData?.acceptance25mClB) + getSafeValue(formData?.acceptance25mIu) +
    2 * (getSafeValue(formData?.acceptance24mClA) + getSafeValue(formData?.acceptance24mClA01) + 
        getSafeValue(formData?.acceptance24mClB) + getSafeValue(formData?.acceptance24mIu)) +
    getSafeValue(formData?.acceptance12mClA) + getSafeValue(formData?.acceptance12mClA01) + 
    getSafeValue(formData?.acceptance12mClB) + getSafeValue(formData?.acceptance12mIu) +
    2 * (getSafeValue(formData?.acceptance11mClA) + getSafeValue(formData?.acceptance11mClA01) + 
        getSafeValue(formData?.acceptance11mClB) + getSafeValue(formData?.acceptance11mIu)) +
    3 * (getSafeValue(formData?.acceptance10mClA) + getSafeValue(formData?.acceptance10mClA01) + 
        getSafeValue(formData?.acceptance10mClB) + getSafeValue(formData?.acceptance10mIu));


  const totalTonnesInspected = getSafeValue(totalTonnesAccepted) + getSafeValue(totalTonnesRejected);

  const onFinish = async () => {
    try {
      await apiCall("POST", "/shortrailinspection/save", token, {
        ...formData,
        dutyId: sriGeneralInfo.dutyId,
      });
      navigate("/srInspection/home");
      message.success("Data saved successfully.")
    } catch (error) {}
  };

  const populateData = useCallback(async (dutyId, railGradeInspected, railSectionInspected) => {
    try{
      const {data} = await apiCall("POST", "/shortrailinspection/getShortRailMasterById", token, {dutyId, railGradeInspected, railSectionInspected});
      setFormData(data?.responseData || {});
      
    }catch(error){}
  }, [token])

  useEffect(() => {
    if(data.railGradeInspected){
      populateData(data.dutyId, data.railGradeInspected, data.railSectionInspected);
      
    }
  }, [data, populateData])

  useEffect(() => {
    form.setFieldsValue(formData);
  }, [form, formData]);

  const deleteRejAnls = async (id, index) => {
    if(id){
      try{
        await apiCall("POST", "/shortrailinspection/deleteRejectionAnalysisById", token, {id})
        populateData(sriGeneralInfo.dutyId, data.railGradeInspected, data.railSectionInspected);
      }catch(error){}
    }
    else{
      setFormData(prev => {
        const prevRejAnlsDtls = prev.rejectionAnalysisDtls;
        prevRejAnlsDtls.splice(index, 1);

        return {
          ...prev,
          rejectionAnalysisDtls: prevRejAnlsDtls
        }
      })
    }
  }

  return (
    <FormContainer>
      <SubHeader title='Short Rail Inspection Form' link='/srInspection/home' />
      <GeneralInfo data={sriGeneralInfo} />

      <h3 className='font-bold'>Total Tonnes Accepted: <span className='font-normal'>{totalTonnesAccepted}</span></h3>
      <h3 className='font-bold'>Total Tonnes Rejected: <span className='font-normal'>{totalTonnesRejected}</span></h3>
      <h3 className='font-bold'>Total Tonnes Inspected: <span className='font-normal'>{totalTonnesInspected}</span></h3>

      <hr/>

      <Form form={form} layout="vertical" initialValues={formData} onFinish={onFinish} >
        <div className='grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-x-4'>
          <FormDropdownItem label='Rail Section Inspected' name='railSectionInspected' formField="railSectionInspected" dropdownArray={railSectionList} valueField='key' visibleField='value' onChange={handleChange} className='w-full'  disabled={edittable} />
          <FormDropdownItem label ='Rail Grade Inspected' name='railGradeInspected' formField="railGradeInspected" dropdownArray={railGradeList} valueField='key' visibleField='value' onChange = {handleChange} className='w-full'  disabled={edittable} />
        </div>

        <h3 className="font-semibold !text-xl mb-2">
          Acceptance Summary
        </h3>
        <div className="border grid grid-cols-5 divide-x divide-y divide-gray-300 mb-4">
          <div className="p-2 font-semibold">Length</div>
          <div className="p-2 font-semibold">Cl - A</div>
          <div className="p-2 font-semibold">(Cl - A + 0.1)</div>
          <div className="p-2 font-semibold">Cl - B</div>
          <div className="p-2 font-semibold">IU</div>

          <div className="p-2 font-semibold">26m</div>
          <FormInputItem
            className="no-border"
            name="acceptance26mClA"
            onChange={handleChange}
          />
          <FormInputItem
            className="no-border"
            name="acceptance26mClA01"
            onChange={handleChange}
          />
          <FormInputItem
            className="no-border"
            name="acceptance26mClB"
            onChange={handleChange}
          />
          <FormInputItem
            className="no-border"
            name="acceptance26mIu"
            onChange={handleChange}
          />

          <div className="p-2 font-semibold">25m</div>
          <FormInputItem
            className="no-border"
            name="acceptance25mClA"
            onChange={handleChange}
          />
          <FormInputItem
            className="no-border"
            name="acceptance25mClA01"
            onChange={handleChange}
          />
          <FormInputItem
            className="no-border"
            name="acceptance25mClB"
            onChange={handleChange}
          />
          <FormInputItem
            className="no-border"
            name="acceptance25mIu"
            onChange={handleChange}
          />

          <div className="p-2 font-semibold">24m</div>
          <FormInputItem
            className="no-border"
            name="acceptance24mClA"
            onChange={handleChange}
          />
          <FormInputItem
            className="no-border"
            name="acceptance24mClA01"
            onChange={handleChange}
          />
          <FormInputItem
            className="no-border"
            name="acceptance24mClB"
            onChange={handleChange}
          />
          <FormInputItem
            className="no-border"
            name="acceptance24mIu"
            onChange={handleChange}
          />

          <div className="p-2 font-semibold">13m</div>
          <FormInputItem
            className="no-border"
            name="acceptance13mClA"
            onChange={handleChange}
          />
          <FormInputItem
            className="no-border"
            name="acceptance13mClA01"
            onChange={handleChange}
          />
          <FormInputItem
            className="no-border"
            name="acceptance13mClB"
            onChange={handleChange}
          />
          <FormInputItem
            className="no-border"
            name="acceptance13mIu"
            onChange={handleChange}
          />

          <div className="p-2 font-semibold">12m</div>
          <FormInputItem
            className="no-border"
            name="acceptance12mClA"
            onChange={handleChange}
          />
          <FormInputItem
            className="no-border"
            name="acceptance12mClA01"
            onChange={handleChange}
          />
          <FormInputItem
            className="no-border"
            name="acceptance12mClB"
            onChange={handleChange}
          />
          <FormInputItem
            className="no-border"
            name="acceptance12mIu"
            onChange={handleChange}
          />

          <div className="p-2 font-semibold">11m</div>
          <FormInputItem
            className="no-border"
            name="acceptance11mClA"
            onChange={handleChange}
          />
          <FormInputItem
            className="no-border"
            name="acceptance11mClA01"
            onChange={handleChange}
          />
          <FormInputItem
            className="no-border"
            name="acceptance11mClB"
            onChange={handleChange}
          />
          <FormInputItem
            className="no-border"
            name="acceptance11mIu"
            onChange={handleChange}
          />

          <div className="p-2 font-semibold">10m</div>
          <FormInputItem
            className="no-border"
            name="acceptance10mClA"
            onChange={handleChange}
          />
          <FormInputItem
            className="no-border"
            name="acceptance10mClA01"
            onChange={handleChange}
          />
          <FormInputItem
            className="no-border"
            name="acceptance10mClB"
            onChange={handleChange}
          />
          <FormInputItem
            className="no-border"
            name="acceptance10mIu"
            onChange={handleChange}
          />
        </div>

        <h3 className="font-semibold !text-xl mb-2">
          Rejection / Refinish Summary
        </h3>

        <div className="border grid grid-cols-4 divide-x divide-y divide-gray-300 mb-4">
          <div className="p-2 font-semibold"></div>
          <div className="p-2 font-semibold">Rejection</div>
          <div className="p-2 font-semibold">Cutbar</div>
          <div className="p-2 font-semibold">Refinish</div>

          <div className="p-2 font-semibold">26m</div>
          <FormInputItem
            className="no-border"
            name="rejection26m"
            onChange={handleChange}
            
          />
          <FormInputItem
            className="no-border"
            name="cutbart26m"
            onChange={handleChange}
            
          />
          <FormInputItem
            className="no-border"
            name="refinish26m"
            onChange={handleChange}
            
          />

          <div className="p-2 font-semibold">13m</div>
          <FormInputItem
            className="no-border"
            name="rejection13m"
            onChange={handleChange}
            
          />
          <FormInputItem
            className="no-border"
            name="cutbart13m"
            onChange={handleChange}
          />
          <FormInputItem
            className="no-border"
            name="refinish13m"
            onChange={handleChange}
          />
        </div>

        <h3 className="font-semibold !text-xl mb-2">
          UTNP
        </h3>

        <div className="border grid grid-cols-4 divide-x divide-y divide-gray-300 mb-4">
          <div className="p-2"></div>
          <div className="p-2 font-semibold">Rejection</div>
          <div className="p-2 font-semibold">Cutbar</div>
          <div className="p-2 font-semibold">Refinish</div>

          <div className="p-2 font-semibold">26m</div>
          <FormInputItem
            className="no-border"
            name="utnpRejection26m"
            onChange={handleChange}
            
          />
          <FormInputItem
            className="no-border"
            name="utnpCutbart26m"
            onChange={handleChange}
            
          />
          <FormInputItem
            className="no-border"
            name="utnpRefinish26m"
            onChange={handleChange}
            
          />

          <div className="p-2 font-semibold">13m</div>
          <FormInputItem
            className="no-border"
            name="utnpRejection13m"
            onChange={handleChange}
            
          />
          <FormInputItem
            className="no-border"
            name="utnpCutbart13m"
            onChange={handleChange}
            
          />
          <FormInputItem
            className="no-border"
            name="utnpRefinish13m"
            onChange={handleChange}
            
          />
        </div>

        <div className="relative mb-6">
          <h3 className="font-semibold !text-xl">Rejection Analysis</h3>

          <div className="border grid grid-cols-5 divide-x divide-y divide-gray-300 mt-2">
            <div className="p-2 col-span-2 text-center font-semibold">26m</div>
            <div className="p-2 col-span-2 text-center font-semibold">13m</div>
            <div className="p-2 text-center font-semibold row-span-2 flex items-center justify-center">Actions</div>
            <div className="p-2 text-center font-semibold">Defect</div>
            <div className="p-2 text-center font-semibold">Number</div>
            <div className="p-2 text-center font-semibold">Defect</div>
            <div className="p-2 text-center font-semibold">Number</div>
            {formData.rejectionAnalysisDtls?.map((record, index) => (
              <>
                <div className="p-2">
                  <FormDropdownItem className="no-border" name={["rejectionAnalysisDtls", index, "rejection26mAnalysisDefect"]} formField="rejection26mAnalysisDefect" dropdownArray={defectList} visibleField="value" valueField="key" onChange={(name, value) => handleRejAnaDtlChange(name, value, index)} showSearch/>
                </div>
                <div className="p-2">
                  <FormInputItem className="no-border" name={["rejectionAnalysisDtls", index, "rejection26mAnalysisNumber"]} rules={rejection26mAnalysisNumberRule[index]}  onChange={(name, value) => handleRejAnaDtlChange(name, value, index)} />
                </div>
                <div className="p-2">
                  <FormDropdownItem className="no-border" name={["rejectionAnalysisDtls", index, "rejection13mAnalysisDefect"]} formField="rejection13mAnalysisDefect" dropdownArray={defectList} visibleField="value" valueField="key" onChange={(name, value) => handleRejAnaDtlChange(name, value, index)} showSearch/>
                </div>
                <div className="p-2">
                  <FormInputItem className="no-border" name={["rejectionAnalysisDtls", index, "rejection13mAnalysisNumber"]} rules={rejection13mAnalysisNumberRule[index]}  onChange={(name, value) => handleRejAnaDtlChange(name, value, index)} />
                </div>
                <div className="p-2">
                <IconBtn icon={DeleteOutlined} text="Delete" onClick={() => deleteRejAnls(record.id, index)} />
                </div>
              </>
            ))}

            <IconBtn
              icon={PlusOutlined}
              text="add"
              className="absolute right-0 -bottom-8"
              onClick={addNewRejAnalysisDtl}
            />
          </div>
        </div>

        <FormInputItem
          label="Remarks"
          name="remarks"
          
          onChange={handleChange}
        />

        <Btn htmlType="submit" className="flex mx-auto">
          {
            edittable ? "Edit" : "Save"
          }
          {/* Save */}
        </Btn>
      </Form>
    </FormContainer>
  )
}

export default SrNewInspectionForm
