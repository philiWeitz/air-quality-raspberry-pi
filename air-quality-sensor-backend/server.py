import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from db import (
    create_database,
    get_last_24_hours,
    get_last_30_days,
    get_last_365_days,
    get_latest_air_quality_measurement,
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


@app.get("/measurements/latest")
def get_latest_measurement():
    return get_latest_air_quality_measurement()


@app.get("/measurements/latest/day")
def get_latest_measurement():
    return get_last_24_hours()


@app.get("/measurements/latest/month")
def get_latest_measurement():
    return get_last_30_days()


@app.get("/measurements/latest/year")
def get_latest_measurement():
    return get_last_365_days()


if __name__ == "__main__":
    uvicorn.run(
        "server:app",
        host="0.0.0.0",
        port=3000,
        reload=True,
        debug=True,
        workers=3,
    )
