import React, { useRef, useState } from 'react'
import SearchFilter from '../sms/SearchFilter'
import IsoHeader from '../../../../components/DKG_IsoHeader';
import Subheading from '../sms/Subheading';
import { Button } from 'antd';
import { useReactToPrint } from 'react-to-print';

const SriFinalInsp = () => {
    const repRef = useRef();
    const [formData, setFormData] = useState({})

      const handlePrint = useReactToPrint({
        content: () => repRef.current,
        documentTitle: "sri_final_insp", // Set custom filename
      });
  return (
    <>
    <SearchFilter showDate showShift showRailGrade showRailSection />
    <div className="a4-container" ref={repRef}>
        <IsoHeader 
            engTitle="FORMAT FOR FINAL INSPECTION REPORT <br /> Clause No. 8.5 of ISO:9001:2015"
            hinTitle="अंतिम निरीक्षण रिपोर्ट के लिए प्रारूप"
            col3AdtnlLine="APPROVED DIVISONAL HEAD"
        />
        <Subheading

        formatNo="F/CR-BSP-7.5-16-01"
        page="1 OF 1"
        pageRev="NIL"
        textVis
        textVal="अंतिम निरीक्षण रिपोर्ट / FINAL INSPECTION REPORT"
        dsVis
        dsVal={FormData.date + " - " + FormData.shift}
        grdVis grdVal={formData.railGrade}
        secVis secVal={formData.railSection}
        />
    <div className='overflow-x-auto iso-table'>
      <table className="table-style iso-table">
  <thead>
    <tr>
      <th className="cell-style" rowSpan="2">Description</th>
      <th className="cell-style" colSpan="2">52 Kg</th>
      <th className="cell-style" colSpan="2">60 Kg</th>
      <th className="cell-style" rowSpan="2">Length</th>
      <th className="cell-style" colSpan="3">Lengthwise Acceptance</th>
      <th className="cell-style" colSpan="3">60 Kg</th>
    </tr>
    <tr>
      <th className="cell-style">13M</th>
      <th className="cell-style">26M</th>
      <th className="cell-style">13M</th>
      <th className="cell-style">26M</th>
      <th className="cell-style">CL-A</th>
      <th className="cell-style">CL-B</th>
      <th className="cell-style">IU</th>
      <th className="cell-style">CL-A</th>
      <th className="cell-style">CL-B</th>
      <th className="cell-style">IU</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="cell-style" rowSpan="2">PRIME QUALITY</td>
      <td className="cell-style" colSpan="2">Class - A</td>
      <td className="cell-style" colSpan="2">Class - B</td>
      <td className="cell-style">26M</td>
      <td className="cell-style" colSpan="6"></td>
    </tr>
    <tr>
      <td className="cell-style" colSpan="2">IU RAILS</td>
      <td className="cell-style">25M</td>
      <td className="cell-style" colSpan="6"></td>
    </tr>
    <tr>
      <td className="cell-style">Rejection</td>
      <td className="cell-style" colSpan="4"></td>
      <td className="cell-style">24M</td>
      <td className="cell-style" colSpan="6"></td>
    </tr>
    <tr>
      <td className="cell-style">Total Classified</td>
      <td className="cell-style">13M</td>
      <td className="cell-style" colSpan="9"></td>
    </tr>
    <tr>
      <td className="cell-style">Cut Bar</td>
      <td className="cell-style">12M</td>
      <td className="cell-style" colSpan="9"></td>
    </tr>
    <tr>
      <td className="cell-style">Refinish</td>
      <td className="cell-style">11M</td>
      <td className="cell-style" colSpan="9"></td>
    </tr>
    <tr>
      <td className="cell-style">Total Inspected</td>
      <td className="cell-style">10M</td>
      <td className="cell-style" colSpan="9"></td>
    </tr>

    {/* REJECTION ANALYSIS */}
    <tr>
      <th className="cell-style" colSpan="11">REJECTION ANALYSIS</th>
    </tr>
    <tr>
      <th className="cell-style" colSpan="2">52 Kg</th>
      <th className="cell-style" colSpan="2">60 Kg</th>
      <th className="cell-style" colSpan="2"></th>
      <th className="cell-style" colSpan="2">52 Kg</th>
      <th className="cell-style" colSpan="2">60 Kg</th>
    </tr>
    <tr>
      <th className="cell-style">Reason</th>
      <th className="cell-style">13M</th>
      <th className="cell-style">26M</th>
      <th className="cell-style">Reason</th>
      <th className="cell-style">13M</th>
      <th className="cell-style">26M</th>
      <th className="cell-style">Reason</th>
      <th className="cell-style">13M</th>
      <th className="cell-style">26M</th>
      <th className="cell-style">Reason</th>
      <th className="cell-style">13M</th>
      <th className="cell-style">26M</th>
    </tr>
    {/* Data Rows */}
    {[
      ['NMI', 'KK', '', 'NMI', '', '', 'NMI', 'KK', '', 'NMI', 'KK', ''],
      ['MDF', 'WY', '', 'MDF', '', '', 'MDF', 'WY', '', 'MDF', 'WY', ''],
      ['MDM', 'TW', '', 'MDM', '', '', 'MDM', 'TW', '', 'MDM', 'TW', ''],
      ['HS', 'C-R/C', '', 'HS', '', '', 'HS', 'C-R/C', '', 'HS', 'C-R/C', ''],
      ['LS', 'NS', '', 'LS', '', '', 'LS', 'NS', '', 'LS', 'NS', ''],
      ['HH', 'OL', '', 'HH', '', '', 'HH', 'OL', '', 'HH', 'OL', ''],
      ['LH', 'SL', '', 'LH', '', '', 'LH', 'SL', '', 'LH', 'SL', ''],
      ['NF', 'BM', '', 'NF', '', '', 'NF', 'BM', '', 'NF', 'BM', ''],
      ['WF', 'OS', '', 'WF', '', '', 'WF', 'OS', '', 'WF', 'OS', ''],
      ['OHT', 'NHN', '', 'OHT', '', '', 'OHT', 'NHN', '', 'OHT', 'NHN', ''],
      ['UHT', 'ASY', '', 'UHT', '', '', 'UHT', 'ASY', '', 'UHT', 'ASY', ''],
      ['TNW', 'RM', '', 'TNW', '', '', 'TNW', 'RM', '', 'TNW', 'RM', ''],
      ['TKW', 'SCB', '', 'TKW', '', '', 'TKW', 'SCB', '', 'TKW', 'SCB', ''],
      ['LAP', 'WS', '', 'LAP', '', '', 'LAP', 'WS', '', 'LAP', 'WS', ''],
      ['GM', 'HNP', '', 'GM', '', '', 'GM', 'HNP', '', 'GM', 'HNP', ''],
      ['BR', 'OTHERS', '', 'BR', '', '', 'BR', 'OTHERS', '', 'BR', 'OTHERS', '']
    ].map((row, idx) => (
      <tr key={idx}>
        {row.map((cell, index) => (
          <td key={index} className="cell-style">{cell}</td>
        ))}
      </tr>
    ))}

    {/* REMARKS */}
    <tr>
      <th className="cell-style" colSpan="12">REMARKS / ABNORMALITY</th>
    </tr>
    <tr>
      <td className="cell-style" colSpan="2">STATUS</td>
      <td className="cell-style">13M</td>
      <td className="cell-style">26M</td>
      <td className="cell-style" colSpan="8"></td>
    </tr>
    <tr>
      <td className="cell-style" colSpan="2">UTNP</td>
      <td className="cell-style" colSpan="10"></td>
    </tr>
    <tr>
      <td className="cell-style" colSpan="2">UT NP(R)</td>
      <td className="cell-style" colSpan="10"></td>
    </tr>

    {/* SIGNATURE */}
    <tr>
      <td className="cell-style" colSpan="6">Signature</td>
      <td className="cell-style" colSpan="6">Name</td>
    </tr>
  </tbody>
</table>

    </div>
    </div>
    <Button
          onClick={handlePrint}
          className="my-8 w-full mx-auto bg-darkBlueHover text-white"
        >
          Print
        </Button>
    </>
  )
}

export default SriFinalInsp
