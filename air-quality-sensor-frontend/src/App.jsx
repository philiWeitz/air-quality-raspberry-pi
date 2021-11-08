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
  getLatest24HoursTemperatureMeasurement,
  getLatest30DaysTemperatureMeasurement,
  getLatest365DaysTemperatureMeasurement,
} from "./api";
import { ChocoboAnimation } from "./ChocoboAnimation";
import { CustomPieChart } from "./CustomPieChart";

const App = () => {
  const [dayAirTrend, setDayAirTrend] = useState([]);
  const [monthAirTrend, setMonthAirTrend] = useState([]);
  const [yearAirTrend, setYearAirTrend] = useState([]);

  const [dayTemperatureTrend, setDayTemperatureTrend] = useState([]);
  const [monthTemperatureTrend, setMonthTemperatureTrend] = useState([]);
  const [yearTemperatureTrend, setYearTemperatureTrend] = useState([]);

  const [showAnimation, setShowAnimation] = useState(false);

  const fetchData = () => {
    getLatest24HoursAirQualityMeasurement().then((data) => {
      setDayAirTrend(data.measurements);
    });
    getLatest30DaysAirQualityMeasurement().then((data) => {
      setMonthAirTrend(data.measurements);
    });
    getLatest365DaysAirQualityMeasurement().then((data) => {
      setYearAirTrend(data.measurements);
    });

    getLatest24HoursTemperatureMeasurement().then((data) => {
      setDayTemperatureTrend(data.measurements);
    });
    getLatest30DaysTemperatureMeasurement().then((data) => {
      setMonthTemperatureTrend(data.measurements);
    });
    getLatest365DaysTemperatureMeasurement().then((data) => {
      setYearTemperatureTrend(data.measurements);
    });
  };

  useEffect(() => {
    fetchData();

    setTimeout(() => setShowAnimation(true), 10000);

    const intervalId = setInterval(() => {
      getLatest24HoursAirQualityMeasurement().then((data) => {
        setDayAirTrend(data.measurements);
      });
      getLatest24HoursTemperatureMeasurement().then((data) => {
        setDayTemperatureTrend(data.measurements);
      });
    }, 60 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const renderAirLineChart = (data) => (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" tickMargin={10} />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Line
          type="monotone"
          dataKey="pm2p5"
          stroke="#8884d8"
          name="PM 2.5"
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="pm10"
          stroke="#82ca9d"
          name="PM 10"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderTemperatureLineChart = (data) => (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" tickMargin={10} />
        <YAxis domain={["auto", "auto"]} />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Line
          type="monotone"
          dataKey="temperature"
          stroke="#8884d8"
          name="Temperature"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderHumidityLineChart = (data) => (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" tickMargin={10} />
        <YAxis domain={["auto", "auto"]} />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Line
          type="monotone"
          dataKey="humidity"
          stroke="#8884d8"
          name="Humidity"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderDayTrend = () => (
    <div className="mb-6 mr-3">
      <h2 className="title" style={{ textAlign: "center" }}>
        24 hour air pollution trend
      </h2>
      <div style={{ height: "20rem" }}>{renderAirLineChart(dayAirTrend)}</div>
    </div>
  );

  const renderMonthTrend = () => (
    <div className="mb-6 mr-6">
      <h2 className="title" style={{ textAlign: "center" }}>
        30 days air pollution trend
      </h2>
      <div style={{ height: "20rem" }}>{renderAirLineChart(monthAirTrend)}</div>
    </div>
  );

  const renderYearTrend = () => (
    <div className="mb-6 mr-6">
      <h2 className="title" style={{ textAlign: "center" }}>
        12 month air pollution trend
      </h2>
      <div style={{ height: "20rem" }}>{renderAirLineChart(yearAirTrend)}</div>
    </div>
  );

  const renderTemperatureDayTrend = () => (
    <div className="mb-6 mr-3">
      <h2 className="title" style={{ textAlign: "center" }}>
        24 hour temperature trend
      </h2>
      <div style={{ height: "20rem" }}>
        {renderTemperatureLineChart(dayTemperatureTrend)}
      </div>
    </div>
  );

  const renderTemperatureMonthTrend = () => (
    <div className="mb-6 mr-3">
      <h2 className="title" style={{ textAlign: "center" }}>
        30 days temperature trend
      </h2>
      <div style={{ height: "20rem" }}>
        {renderTemperatureLineChart(monthTemperatureTrend)}
      </div>
    </div>
  );

  const renderTemperatureYearTrend = () => (
    <div className="mb-6 mr-3">
      <h2 className="title" style={{ textAlign: "center" }}>
        12 month temperature trend
      </h2>
      <div style={{ height: "20rem" }}>
        {renderTemperatureLineChart(yearTemperatureTrend)}
      </div>
    </div>
  );

  const renderHumidityDayTrend = () => (
    <div className="mb-6 mr-3">
      <h2 className="title" style={{ textAlign: "center" }}>
        24 hour humidity trend
      </h2>
      <div style={{ height: "20rem" }}>
        {renderHumidityLineChart(dayTemperatureTrend)}
      </div>
    </div>
  );

  const renderHumidityMonthTrend = () => (
    <div className="mb-6 mr-3">
      <h2 className="title" style={{ textAlign: "center" }}>
        30 days humidity trend
      </h2>
      <div style={{ height: "20rem" }}>
        {renderHumidityLineChart(monthTemperatureTrend)}
      </div>
    </div>
  );

  const renderHumidityYearTrend = () => (
    <div className="mb-6 mr-3">
      <h2 className="title" style={{ textAlign: "center" }}>
        12 month humidity trend
      </h2>
      <div style={{ height: "20rem" }}>
        {renderHumidityLineChart(yearTemperatureTrend)}
      </div>
    </div>
  );

  const renderPieCharts = () => {
    const pm2p5 = [];
    const pm10 = [];
    const temperature = [];
    const humidity = [];

    if (dayAirTrend.length > 0) {
      const trend = dayAirTrend[dayAirTrend.length - 1];

      pm2p5.push({ pm2p5: trend.pm2p5 });
      pm2p5.push({ pm2p5: Math.max(0, 20 - trend.pm2p5) });
      pm10.push({ pm10: trend.pm10 });
      pm10.push({ pm10: Math.max(0, 40 - trend.pm10) });
    }

    if (dayTemperatureTrend.length > 0) {
      const trend = dayTemperatureTrend[dayTemperatureTrend.length - 1];

      temperature.push({ temperature: trend.temperature });
      humidity.push({ humidity: trend.humidity });
      humidity.push({ humidity: 100 - trend.humidity });
    }

    return (
      <div className="box mb-6 pb-6">
        <div className="columns">
          {dayAirTrend.length > 0 && (
            <div className="column is-half-desktop is-flex is-justify-content-space-around">
              <CustomPieChart
                width={150}
                heigh={150}
                label={`${pm2p5[0].pm2p5}`}
                caption="PM 2.5"
                data={pm2p5}
                dataKey="pm2p5"
                color="#D54C4C"
              />
              <CustomPieChart
                width={150}
                heigh={150}
                label={`${pm10[0].pm10}`}
                caption="PM 10"
                data={pm10}
                dataKey="pm10"
                color="#D54C4C"
              />
            </div>
          )}
          {dayTemperatureTrend.length > 0 && (
            <div className="column is-half-desktop is-flex is-justify-content-space-around">
              <CustomPieChart
                width={150}
                heigh={150}
                label={`${temperature[0].temperature}°C`}
                caption="Temperature"
                data={temperature}
                dataKey="temperature"
                color="#00C1D4"
              />
              <CustomPieChart
                width={150}
                heigh={150}
                label={`${humidity[0].humidity}%`}
                caption="Humidity"
                data={humidity}
                dataKey="humidity"
                color="#00C1D4"
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      {showAnimation && <ChocoboAnimation />}

      <div className="container is-max-widescreen mt-6">
        {renderPieCharts()}

        <div className="box mb-6">
          {dayAirTrend.length > 1 && renderDayTrend()}
          {monthAirTrend.length > 1 && renderMonthTrend()}
          {yearAirTrend.length > 1 && renderYearTrend()}
        </div>

        <div className="box mb-6">
          {dayTemperatureTrend.length > 1 && renderTemperatureDayTrend()}
          {monthTemperatureTrend.length > 1 && renderTemperatureMonthTrend()}
          {yearTemperatureTrend.length > 1 && renderTemperatureYearTrend()}
        </div>

        <div className="box mb-6">
          {dayTemperatureTrend.length > 1 && renderHumidityDayTrend()}
          {monthTemperatureTrend.length > 1 && renderHumidityMonthTrend()}
          {yearTemperatureTrend.length > 1 && renderHumidityYearTrend()}
        </div>
      </div>
    </div>
  );
};

export default App;
