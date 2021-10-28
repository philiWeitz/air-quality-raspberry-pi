import axios from "axios";
import env from "react-dotenv";

const backendApi = axios.create({
  baseURL: `http://${window.location.hostname}:${env.BACKEND_PORT}`,
  timeout: 1000,
});

export const getLatestAirQualityMeasurement = async () => {
  const response = await backendApi.get("/measurements/latest");
  return response.data;
};

export const getLatest24HoursAirQualityMeasurement = async () => {
  const response = await backendApi.get("/measurements/latest/day");
  return response.data;
};


export const getLatest30DaysAirQualityMeasurement = async () => {
  const response = await backendApi.get("/measurements/latest/month");
  return response.data;
};


export const getLatest365DaysAirQualityMeasurement = async () => {
  const response = await backendApi.get("/measurements/latest/year");
  return response.data;
};
