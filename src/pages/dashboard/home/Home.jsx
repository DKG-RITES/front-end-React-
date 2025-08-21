import React from 'react'
import TableComponent from '../../../components/DKG_Table';

const Home = () => {

  const dataSource = [
    {
      date: "2024-11-18",
      shift: "A",
      sms: "SMS2",
      casterNo: "Caster1",
      railGrade: "GradeA",
      noOfHeatsCasted: 5,
      noOfHeatsRejected: 1,
      noOfDivertedHeats: 2,
      rejectedHeatNumbers: "heat003",
      weightOfHeatsCasted: 50.0,
      weightOfPrimeBlooms: 40.0,
      weightOfCOBlooms: 8.0,
      weightOfAcceptedBlooms: 48.0,
      weightOfRejectedBlooms: 2.0,
    },
    {
      date: "2024-11-19",
      shift: "C",
      sms: "SMS3",
      casterNo: "Caster2",
      railGrade: "GradeB",
      noOfHeatsCasted: 6,
      noOfHeatsRejected: 2,
      noOfDivertedHeats: 1,
      rejectedHeatNumbers: "heat007",
      weightOfHeatsCasted: 60.0,
      weightOfPrimeBlooms: 45.0,
      weightOfCOBlooms: 10.0,
      weightOfAcceptedBlooms: 55.0,
      weightOfRejectedBlooms: 5.0,
    },
    {
      date: "2024-11-20",
      shift: "B",
      sms: "SMS1",
      casterNo: "Caster3",
      railGrade: "GradeC",
      noOfHeatsCasted: 4,
      noOfHeatsRejected: 0,
      noOfDivertedHeats: 1,
      rejectedHeatNumbers: null,
      weightOfHeatsCasted: 40.0,
      weightOfPrimeBlooms: 35.0,
      weightOfCOBlooms: 4.0,
      weightOfAcceptedBlooms: 39.0,
      weightOfRejectedBlooms: 1.0,
    },
    {
      date: "2024-11-21",
      shift: "A",
      sms: "SMS2",
      casterNo: "Caster4",
      railGrade: "GradeA",
      noOfHeatsCasted: 7,
      noOfHeatsRejected: 1,
      noOfDivertedHeats: 3,
      rejectedHeatNumbers: "heat012",
      weightOfHeatsCasted: 70.0,
      weightOfPrimeBlooms: 50.0,
      weightOfCOBlooms: 15.0,
      weightOfAcceptedBlooms: 65.0,
      weightOfRejectedBlooms: 5.0,
    },
    {
      date: "2024-11-22",
      shift: "C",
      sms: "SMS3",
      casterNo: "Caster5",
      railGrade: "GradeD",
      noOfHeatsCasted: 3,
      noOfHeatsRejected: 0,
      noOfDivertedHeats: 0,
      rejectedHeatNumbers: null,
      weightOfHeatsCasted: 30.0,
      weightOfPrimeBlooms: 28.0,
      weightOfCOBlooms: 1.5,
      weightOfAcceptedBlooms: 29.5,
      weightOfRejectedBlooms: 0.5,
    },
  ];
  

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      searchable: true, // Enable search
    },
    {
      title: 'Shift',
      dataIndex: 'shift',
      key: 'shift',
      filterable: true, // Enable filter
    },
    {
      title: 'SMS',
      dataIndex: 'sms',
      key: 'sms',
      filterable: true, // Enable filter
    },
    {
      title: 'Caster Number',
      dataIndex: 'casterNo',
      key: 'casterNo',
      searchable: true, // Enable search
    },
    {
      title: 'Rail Grade',
      dataIndex: 'railGrade',
      key: 'railGrade',
      filterable: true, // Enable filter
    },
    {
      title: 'Number of Heats Casted',
      dataIndex: 'noOfHeatsCasted',
      key: 'noOfHeatsCasted',
    },
    {
      title: 'Number of Heats Rejected',
      dataIndex: 'noOfHeatsRejected',
      key: 'noOfHeatsRejected',
    },
    {
      title: 'Number of Diverted Heats',
      dataIndex: 'noOfDivertedHeats',
      key: 'noOfDivertedHeats',
    },
    {
      title: 'Rejected Heat Numbers',
      dataIndex: 'rejectedHeatNumbers',
      key: 'rejectedHeatNumbers',
    },
    {
      title: 'Weight of Heats Casted',
      dataIndex: 'weightOfHeatsCasted',
      key: 'weightOfHeatsCasted',
    },
    {
      title: 'Weight of Prime Blooms',
      dataIndex: 'weightOfPrimeBlooms',
      key: 'weightOfPrimeBlooms',
    },
    {
      title: 'Weight of CO Blooms',
      dataIndex: 'weightOfCOBlooms',
      key: 'weightOfCOBlooms',
    },
    {
      title: 'Weight of Accepted Blooms',
      dataIndex: 'weightOfAcceptedBlooms',
      key: 'weightOfAcceptedBlooms',
    },
    {
      title: 'Weight of Rejected Blooms',
      dataIndex: 'weightOfRejectedBlooms',
      key: 'weightOfRejectedBlooms',
    },
  ];
  

  return (
    <div>
      Home
    </div>
  )
}

export default Home
