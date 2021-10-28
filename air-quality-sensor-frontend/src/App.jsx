import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "./App.css";
import {
  getLatest24HoursAirQualityMeasurement,
  getLatest365DaysAirQualityMeasurement,
  getLatest30DaysAirQualityMeasurement,
} from "./api";

const App = () => {
  const [dayTrend, setDayTrend] = useState([]);
  const [monthTrend, setMonthTrend] = useState([]);
  const [yearTrend, setYearTrend] = useState([]);

  const fetchData = () => {
    getLatest24HoursAirQualityMeasurement().then((data) => {
      setDayTrend(data.measurements);
    });
    getLatest30DaysAirQualityMeasurement().then((data) => {
      setMonthTrend(data.measurements);
    });
    getLatest365DaysAirQualityMeasurement().then((data) => {
      setYearTrend(data.measurements);
    });
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      getLatest24HoursAirQualityMeasurement().then((data) => {
        setDayTrend(data.measurements);
      });
    }, 60 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const renderLineChart = (data) => (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="created_at" tickMargin={10} />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Line type="monotone" dataKey="pm2p5" stroke="#8884d8" name="PM 2.5" />
        <Line type="monotone" dataKey="pm10" stroke="#82ca9d" name="PM 10" />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderDayTrend = () => (
    <div className="mb-6 mr-3">
      <h2 className="title" style={{ textAlign: "center" }}>
        Daily trend
      </h2>
      <div style={{ height: "20rem" }}>{renderLineChart(dayTrend)}</div>
    </div>
  );

  const renderMonthTrend = () => (
    <div className="mb-6 mr-6">
      <h2 className="title" style={{ textAlign: "center" }}>
        Monthly trend
      </h2>
      <div style={{ height: "20rem" }}>{renderLineChart(monthTrend)}</div>
    </div>
  );

  const renderYearTrend = () => (
    <div className="mb-6 mr-6">
      <h2 className="title" style={{ textAlign: "center" }}>
        Yearly trend
      </h2>
      <div style={{ height: "20rem" }}>{renderLineChart(yearTrend)}</div>
    </div>
  );

  return (
    <div className="container is-max-widescreen mt-6">
      {dayTrend && dayTrend.length > 1 && renderDayTrend()}
      {monthTrend && monthTrend.length > 1 && renderMonthTrend()}
      {yearTrend && yearTrend.length > 1 && renderYearTrend()}
    </div>
  );
};

export default App;
