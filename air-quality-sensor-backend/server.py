import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from db import (
    create_database,
    get_air_last_24_hours,
    get_air_last_30_days,
    get_air_last_365_days,
    get_temperature_last_24_hours,
    get_temperature_last_30_days,
    get_temperature_last_365_days,
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)


create_database()


@app.get("/")
def read_root():
    return {"Health": "Ok"}


@app.get("/measurements/temperature/latest/day")
def get_latest_measurement():
    return get_temperature_last_24_hours()


@app.get("/measurements/temperature/latest/month")
def get_air_latest_measurement():
    return get_temperature_last_30_days()


@app.get("/measurements/temperature/latest/year")
def get_air_latest_measurement():
    return get_temperature_last_365_days()


@app.get("/measurements/air/latest/day")
def get_air_latest_measurement():
    return get_air_last_24_hours()


@app.get("/measurements/air/latest/month")
def get_air_latest_measurement():
    return get_air_last_30_days()


@app.get("/measurements/air/latest/year")
def get_air_latest_measurement():
    return get_air_last_365_days()


if __name__ == "__main__":
    uvicorn.run(
        "server:app",
        host="0.0.0.0",
        port=3000,
        reload=True,
        debug=True,
        workers=3,
    )
