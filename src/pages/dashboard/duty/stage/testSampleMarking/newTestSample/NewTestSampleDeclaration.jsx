import React, { useEffect, useState } from "react";
import FormContainer from "../../../../../../components/DKG_FormContainer";
import SubHeader from "../../../../../../components/DKG_SubHeader";
import data from "../../../../../../utils/frontSharedData/testSampleDec/testSampleDec.json";
import GeneralInfo from "../../../../../../components/DKG_GeneralInfo";
import FormBody from "../../../../../../components/DKG_FormBody";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { message, Form } from "antd";
import FormDropdownItem from "../../../../../../components/DKG_FormDropdownItem";
import AcceptanceTestSample from "../acceptanceTestSample.jsx/AcceptanceTestSample";
import RetestSample from "../RetestSample";

const {
  testDropdownList,
  railGradeDropdownList,
  testSampleDecGeneralInfo,
  strandDropdownList,
  sampleLotDropdownList,
  sampleDropdownList,
  checkBoxItems,
  retestNameSecDropdownList,
  retestNameDropdownList,
} = data;

const NewTestSampleDeclaration = () => {
  const location = useLocation();
  const {state} = location;
  const module = state?.module || null;
  const dutyId = state?.dutyId || null;
  const generalInfo = state?.generalInfo || null;


  const navigate = useNavigate();



  const [formData, setFormData] = useState({
    // test: "",
    railGrade: "",
    // sampleType: "",
    // heatNumber: "",
    // strand: "",
    // sampleLot: "",
    // remarks: "",
    // sampleID: "",
    // retestName: "",
    // retestOne: "",
    // retestTwo: "",
    // retestThree: "",
  });

  const handleChange = (fieldName, value) => {
    setFormData((prev) => {
      return {
        ...prev,
        [fieldName]: value,
      };
    });
  };

  const handleFormSubmit = () => {
    message.success("Duty End Called");
    // needs to be change later on
    navigate("/");
  };

  useEffect(() => {
    if(!module || !dutyId){
      message.error("Reach the page from an ongoing duty in a module.")
      navigate(-1);
  
    }
  }, [module, dutyId, navigate])

  return (
    <FormContainer>
      <SubHeader
        title="New Test Sample - Declaration"
        link="/stage/home"
      />
      <GeneralInfo data={generalInfo} />

      <FormBody initialValues={formData} onFinish={handleFormSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-x-4">
          <FormDropdownItem
            label="Test"
            name="test"
            formField="test"
            dropdownArray={testDropdownList}
            onChange={handleChange}
            valueField="key"
            visibleField="value"
            required
          />
          <FormDropdownItem
            label="Rail Grade"
            name="railGrade"
            formField="railGrade"
            dropdownArray={railGradeDropdownList}
            onChange={handleChange}
            valueField="key"
            visibleField="value"
            required
          />
        </div>

        </FormBody>

        {
          formData.test === "Acceptance Test" && <AcceptanceTestSample railGrade={formData.railGrade} dutyId={dutyId} />
        }
        {
          formData.test === "Retest Samples" && <RetestSample railGrade={formData.railGrade} dutyId={dutyId} />
        }
      
    </FormContainer>
  );
};

export default NewTestSampleDeclaration;
