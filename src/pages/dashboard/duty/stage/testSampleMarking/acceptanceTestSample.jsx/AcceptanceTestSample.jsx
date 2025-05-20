import { Checkbox, Form, message } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import FormDropdownItem from "../../../../../../components/DKG_FormDropdownItem";
import FormInputItem from "../../../../../../components/DKG_FormInputItem";
import { useSelector } from "react-redux";
import { apiCall } from "../../../../../../utils/CommonFunctions";
import Btn from "../../../../../../components/DKG_Btn";
import {
  RG_1080HH,
  RG_880,
  RG_880NC,
  RG_R260,
  RG_R350HT,
} from "../../../../../../utils/Constants";

const AcceptanceTestSample = ({ railGrade, dutyId, retest }) => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    railGrade: railGrade,
    sampleType: null,
    sampleId: null,
    heatNo: null,
    strand: null,
    sampleLot: null,
    chemical: false, // Assuming you want null for Booleans (you can use false if needed)
    n2: false,
    fwtSt: false,
    mechanical: false,
    sp: false,
    ir: false,
    o2: false,
    fwtHs: false,
    fwtStSr: false,
    tensileFoot: false,
    micro: false,
    decarb: false,
    rsh: false,
    tensile: false,
    ph: false
  });

  const onFinish = async () => {
    if(retest){
      message.error("Table retest_rsm03. doesnt exist.")
      return;
    }
    try {
      await apiCall("POST", "rolling/saveAcceptanceTestSample", token, {
        ...formData,
        dutyId,
      });
      message.success("Data saved successfully.");
    } catch (error) {}
  };

  useEffect(() => {
    form.setFieldsValue(formData);
  }, [form, formData]);

  const sampleTypeDd = [
    {
      key: "Regular",
      value: "Regular",
    },
    {
      key: "USB",
      value: "USB",
    },
    {
      key: "NA",
      value: "NA",
    },
  ];
  const sampleLotDd = [
    {
      key: "Lot 1",
      value: "Lot 1",
    },
    {
      key: "Lot 2",
      value: "Lot 2",
    },
    {
      key: "NA",
      value: "NA",
    },
  ];

  const strandDd = [
    {
      key: 1,
      value: 1,
    },
    {
      key: 2,
      value: 2,
    },
    {
      key: 3,
      value: 3,
    },
    {
      key: 4,
      value: 4,
    },
    {
      key: 5,
      value: 5,
    },
    {
      key: 6,
      value: 6,
    },
  ];

  const { token } = useSelector((state) => state.auth);

  const [sampleIdRule, setSampleIdRule] = useState([]);

  const handleChange = (fieldName, value) => {
    if(fieldName === "sampleId"){
      if((value !== "" || value !== null) && !value.startsWith("H")){
        setSampleIdRule([
          {
            validator: (_, value) =>
              Promise.reject(
                new Error("Sampe ID should start with H.")
              ),
          },
        ]);
      }
      else{
        setSampleIdRule([]);
      }
    }
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const populateDtl = useCallback(
    async (payload) => {
      try {
        const { data } = await apiCall(
          "POST",
          "/rolling/getHeatAcptTestDtls",
          token,
          payload
        );
        // if (data.responseData?.heatNo) {
        //   message.success("Test data present for provided details.");
        console.log("RSH: ", data?.responseData?.rsh)
          setFormData(prev => {
            return {
              chemical: data?.responseData?.chemical,
              n2: data?.responseData?.n2,
              fwtSt: data?.responseData?.fwtSt,
              mechanical: data?.responseData?.mechanical,
              sp: data?.responseData?.sp,
              ir: data?.responseData?.ir,
              o2: data?.responseData?.o2,
              fwtHs: data?.responseData?.fwtHs,
              fwtStSr: data?.responseData?.fwtStSr,
              tensileFoot: data?.responseData?.tensileFoot,
              micro: data?.responseData?.micro,
              decarb: data?.responseData?.decarb,
              rsh: data?.responseData?.rsh,
              ph: data?.responseData?.ph,
              tensile: data?.responseData?.tensile,
              heatNo: prev.heatNo,
              strand: prev.strand,
              sampleLot: prev.sampleLot,
              sampleId: prev.sampleId,
              sampleType: prev.sampleType
            }
          });
        // } else {
          // message.error("Test data not present for provided details.");
        // }
      } catch (error) {}
    },
    [token]
  );

  useEffect(() => {
    if (
      formData.heatNo &&
      formData.sampleLot &&
      formData.sampleType &&
      formData.strand
    ) {
      const payload = {
        heatNo: formData.heatNo,
        sampleLot: formData.sampleLot,
        sampleType: formData.sampleType,
        strand: formData.strand,
      };
      if (railGrade === RG_880 || railGrade === RG_R260) {
        payload.sampleId = null;
        setFormData((prev) => ({ ...prev, sampleId: null }));
        populateDtl(payload);
      } else {
        if (formData.sampleId) {
          payload.sampleId = formData.sampleId;
          populateDtl(payload);
        }
      }
    }
  }, [
    formData.heatNo,
    formData.sampleId,
    formData.sampleLot,
    formData.sampleType,
    formData.strand,
    railGrade,
    populateDtl,
  ]);

  useEffect(() => {
    form.setFieldsValue(formData);
  }, [form, formData]);

  return (
    <Form
      form={form}
      initialValues={formData}
      onFinish={onFinish}
      layout="vertical"
      className="bg-offWhite p-2"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-2">
        <FormDropdownItem
          label="Sample Type"
          name="sampleType"
          formField="sampleType"
          dropdownArray={sampleTypeDd}
          valueField="key"
          visibleField="value"
          onChange={handleChange}
          required
        />
        <FormDropdownItem
          label="Sample Lot"
          name="sampleLot"
          formField="sampleLot"
          dropdownArray={sampleLotDd}
          valueField="key"
          visibleField="value"
          onChange={handleChange}
          required
        />
        <FormDropdownItem
          label="Strand"
          name="strand"
          formField="strand"
          dropdownArray={strandDd}
          valueField="key"
          visibleField="value"
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-x-4">
        <FormInputItem
          label="Heat number"
          name="heatNo"
          onChange={handleChange}
        />
        <FormInputItem
          label="Sample ID"
          name="sampleId"
          rules={sampleIdRule}
          onChange={handleChange}
          disabled={railGrade === "880" || railGrade === "R260"}
        />
      </div>

      <div className="grid grid-cols-2 gap-y-4">
        <Checkbox
          checked={formData.chemical || false}
          onChange={(e) => handleChange("chemical", e.target.checked)}
        >
          Chemical .(P)
        </Checkbox>

        <Checkbox
          checked={formData.o2 || false}
          onChange={(e) => handleChange("o2", e.target.checked)}
        >
          O2
        </Checkbox>

        <Checkbox
          checked={formData.n2 || false}
          onChange={(e) => handleChange("n2", e.target.checked)}
        >
          N2
        </Checkbox>

        <Checkbox
          checked={formData.fwtSt || false}
          onChange={(e) => handleChange("fwtSt", e.target.checked)}
        >
          FWT (HS)
        </Checkbox>

        <Checkbox
          checked={formData.fwtHs || false}
          onChange={(e) => handleChange("fwtHs", e.target.checked)}
        >
          FWT (St.)
        </Checkbox>

        {(railGrade === RG_880 || railGrade === RG_R260) && (
          <Checkbox
            checked={formData.fwtStSr || false}
            onChange={(e) => handleChange("fwtStSr", e.target.checked)}
          >
            FWT (St.) - Sr
          </Checkbox>
        )}
      {
        (railGrade === RG_880 || railGrade === RG_R260) && 
        <Checkbox
          checked={formData.mechanical || false}
          onChange={(e) => handleChange("mechanical", e.target.checked)}
        >
          Mechanical
        </Checkbox>
      }

        <Checkbox
          checked={formData.tensileFoot || false}
          onChange={(e) => handleChange("tensileFoot", e.target.checked)}
        >
          Tensile Foot
        </Checkbox>

        <Checkbox
          checked={formData.sp || false}
          onChange={(e) => handleChange("sp", e.target.checked)}
        >
          SP
        </Checkbox>

        <Checkbox
          checked={formData.micro || false}
          onChange={(e) => handleChange("micro", e.target.checked)}
        >
          Micro
        </Checkbox>

        <Checkbox
          checked={formData.ir || false}
          onChange={(e) => handleChange("ir", e.target.checked)}
        >
          IR
        </Checkbox>

        <Checkbox
          checked={formData.decarb || false}
          onChange={(e) => handleChange("decarb", e.target.checked)}
        >
          Decarb
        </Checkbox>
        {(railGrade === RG_1080HH || railGrade === RG_R350HT || railGrade === RG_880NC) && (
          <>
            <Checkbox
              checked={formData.rsh || false}
              onChange={(e) => handleChange("rsh", e.target.checked)}
            >
              RSH
            </Checkbox>
            <Checkbox
              checked={formData.tensile || false}
              onChange={(e) => handleChange("tensile", e.target.checked)}
            >
              Tensile
            </Checkbox>
            <Checkbox
              checked={formData.ph || false}
              onChange={(e) => handleChange("ph", e.target.checked)}
            >
              PH
            </Checkbox>
          </>
        )}
      </div>

      <Btn htmlType="submit" className="flex mx-auto mt-4">
        {" "}
        Save{" "}
      </Btn>
    </Form>
  );
};

export default AcceptanceTestSample;
