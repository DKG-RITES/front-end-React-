import { Button, Table } from "antd";
import React, { useRef, useState } from "react";
import SearchFilter from "../sms/SearchFilter";
import IsoHeader from "../../../../components/DKG_IsoHeader";
import Subheading from "../sms/Subheading";
import { apiCall } from "../../../../utils/CommonFunctions";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";

const customRsL = [
  {
    key: "60E1",
    value: "60E1",
  },
  {
    key: "IRS52",
    value: "IRS52",
  },
  //   {
  //       key: "60E1A1",
  //       value: "60E1A1"
  //   }
];

const RollingControlIso60E1A1 = () => {
  const [formData, setFormData] = useState([]);
  const tableData = [
    {
      sampleNo: "SAMPLE",
      time: "TIME",
      heatNo: "heatNo",
      height: "height",
      head: "head",
      flange: "flange",
      web: "web",
      asymmetry: "asymmetry",
      footToeThickness: "footToeThickness",
      heightFishing: "heightFishing",
      weightTaken: "weightTaken",
      crownProfile: "crownProfile",
      footFlatness: "footFlatness",
      remarks: "remarks",
      remarks1: "---",
    },
    {
      sampleNo: "2",
      time: "10:30 AM",
      heatNo: "60 E1",
      height: "172 (±0.6)",
      head: "72 (±0.5)",
      flange: "150 (±1.0)",
      web: "16.5 (+1.0 / -0.5)",
      asymmetry: "±1.2",
      footToeThickness: "11.5 (+0.75/-0.5)",
      heightFishing: "89.50 (±0.6)",
      weightTaken: "60.21 (+1.5/-0.5%)",
      crownProfile: "Go / No-Go Gauges",
      footFlatness: "Concavity 0.3 mm (max.)",
      remarks: "---",
    },
  ];

  const railData = [
    {
      key: "1",
      type: "IRS52",
      height: "156 (+0.8/-0.4)",
      head: "67 (± 0.5)",
      flange: "136 (± 1.0)",
      web: "15.5 (+1.0/-0.5)",
      asymmetry: "± 1.2",
      footToeThickness: "---",
      heightFishing: "---",
      weightTaken: "51.89 (+1.5/-0.5)",
      crownProfile: "---",
      footFlatness: "0.4 mm (max.)",
      remarks: "---",
    },
    {
      key: "2",
      type: "60 E1",
      height: "172 (±0.6)",
      head: "72 (±0.5)",
      flange: "150 (±1.0)",
      web: "16.5 (+1.0/-0.5)",
      asymmetry: "± 1.2",
      footToeThickness: "11.5 (+0.75/-0.5)",
      heightFishing: "89.50 (±0.6)",
      weightTaken: "60.21 (+1.5/-0.5)",
      crownProfile: "---",
      footFlatness: "0.3 mm (max.)",
      remarks: "---",
    },
  ];
  const columns = [
    {
      title: "नमूना क्र.\nSample No.",
      dataIndex: "sampleNo",
      key: "sampleNo",
      width: 100,
    },
    {
      title: "समय\nTime",
      dataIndex: "time",
      key: "time",
      width: 100,
    },
    {
      title: "हीट नंबर\nHeat No.",
      dataIndex: "heatNo",
      key: "heatNo",
      width: 120,
    },
    {
      title: "अवलोकन (सभी मिमी में)\nObservations (All in mm)",
      children: [
        {
          title: "ऊँचाई\nHeight",
          dataIndex: "height",
          key: "height",
        },
        {
          title: "हेड\nHead",
          dataIndex: "head",
          key: "head",
        },
        {
          title: "फ्लैन्ज\nFlange",
          dataIndex: "flange",
          key: "flange",
        },
        {
          title: "वेब\nWeb",
          dataIndex: "web",
          key: "web",
        },
      ],
    },
    {
      title:
        "IRS T-12-2009 के अनुसार निर्दिष्ट आयाम\nSpecified dimension as per IRS T-12-2009",
      children: [
        {
          title: "Asymmetry / Verticality",
          dataIndex: "asymmetry",
          key: "asymmetry",
        },
        {
          title: "Foot Toe Thickness",
          dataIndex: "footToeThickness",
          key: "footToeThickness",
        },
        {
          title: "Height of Fishing",
          dataIndex: "heightOfFishing",
          key: "heightOfFishing",
        },
      ],
    },
    {
      title: "लिया गया वजन (किग्रा/मी)\nWeight Taken (Kg/M)",
      dataIndex: "weightTaken",
      key: "weightTaken",
    },
    {
      title: "गौ/ नो-गौ गेज\nGo/No-Go Gauges",
      dataIndex: "goNoGoGauges",
      key: "goNoGoGauges",
    },
    {
      title: "फुट समतलता\nFoot Flatness",
      dataIndex: "footFlatness",
      key: "footFlatness",
    },
    {
      title: "टिप्पणियाँ\nRemarks",
      dataIndex: "remarks",
      key: "remarks",
    },
  ];

  const { token } = useSelector((state) => state.auth);
  console.log("Fprmdata: ", formData);

  const mergeHeatDetails = (data, formData) => {
    if (!data || data.length === 0) return null;

    // Pick vernierNumber, micrometerNumber, numberOfGauges from the first object
    const { vernierNumber, micrometerNumber, numberOfGauges } = data[0];

    // Merge all heatDtlList arrays
    const heatDtlList = data.flatMap((item) => item.heatDtlList || []);

    return {
      vernierNumber,
      micrometerNumber,
      numberOfGauges,
      heatDtlList,
      shift: formData?.shift,
      date: formData?.date,
      railGrade: formData?.railGrade,
    };
  };

  const onFinish = async (formData) => {
    console.log("ONFINISH: ", formData)
    try {
      const { data } = await apiCall(
        "POST",
        "/iso/getRollingControlDtls",
        token,
        { ...formData, railSection: "60E1A1" }
      );
      setFormData(mergeHeatDetails(data?.responseData, formData));
    } catch (error) {
      console.log(error);
    }
  };

  const repRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => repRef.current,
    documentTitle: "rolling_control_60e1a1", // Set custom filename
  });
  return (
    <div>
      {/* <Table dataSource={railData} columns={columns} pagination={false} bordered  title={() => (
        <strong style={{ fontSize: "16px", textAlign: "center", display: "block" }}>
          IRS T-12-2009 के अनुसार निर्दिष्ट आयाम | Specified dimension as per IRS T-12-2009
        </strong>
      )}/>; */}

      <SearchFilter
        showDate
        showShift
        showRailGrade
        // showSms
        // showRailSection
        // customRsL = {customRsL}
        onFinish={onFinish}
      />
      <div className="a4-container" ref={repRef}>
        <IsoHeader
          engTitle="FORMAT FOR ROLLING STAGE CONTROL 60E1A1 <br /> (Clause No. 8.5 of ISO 9001:2015)"
          hinTitle="रोलिंग चरण नियंत्रण के लिए प्रारूप (60ई1ए1)"
          col3AdtnlLine="APPROVED DIVISIONAL HEAD"
        />
        <Subheading
          formatNo="F/CR-BSP/7.5/17/05"
          page="1 OF 1"
          pageRev="NIL"
          effDate="12/05/2021"
          dsVis
          dsVal={formData?.date + " - " + formData?.shift}
          grdVis
          grdVal={formData?.railGrade}
          stdWtVis
          stdWtVal={formData?.heatDtlList?.[0].weight}
          mmVis
          mmVal={formData?.micrometerNumber}
          vVis
          vVal={formData?.vernierNumber}
          ggVis
          ggVal={formData?.numberOfGauges}
        />
        <div style={{ overflowX: "auto" }} className="iso-table">
          <table
            className="iso-table"
            border="1"
            style={{
              borderCollapse: "collapse",
              width: "100%",
              textAlign: "center",
            }}
          >
            <thead>
              <tr>
                <th
                  rowSpan="2"
                  style={{ padding: "5px", border: "1px solid black" }}
                >
                  नमूना क्रम.
                  <br />
                  Sample No.
                </th>
                <th
                  rowSpan="2"
                  style={{ padding: "5px", border: "1px solid black" }}
                >
                  समय
                  <br />
                  Time
                </th>
                <th
                  rowSpan="2"
                  style={{ padding: "5px", border: "1px solid black" }}
                >
                  हीट नंबर
                  <br />
                  Heat No.
                </th>
                <th
                  colSpan="4"
                  style={{ padding: "5px", border: "1px solid black" }}
                >
                  अवलोकन (सभी मिमी में)
                  <br />
                  Observations (All in mm)
                </th>
                {/* <th
                  rowSpan="2"
                  style={{ padding: "5px", border: "1px solid black" }}
                >
                  Asymmetry / Verticality
                </th> */}
                <th
                  rowSpan="2"
                  style={{ padding: "5px", border: "1px solid black" }}
                >
                  Foot Toe Thickness
                </th>
                <th
                  rowSpan="2"
                  style={{ padding: "5px", border: "1px solid black" }}
                >
                  Height of Fishing
                </th>
                <th
                  rowSpan="2"
                  style={{ padding: "5px", border: "1px solid black" }}
                >
                  लिया गया वजन (किग्रा/मी)
                  <br />
                  Weight Taken (Kg/M)
                </th>
                <th
                  rowSpan="2"
                  style={{ padding: "5px", border: "1px solid black" }}
                >
                  # माप प्रोफ़ाइल
                  <br />
                  Crown Profile
                </th>
                <th
                  rowSpan="2"
                  style={{ padding: "5px", border: "1px solid black" }}
                >
                  फुट बेस अवतलता
                  <br />
                  Foot Base Concavity
                </th>
                <th
                  rowSpan="2"
                  style={{ padding: "5px", border: "1px solid black" }}
                >
                  टिप्पणियाँ
                  <br />
                  Remarks
                </th>
              </tr>

              <tr>
                <th>
                  ऊँचाई
                  <br />
                  Height
                </th>
                <th>
                  हेड
                  <br />
                  Head
                </th>
                <th>
                  फ्लैंज
                  <br />
                  Flange
                </th>
                <th>
                  वेब
                  <br />
                  Web
                </th>
              </tr>
            </thead>

            <thead>
              <tr>
                <th
                  colSpan={14}
                  style={{
                    padding: "5px",
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  IRS T-12-2009 के अनुसार निर्दिष्ट आयाम Specified dimension as
                  per IRS T – 12 – 2009
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan={3} className="cell-style">
                  60E1A1
                </td>
                <td className="cell-style">134(+0.7mm)</td>
                <td className="cell-style">72(+0.5mm)</td>
                <td className="cell-style">140(+1.0mm)</td>
                <td className="cell-style">44 (+0.7mm)</td>
                <td className="cell-style">±0.6 mm</td>
                <td className="cell-style">±0.5 mm</td>
                <td className="cell-style">72.97(+1.5/-0.5%)</td>
                <td className="cell-style">±0.6 mm</td>
                <td className="cell-style">0.3mm max</td>
                <td className="cell-style">---</td>
                {/* <td className="cell-style">---</td> */}
              </tr>
              {/* <tr>
                <td colSpan={3} className="cell-style">
                  60E1
                </td>
                <td className="cell-style">172(±0.6)</td>
                <td className="cell-style">72(±0.5)</td>
                <td className="cell-style">150(±1.0)</td>
                <td className="cell-style">16.5 (+1.0 / - 0.5)</td>
                <td className="cell-style">± 1.2</td>
                <td className="cell-style">11.5(+0.75/-0.5)</td>
                <td className="cell-style">89.50(±0.6)</td>
                <td className="cell-style">60.21(+1.5 /- 0.5%)</td>
                <td className="cell-style">Go/ No-Go Gauges</td>
                <td className="cell-style">Concavity 0.3mm (max)</td>
              </tr> */}
              {formData?.heatDtlList?.map((row, index) => (
                <tr key={index}>
                  <td style={{ padding: "5px", border: "1px solid black" }}>
                    {row.sampleNumber || "---"}
                  </td>
                  <td style={{ padding: "5px", border: "1px solid black" }}>
                    {row.timing || "---"}
                  </td>
                  <td style={{ padding: "5px", border: "1px solid black" }}>
                    {row.heatNumber || "---"}
                  </td>
                  <td style={{ padding: "5px", border: "1px solid black" }}>
                    {row.height || "---"}
                  </td>
                  <td style={{ padding: "5px", border: "1px solid black" }}>
                    {row.head || "---"}
                  </td>
                  <td style={{ padding: "5px", border: "1px solid black" }}>
                    {row.flange || "---"}
                  </td>
                  <td style={{ padding: "5px", border: "1px solid black" }}>
                    {row.web || "---"}
                  </td>
                  {/* <td style={{ padding: "5px", border: "1px solid black" }}>
                    {row.asy || "---"}
                  </td> */}
                  <td style={{ padding: "5px", border: "1px solid black" }}>
                    {row.footToe || "---"}
                  </td>
                  <td style={{ padding: "5px", border: "1px solid black" }}>
                    {row.fishingHeight || "---"}
                  </td>
                  <td style={{ padding: "5px", border: "1px solid black" }}>
                    {row.weight || "---"}
                  </td>
                  <td style={{ padding: "5px", border: "1px solid black" }}>
                    {row.crownProfile || "---"}
                  </td>
                  <td style={{ padding: "5px", border: "1px solid black" }}>
                    {row.footFlatness || "---"}
                  </td>
                  <td style={{ padding: "5px", border: "1px solid black" }}>
                    {row.remark || "---"}
                  </td>
                </tr>
              ))}

              <tr className="border border-black">
                <td colSpan={7} className="text-left py-8 px-4 font-semibold">
                  ब्रांडिंग / Branding: ......................
                </td>
                <td colSpan={7} className="text-right px-4">
                  हस्ताक्षर / Signature: .............................
                </td>
              </tr>
            </tbody>
          </table>

          <div className="grid grid-cols-2">
            <h3 className="!text-xs">
              *Fishing Gauge: <br /> (-) Must Touch <br /> (+) Must Not Touch
            </h3>
            <h3 className="!text-xs">
              *** Using Go-No Go gauges <br /> # Crown Profile : Class A/Class
              B/Not OK
            </h3>
            {/* <h3>*Fishing Gauge : (-) Must Touch</h3>
            <h3>*Fishing Gauge : (-) Must Touch</h3> */}
          </div>
        </div>
      </div>
      <Button
        onClick={handlePrint}
        className="my-8 w-full mx-auto bg-darkBlueHover text-white"
      >
        Print
      </Button>
    </div>
  );
};

export default RollingControlIso60E1A1;
