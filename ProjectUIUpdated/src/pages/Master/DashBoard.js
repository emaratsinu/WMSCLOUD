import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import avatar1 from "../../assets/images/users/usericon.png";
import profileImg from "../../assets/images/profile-img.png";

const Dashboard = () => {
  const [jobSalesData, setJobSalesData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    setJobSalesData([
      { month: "Jan", jobs: 40 },
      { month: "Feb", jobs: 55 },
      { month: "Mar", jobs: 30 },
      { month: "Apr", jobs: 70 },
    ]);

    setIncomeData([
      { month: "Jan", income: 4000 },
      { month: "Feb", income: 5000 },
      { month: "Mar", income: 3200 },
      { month: "Apr", income: 7100 },
    ]);

    setJobList([
      { id: 1, job: "Oil Change", mechanic: "John Doe", cost: "$50" },
      { id: 2, job: "Tire Replacement", mechanic: "Jane Smith", cost: "$80" },
      { id: 3, job: "Brake Repair", mechanic: "Mike Johnson", cost: "$120" },
    ]);
  }, []);

  return (
    <div className="container-fluid px-4" style={{ marginTop: "120px", paddingBottom: "20px" }}>
      
      {/* Welcome Grid Section */}
      <Card className="overflow-hidden mb-4 shadow">
        <div className="bg-primary-subtle">
          <Row>
            <Col xs="7">
              <div className="text-primary p-3">
                <h5 className="text-primary">Welcome Back!</h5>
                <p>Garage Management System</p>
              </div>
            </Col>
            <Col xs="5" className="align-self-end">
            <img src={profileImg} alt="" className="img-fluid" style={{ height: "100px" }} />

            </Col>
          </Row>
        </div>
        <CardBody className="pt-0">
          <Row>
            <Col sm="4">
              <div className="avatar-md profile-user-wid mb-4">
                <img
                  src={avatar1}
                  alt="User Avatar"
                  className="img-thumbnail rounded-circle"
                />
              </div>
              <h5 className="font-size-15 text-truncate">Admin </h5>
             
            </Col>

           
          </Row>
        </CardBody>
      </Card>

      <div className="row">
        {/* Job Sales Bar Chart */}
        <div className="col-md-6 mb-5">
          <Card className="shadow">
            <CardBody>
              <CardTitle tag="h5" className="text-primary">Job Card Sales</CardTitle>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={jobSalesData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="jobs" fill="#4CAF50" />
                </BarChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </div>

        {/* Income Line Chart */}
        <div className="col-md-6 mb-5">
          <Card className="shadow">
            <CardBody>
              <CardTitle tag="h5" className="text-primary">Income Overview</CardTitle>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={incomeData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="income" stroke="#ff7300" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </div>

        {/* Job List Table */}
        <div className="col-12">
          <Card className="shadow">
            <CardBody>
              <CardTitle tag="h5" className="text-primary">Recent Jobs</CardTitle>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Job Type</th>
                    <th>Mechanic</th>
                    <th>Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {jobList.map((job, index) => (
                    <tr key={job.id}>
                      <td>{index + 1}</td>
                      <td>{job.job}</td>
                      <td>{job.mechanic}</td>
                      <td>{job.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
