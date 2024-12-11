import React, { useCallback, useEffect, useState } from "react";
import FormContainer from "../../../../../../components/DKG_FormContainer";
import SubHeader from "../../../../../../components/DKG_SubHeader";
import GeneralInfo from "../../../../../../components/DKG_GeneralInfo";
import data from "../../../../../../utils/frontSharedData/rollingStage/Stage.json";
import { Divider, Form, message, TimePicker } from "antd";
import { useLocation } from "react-router-dom";
import FormInputItem from "../../../../../../components/DKG_FormInputItem";
import FormDropdownItem from "../../../../../../components/DKG_FormDropdownItem";
import Btn from "../../../../../../components/DKG_Btn";
import { useSelector } from "react-redux";
import { apiCall } from "../../../../../../utils/CommonFunctions";
import dayjs from "dayjs";
import { regexMatch } from "../../../../../../utils/Constants";

const {
  sampleLocationList,
  headList,
  asyList,
  footToeList,
  crownProfileList,
  fishingHeightList,
  footFlatnessList,
} = data;

const RollingControlSample = () => {
  const location = useLocation();
  const { state } = location;

  const heatNo = state?.heatNo || null;
  const sampleNo = state?.sampleNo || null;

  const [form] = Form.useForm();

  const { token } = useSelector((state) => state.auth);
  const rollingGeneralInfo = useSelector((state) => state.rollingDuty);
  const { railSection } = rollingGeneralInfo;

  const [formData, setFormData] = useState({
    sampleNo: null,
    heatNo: null,
    timing: null,
    sampleLocation: null,
    height: null,
    flange: null,
    weight: null,
    web: null,
    head: null,
    asy: null,
    footToe: null,
    crownProfile: null,
    fishingHeight: null,
    footFlatness: null,
    remark: null,
  });

  const [heightRule, setHeightRule] = useState([]);
  const [flangeRule, setFlangeRule] = useState([]);
  const [weightRule, setWeightRule] = useState([]);
  const [webRule, setWebRule] = useState([]);

  const handleChange = (fieldName, value) => {
    if (fieldName === "height") {
      const isFloat = regexMatch.floatRegex.test(value);
      if (!isFloat) {
        console.log("HEIGHT IS NOT FLOAT: ", fieldName, value)
        setHeightRule(
          [
          {
            validator: (_, value) =>
              Promise.reject(new Error("Value must be numeric.")),
          },
        ]
      );
      } else if (isFloat) {
        console.log("FLOAT: ", value)
        let floor = null;
        let ceil = null;
        if (railSection === "IRS 52") {
          if (value < 155.6 || value > 156.8) {
            floor = 155.6;
            ceil = 156.8;
          }
        } else if (railSection === "60E1") {
          if (value < 171.4 || value > 172.6) {
            floor = 171.4;
            ceil = 172.6;
          }
        } else if (railSection === "60E1A1") {
          if (value < 133.3 || value > 134.7) {
            floor = 133.3;
            ceil = 134.7;
          }
        }

        if (ceil && floor) {
          setHeightRule([
            {
              validator: (_, value) =>
                Promise.reject(
                  new Error(`Value must be in the range of ${floor} - ${ceil}`)
                ),
            },
          ]);
        }
        else {
          setHeightRule([]);
        }
      } 
    } else if (fieldName === "flange") {
      const isFloat = regexMatch.floatRegex.test(value);
      if (!isFloat) {
        setFlangeRule([
          {
            validator: (_, value) =>
              Promise.reject(new Error("Value must be numeric.")),
          },
        ]);
      } else {
        let ceil = null;
        let floor = null;
        if (railSection === "60E1") {
          if (value < 149.0 || value > 151.0) {
            floor = 149.0;
            ceil = 151.0;
          }
        } else if (railSection === "IRS 52") {
          if (value < 135.0 || value > 137.0) {
            floor = 135.0;
            ceil = 137.0;
          }
        } else if (railSection === "60E1A1") {
          if (value < 139.0 || value > 141.0) {
            floor = 139.0;
            ceil = 141.0;
          }
        }

        if (ceil && floor) {
          setFlangeRule([
            {
              validator: (_, value) =>
                Promise.reject(
                  new Error(`Value must be in the range of ${floor} - ${ceil}`)
                ),
            },
          ]);
        } else {
          setFlangeRule([]);
        }
      }
    } else if (fieldName === "weight") {
      const isFloat = regexMatch.floatRegex.test(value);
      if (!isFloat) {
        setWeightRule([
          {
            validator: (_, value) =>
              Promise.reject(new Error("Value must be numeric.")),
          },
        ]);
      } else {
        let ceil = null;
        let floor = null;

        if (railSection === "IRS 52") {
          if (value < 51.63055 || value > 52.66835) {
            floor = 51.63055;
            ceil = 52.66835;
          }
        } else if (railSection === "60E1") {
          if (value < 51.63055 || value > 52.66835) {
            floor = 51.63055;
            ceil = 52.66835;
          }
        } else if (railSection === "60E1A1") {
          if (value < 72.60515 || value > 74.06455) {
            floor = 72.60515;
            ceil = 74.06455;
          }
        }

        if (floor && ceil) {
          setWeightRule([
            {
              validator: (_, value) =>
                Promise.reject(
                  new Error(`Value must be in the range of ${floor} - ${ceil}`)
                ),
            },
          ]);
        } else {
          setWeightRule([]);
        }
      }
    } else if (fieldName === "web") {
      const isFloat = regexMatch.floatRegex.test(value);
      if(!isFloat){
        setWebRule([
          {
            validator: (_, value) =>
              Promise.reject(new Error("Value must be numeric.")),
          },
        ]);
      }
      else {
        let ceil = null;
        let floor = null;

        if (railSection === "IRS 52") {
          if (value < 15.0 || value > 16.5) {
            floor = 15.0;
            ceil = 16.5;
          }
        } else if (railSection === "60E1") {
          if (value < 16.0 || value > 17.5) {
            floor = 16.0;
            ceil = 17.5;
          }
        } else if (railSection === "60E1A1") {
          if (value < 43.3 || value > 44.7) {
            floor = 43.3;
            ceil = 44.7;
          }
        }

        if (floor && ceil) {
          setWebRule([
            {
              validator: (_, value) =>
                Promise.reject(
                  new Error(`Value must be in the range of ${floor} - ${ceil}`)
                ),
            },
          ]);
        } else {
          setWebRule([]);
        }
      }
    }
    setFormData((prev) => {
      return {
        ...prev,
        [fieldName]: value,
      };
    });
  };

  console.log("Formdata: ", formData.height)

  const handleFormSubmit = async () => {
    try {
      await apiCall("POST", "/rolling/saveControlHeat", token, {
        ...formData,
        dutyId: rollingGeneralInfo.dutyId,
      });
      message.success("Data saved successfully");
    } catch (error) {}
  };

  // console.log("Height rule: ", heightRule);
  // console.log("Flange rule: ", flangeRule);

  const handleDtlSearch = useCallback(
    async (heatNo, sampleNo) => {
      try {
        const { data } = await apiCall(
          "POST",
          "/rolling/getControlSampleDtls",
          token,
          { heatNo, sampleNo }
        );

        const { responseData } = data;

        setFormData({
          sampleNo: responseData?.sampleNo,
          heatNo: responseData?.heatNo,
          timing: responseData?.timing,
          sampleLocation: responseData?.sampleLocation,
          height: responseData?.height,
          flange: responseData?.flange,
          weight: responseData?.weight,
          web: responseData?.web,
          head: responseData?.head,
          asy: responseData?.asy,
          footToe: responseData?.footToe,
          crownProfile: responseData?.crownProfile,
          fishingHeight: responseData?.fishingHeight,
          footFlatness: responseData?.footFlatness,
          remark: responseData?.remark,
        });
      } catch (error) {}
    },
    [token]
  );

  const handleTimingChange = (time, timeString) => {
    if (time) {
      // Directly use timeString because it's already in the correct format
      setFormData((prev) => ({ ...prev, timing: timeString }));
    } else {
      // Handle cleared picker
      setFormData((prev) => ({ ...prev, timing: null }));
    }
  };

  const timingDayJs = formData.timing
    ? dayjs(formData.timing, "HH:mm:ss")
    : null;

  useEffect(() => {
    form.setFieldsValue({ ...formData, timingDayJs });
  }, [formData, form, timingDayJs]);

  useEffect(() => {
    if (heatNo && sampleNo) {
      handleDtlSearch(heatNo, sampleNo);
    }
  }, [heatNo, sampleNo, handleDtlSearch]);

  return (
    <FormContainer>
      <SubHeader
        title={`Rolling Control Sample Dimensions - ${railSection}`}
        link="/stage/rollingControl"
      />
      <GeneralInfo data={rollingGeneralInfo} />

      <Form
        initialValues={{ ...formData, timingDayJs }}
        onFinish={handleFormSubmit}
        form={form}
        layout="vertical"
      >
        <div className="grid grid-cols-2 gap-x-2">
          <FormInputItem
            label="Sample No."
            name="sampleNo"
            onChange={handleChange}
          />
          <FormInputItem
            label="Heat No."
            name="heatNo"
            value={formData.heatNumber}
            onChange={handleChange}
            required
          />

          <Form.Item
            label="Select Time"
            name="timingDayJs"
            rules={[{ required: true, message: "Please select a time!" }]}
          >
            <TimePicker
              onChange={handleTimingChange}
              format="HH:mm:ss"
              placeholder="Select Time"
              className="w-full"
            />
          </Form.Item>
          <FormDropdownItem
            label="Sample Location"
            name="sampleLocation"
            formField="sampleLocation"
            dropdownArray={sampleLocationList}
            visibleField="value"
            valueField="key"
            onChange={handleChange}
            required
          />
        </div>

        <Divider className="mt-0 mb-4" />

        <div className="grid grid-cols-2 gap-x-2">
          <FormInputItem
            label="Height"
            name="height"
            rules={heightRule}
            onChange={handleChange}
            required
          />
          <FormInputItem
            label="Flange"
            name="flange"
            rules={flangeRule}
            onChange={handleChange}
            required
          />

          <FormInputItem
            label="Weight"
            name="weight"
            onChange={handleChange}
            rules={weightRule}
          />
          <FormInputItem
            label="Web (mm)"
            name="web"
            rules={webRule}
            onChange={handleChange}
            required
          />
          <FormDropdownItem
            label="Head"
            name="head"
            formField="head"
            dropdownArray={headList}
            visibleField="value"
            valueField="key"
            onChange={handleChange}
            required
          />

          {railSection !== "60E1A1" && (
            <FormDropdownItem
              label="Asy"
              name="asy"
              formField="asy"
              dropdownArray={asyList}
              visibleField="value"
              valueField="key"
              onChange={handleChange}
              required
            />
          )}

          {railSection === "60E1" && (
            <FormDropdownItem
              label="Foot Toe"
              name="footToe"
              formField="footToe"
              dropdownArray={footToeList}
              visibleField="value"
              valueField="key"
              onChange={handleChange}
              required
            />
          )}

          {railSection !== "IRS52" && (
            <>
              <FormDropdownItem
                label="Fishing Height"
                name="fishingHeight"
                formField="fishingHeight"
                dropdownArray={fishingHeightList}
                visibleField="value"
                valueField="key"
                onChange={handleChange}
                required
              />
              <FormDropdownItem
                label="Crown Profile"
                name="crownProfile"
                formField="crownProfile"
                dropdownArray={crownProfileList}
                visibleField="value"
                valueField="key"
                onChange={handleChange}
                required
              />
            </>
          )}
          <FormDropdownItem
            label="Foot Flatness"
            name="footFlatness"
            formField="footFlatness"
            dropdownArray={footFlatnessList}
            visibleField="value"
            valueField="key"
            onChange={handleChange}
            required
          />
        </div>

        <Divider className="mb-4 mt-0" />

        <FormInputItem
          label="Remarks"
          name="remark"
          onChange={handleChange}
          required
        />

        <Btn htmlType="submit" className="flex justify-center mx-auto">
          Save
        </Btn>
      </Form>
    </FormContainer>
  );
};

export default RollingControlSample;
