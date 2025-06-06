import React, { useCallback, useEffect, useState } from "react";
import FormContainer from "../../../../../../components/DKG_FormContainer";
import SubHeader from "../../../../../../components/DKG_SubHeader";
import GeneralInfo from "../../../../../../components/DKG_GeneralInfo";
import data from "../../../../../../utils/frontSharedData/rollingStage/Stage.json";
import { Divider, Form, message, Modal, TimePicker } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
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

  const getCurrentTimeString = () => dayjs().format("HH:mm");

  const [formData, setFormData] = useState({
    sampleNo: "",
    heatNo: null,
    timing: getCurrentTimeString(), // <-- Set to local time at mount
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
  const [allowOutOfTolerance, setAllowOutOfTolerance] = useState(false);

  const getRange = (field) => {
    let floor, ceil;
    if (field === "height") {
      if (railSection === "IRS52") [floor, ceil] = [155.6, 156.8];
      else if (railSection === "60E1") [floor, ceil] = [171.4, 172.6];
      else if (railSection === "60E1A1") [floor, ceil] = [133.3, 134.7];
    } else if (field === "flange") {
      if (railSection === "60E1") [floor, ceil] = [149.0, 151.0];
      else if (railSection === "IRS52") [floor, ceil] = [135.0, 137.0];
      else if (railSection === "60E1A1") [floor, ceil] = [139.0, 141.0];
    } else if (field === "weight") {
      if (railSection === "IRS52") [floor, ceil] = [51.63055, 52.66835];
      else if (railSection === "60E1") [floor, ceil] = [59.90895, 61.11315];
      else if (railSection === "60E1A1") [floor, ceil] = [72.60515, 74.06455];
    } else if (field === "web") {
      if (railSection === "IRS52") [floor, ceil] = [15.0, 16.5];
      else if (railSection === "60E1") [floor, ceil] = [16.0, 17.5];
      else if (railSection === "60E1A1") [floor, ceil] = [43.3, 44.7];
    }
    return [floor, ceil];
  };

  const makeValidator = (field) => ({
    validator: (_, value) => {
      const [floor, ceil] = getRange(field);
      if (!value)
        return Promise.reject(
          `${field[0].toUpperCase() + field.slice(1)} is required`
        );
      if (!regexMatch.floatRegex.test(value)) {
        return Promise.reject("Value must be numeric.");
      }
      if (
        !allowOutOfTolerance &&
        floor &&
        ceil &&
        (value < floor || value > ceil)
      ) {
        return Promise.reject(`Value must be in range ${floor} - ${ceil}`);
      }
      return Promise.resolve();
    },
  });

  const handleChange = (fieldName, value) => {
    if (fieldName === "sampleNo") {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
    }

    if (fieldName === "height") {
      const isFloat = regexMatch.floatRegex.test(value);
      if (!isFloat) {
        setHeightRule([
          {
            validator: (_, value) =>
              Promise.reject(new Error("Value must be numeric.")),
          },
        ]);
      } else if (isFloat) {
        let floor = null;
        let ceil = null;
        if (railSection === "IRS52") {
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
        } else {
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
        } else if (railSection === "IRS52") {
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

        if (railSection === "IRS52") {
          if (value < 51.63055 || value > 52.66835) {
            floor = 51.63055;
            ceil = 52.66835;
          }
          // updated the weight according to crio in 601E
        } else if (railSection === "60E1") {
          if (value < 59.90895 || value > 61.11315) {
            floor = 59.90895;
            ceil = 61.11315;
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
      if (!isFloat) {
        setWebRule([
          {
            validator: (_, value) =>
              Promise.reject(new Error("Value must be numeric.")),
          },
        ]);
      } else {
        let ceil = null;
        let floor = null;

        if (railSection === "IRS52") {
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

  console.log("Formdata: ", formData.height);

  const navigate = useNavigate();

  const handleFormSubmit = async () => {
    try {
      await form.validateFields();
      // All fields valid, proceed to save
      await saveData();
    } catch (error) {
      showOutOfToleranceModal(error);
    }
  };

  const handleFormFailed = (error) => {
    showOutOfToleranceModal(error);
  };

  const showOutOfToleranceModal = (error) => {
    const outOfToleranceFields = error?.errorFields
      ?.filter((f) => f.errors.some((e) => e.includes("Value must be in range")))
      .map((f) => ({
        label: f.name[0][0].toUpperCase() + f.name[0].slice(1),
        value: form.getFieldValue(f.name),
        message: f.errors.find((e) => e.includes("Value must be in range")),
      }));

    if (outOfToleranceFields && outOfToleranceFields.length > 0) {
      Modal.confirm({
        title: "Values Outside Tolerance",
        content: (
          <div>
            <p>The following values are outside tolerance:</p>
            <ul>
              {outOfToleranceFields.map((f) => (
                <li key={f.label}>
                  <b>{f.label}:</b> {f.value} &nbsp;
                  <span style={{ color: "red" }}>{f.message}</span>
                </li>
              ))}
            </ul>
            <p>Are you sure you want to save?</p>
          </div>
        ),
        okText: "Yes, Save",
        cancelText: "Cancel",
        onOk: async () => {
          setAllowOutOfTolerance(true);
          try {
            await form.validateFields();
            await saveData();
          } finally {
            setAllowOutOfTolerance(false);
          }
        },
      });
    }
  };

  const saveData = async () => {
    try {
      await apiCall("POST", "/rolling/saveControlHeat", token, {
        ...formData,
        heatNo: String(formData.heatNo).padStart(6, "0"),
        dutyId: rollingGeneralInfo.dutyId,
      });
      localStorage.setItem("lastSampleNo", formData.sampleNo);
      message.success("Data saved successfully");
      navigate("/stage/rollingControl");
    } catch (error) {}
  };

  useEffect(() => {
    const lastSampleNo = localStorage.getItem("lastSampleNo");
    if (!sampleNo) {
      if (lastSampleNo) {
        setFormData((prev) => ({
          ...prev,
          sampleNo: parseInt(lastSampleNo, 10) + 1,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          sampleNo: 1,
        }));
      }
    }
  }, []);

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
    ? dayjs(formData.timing, "HH:mm")
    : dayjs(); // fallback to now if not set

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
        onFinishFailed={handleFormFailed}
        form={form}
        layout="vertical"
      >
        <div className="grid grid-cols-2 gap-x-2">
          <FormInputItem
            label="Sample No."
            name="sampleNo"
            value={formData.sampleNo}
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
            validateStatus={!formData.timing ? "error" : ""}
            help={!formData.timing ? "Please select a time!" : ""}
          >
            <TimePicker
              onChange={handleTimingChange}
              format="HH:mm"
              placeholder="Select Time"
              className="w-full"
              value={timingDayJs} // <-- ensure controlled value
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
            required
            rules={[makeValidator("height")]}
            onChange={handleChange}
            help={() => {
              const [floor, ceil] = getRange("height");
              return floor && ceil ? `Allowed range: ${floor} - ${ceil}` : "";
            }}
          />
          <FormInputItem
            label="Flange"
            name="flange"
            required
            rules={[makeValidator("flange")]}
            onChange={handleChange}
            help={() => {
              const [floor, ceil] = getRange("flange");
              return floor && ceil ? `Allowed range: ${floor} - ${ceil}` : "";
            }}
          />

          <FormInputItem
            label="Weight"
            name="weight"
            required
            rules={[makeValidator("weight")]}
            onChange={handleChange}
            help={() => {
              const [floor, ceil] = getRange("weight");
              return floor && ceil ? `Allowed range: ${floor} - ${ceil}` : "";
            }}
          />
          <FormInputItem
            label="Web (mm)"
            name="web"
            required
            rules={[makeValidator("web")]}
            onChange={handleChange}
            help={() => {
              const [floor, ceil] = getRange("web");
              return floor && ceil ? `Allowed range: ${floor} - ${ceil}` : "";
            }}
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
