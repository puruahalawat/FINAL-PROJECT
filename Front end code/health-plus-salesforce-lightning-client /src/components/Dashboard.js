import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import SummaryCard from "./SummaryCard";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    activeMemberships: 0,
    inactiveMemberships: 0,
    expiringMemberships: 0,
    upcomingClasses: [],
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const token = localStorage.getItem("token");
        const [
          membershipsResponse,
          inactiveMembershipsResponse,
          expiringMembershipsResponse,
          classesResponse,
        ] = await Promise.all([
          fetch("http://localhost:8080/members/active", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch("http://localhost:8080/members/inactive", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch("http://localhost:8080/members/expiring-soon", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch("http://localhost:8080/classes/upcoming", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const membershipsData = await membershipsResponse.json();
        const inactiveMembershipsData =
          await inactiveMembershipsResponse.json();
        const expiringMembershipsData =
          await expiringMembershipsResponse.json();
        const classesData = await classesResponse.json();

        setMetrics({
          activeMemberships: membershipsData.length,
          inactiveMemberships: inactiveMembershipsData.length,
          expiringMemberships: expiringMembershipsData.length,
          upcomingClasses: classesData,
        });
      } catch (error) {
        console.error("Error fetching metrics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div className="dashboard space-y-10 p-4">
      <h1 className="text-2xl">Health Plus Dashboard</h1>
      <div className="space-y-5">
        <h3 className="text-xl font-bold">Membership Statistics</h3>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          <SummaryCard
            isLoading={loading}
            title="Active"
            count={metrics.activeMemberships}
          />
          <SummaryCard
            isLoading={loading}
            title="Inactive"
            count={metrics.inactiveMemberships}
          />
          <div>
            <SummaryCard
              isLoading={loading}
              title="Expiring Soon (within 30 days)"
              count={metrics.expiringMemberships}
            />
          </div>
        </div>
      </div>
      <div className="space-y-5">
        <h3 className="text-xl font-bold">Upcoming Classes</h3>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          {metrics.upcomingClasses.map((class_) => (
            <div
              key={class_.id}
              className="class-item bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8"
            >
              <h4>{class_.name}</h4>
              <p>Date: {new Date(class_.startTime).toLocaleDateString()}</p>
              <p>
                Time: {new Date(class_.startTime).toLocaleTimeString()} -{" "}
                {new Date(class_.endTime).toLocaleTimeString()}
              </p>
              <p>Instructor: {class_.instructor?.name || "Not assigned"}</p>
              <p>Capacity: {class_.capacity}</p>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="metrics-grid">
        <div className="metric-card membership-stats">
          <h3>Membership Statistics</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <label>Active</label>
              <div className="stat-value active">
                {metrics.activeMemberships}
              </div>
            </div>
            <div className="stat-item">
              <label>Inactive</label>
              <div className="stat-value inactive">
                {metrics.inactiveMemberships}
              </div>
            </div>
            <div className="stat-item">
              <label>Expiring Soon</label>
              <div className="stat-value expiring">
                {metrics.expiringMemberships}
              </div>
              <div className="stat-subtitle">within 30 days</div>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <h3>Upcoming Classes</h3>
          <div className="classes-list">
            {metrics.upcomingClasses.map((class_) => (
              <div key={class_.id} className="class-item">
                <h4>{class_.name}</h4>
                <p>Date: {new Date(class_.startTime).toLocaleDateString()}</p>
                <p>
                  Time: {new Date(class_.startTime).toLocaleTimeString()} -{" "}
                  {new Date(class_.endTime).toLocaleTimeString()}
                </p>
                <p>Instructor: {class_.instructor?.name || "Not assigned"}</p>
                <p>Capacity: {class_.capacity}</p>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
