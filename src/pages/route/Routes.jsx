import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import PrivateRoutes from "./PrivateRoutes";
import LayoutWithDashboard from "./LayoutWithDashboard";
import Login from "../auth/Login";
import PageNotFound from "../pageNotFound/PageNotFound";
import SmsDutyEnd from "../dashboard/duty/sms/endDuty/SmsDutyEnd";
import SmsBloomInspection from "../dashboard/duty/sms/bloomInspection/SmsBloomInspection";
import ShiftReports from "../dashboard/duty/sms/shiftReports/ShiftReports";
import SmsHeatList from "../dashboard/duty/sms/heatList/SmsHeatList";
import SmsCheckList from "../dashboard/duty/sms/checkList/SmsCheckList";
import SmsVerification from "../dashboard/duty/sms/verification/SmsVerification";
import SmsHeatSummary from "../dashboard/duty/sms/heatSummary/SmsHeatSummary";
import VIShiftDetailsForm from "../dashboard/duty/visualInspection/shiftDetails/ShiftDetailsForm";
import Home from "../dashboard/duty/visualInspection/home/Home";
import VIShiftSummary from "../dashboard/duty/visualInspection/shiftSummary/VIShiftSummary";
import VisualInspectionForm from "../dashboard/duty/visualInspection/inspection/VisualInspectionForm";
import StageShiftDetailsForm from "../dashboard/duty/stage/rollingStage/shiftDetails/ShiftDetailsForm";
import StageHome from "../dashboard/duty/stage/rollingStage/home/Home";
import NDTStartDutyForm from "../dashboard/duty/ndt/shiftDetails/StartDutyForm";
import NDTHome from "../dashboard/duty/ndt/home/Home";
import NCalibrationForm from "../dashboard/duty/ndt/calibration/NCalibrationForm";
import NReport from "../dashboard/duty/ndt/report/NReport";
import SmsDutyStartForm from "../dashboard/duty/sms/startDuty/SmsDutyStartForm";
import CalibrationList from '../dashboard/duty/calibration/calibrationList/CalibrationList';
import NewCalibrationForm from '../dashboard/duty/calibration/newCalibration/NewCalibrationForm';
import BulkCalibrationForm from '../dashboard/duty/calibration/bulkCalibration/BulkCalibrationForm';
import QctSampleList from '../dashboard/duty/qct/qctSampleList/QctSampleList';
import QctSampleDeclarationForm from '../dashboard/duty/qct/newSampleDeclaration/QctSampleDeclarationForm';
import SrInspectionHome from '../dashboard/duty/srInspection/srInspectionHome/SrInspectionHome';
import SrNewInspectionForm from '../dashboard/duty/srInspection/srNewInspection/SrNewInspectionForm';
import WsRemarks from '../dashboard/duty/srInspection/wsRemarks/WsRemarks';
import TestSampleList from '../dashboard/duty/stage/testSampleMarking/testSampleList/TestSampleList';
import NewTestSampleDeclaration from "../dashboard/duty/stage/testSampleMarking/newTestSample/NewTestSampleDeclaration";
import RollingControlForm from "../dashboard/duty/stage/rollingStage/rollingControl/RollingControlForm";
import RollingControl60E1 from "../dashboard/duty/stage/rollingStage/rollingControl60E1/RollingControl60E1";
import RollingControlIRS52 from "../dashboard/duty/stage/rollingStage/rollingControlIRS52/RollingControlIRS52";
import RollingControl60E1A1 from "../dashboard/duty/stage/rollingStage/rollingControl60E1A1/RollingControl60E1A1";
import HtSequence from "../dashboard/duty/stage/rollingStage/htSequence/HtSequence";

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<LayoutWithDashboard />}>
            <Route index element={<Dashboard />} />
            <Route path="/sms">
              <Route index element={<SmsDutyStartForm />} />
              <Route path="heatSummary" element={<SmsHeatSummary />} />
              <Route path="dutyStart" element={<SmsDutyStartForm />} />
              <Route path="dutyEnd" element={<SmsDutyEnd />} />
              <Route path="bloomInspection" element={<SmsBloomInspection />} />
              <Route path="shiftReports">
                <Route index element={<ShiftReports />} />
                <Route path="heatList" element={<SmsHeatList />} />
                <Route path="checkList" element={<SmsCheckList />} />
                <Route path="verification" element={<SmsVerification />} />
              </Route>
            </Route>

            <Route path="/stage">
              <Route index element={<StageShiftDetailsForm />} />
              <Route path="startDuty" element={<StageShiftDetailsForm />} />
              <Route path="home" element={<StageHome />} />
              <Route path="rollingControl" element={<RollingControlForm />} />
              <Route path="rollingControl/rollingControlSample60E1" element={<RollingControl60E1 />} />
              <Route path="rollingControl/rollingControlSampleIRS52" element={<RollingControlIRS52 />} />
              <Route path="rollingControl/rollingControlSample60E1A1" element={<RollingControl60E1A1 />} />
              <Route path="htSequence" element={<HtSequence />} />
              <Route path="testSampleMarkingList" element={<TestSampleList />} />
              <Route path="newTestSampleDeclaration" element={<NewTestSampleDeclaration />} />
            </Route>

            <Route path="/ndt">
              <Route index element={<NDTStartDutyForm />} />
              <Route path="startDuty" element={<NDTStartDutyForm />} />
              <Route path="home" element={<NDTHome />} />
              <Route path="calibration" element={<NCalibrationForm />} />
              <Route path="report" element={<NReport />} />
            </Route>

            <Route path="/visual">
              <Route index element={<VIShiftDetailsForm />} />
              <Route path="startDuty" element={<VIShiftDetailsForm />} />
              <Route path="home" element={<Home />} />
              <Route path="inspection" element={<VisualInspectionForm />} />
              <Route path="summary" element={<VIShiftSummary />} />
            </Route>

            <Route path="/srInspection">
              <Route index element={<SrInspectionHome />} />
              <Route path="addNewInspection" element={<SrNewInspectionForm />} />
              <Route path="wsRemarks" element={<WsRemarks />} />
            </Route>

            <Route path="/qct">
              <Route index element={<QctSampleList />} />
              <Route path="sampleList" element={<QctSampleList />} />
              <Route path="newSampleDeclaration" element={<QctSampleDeclarationForm />} />
            </Route>

            <Route path='/calibration'>
              <Route index element={<CalibrationList />} />
              <Route path='list' element={<CalibrationList />} />
              <Route path='newModifyCalibration' element={<NewCalibrationForm />} />
              <Route path='bulkCalibration' element={<BulkCalibrationForm  />} />
            </Route>
          </Route>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;
