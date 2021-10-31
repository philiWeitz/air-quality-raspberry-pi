import axios from "axios";
import env from "react-dotenv";

const backendApi = axios.create({
  baseURL: `http://${window.location.hostname}:${env.BACKEND_PORT}`,
  timeout: 20000,
});

export const getLatest24HoursAirQualityMeasurement = async () => {
  const response = await backendApi.get("/measurements/air/latest/day");
  return response.data;
};

export const getLatest30DaysAirQualityMeasurement = async () => {
  const response = await backendApi.get("/measurements/air/latest/month");
  return response.data;
};

export const getLatest365DaysAirQualityMeasurement = async () => {
  const response = await backendApi.get("/measurements/air/latest/year");
  return response.data;
};

export const getLatest24HoursTemperatureMeasurement = async () => {
  const response = await backendApi.get("/measurements/temperature/latest/day");
  return response.data;
};

export const getLatest30DaysTemperatureMeasurement = async () => {
  const response = await backendApi.get(
    "/measurements/temperature/latest/month"
  );
  return response.data;
};

export const getLatest365DaysTemperatureMeasurement = async () => {
  const response = await backendApi.get(
    "/measurements/temperature/latest/year"
  );
  return response.data;
};
