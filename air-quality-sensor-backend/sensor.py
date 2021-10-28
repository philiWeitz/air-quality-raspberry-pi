from time import sleep

from sds011 import SDS011

from db import add_air_quality_measurement_to_database, create_database

REFRESH_RATE_IN_MINUTES = 15

# PORT = "/dev/ttyUSB0"
PORT = "/dev/cu.usbserial-14610"


def start_measuring():
    create_database()

    sensor = SDS011(port=PORT)
    sensor.set_working_period(rate=REFRESH_RATE_IN_MINUTES)

    while True:
        measurement = sensor.read_measurement()
        add_air_quality_measurement_to_database(measurement)
        print(measurement)


while True:
    try:
        start_measuring()
    except Exception as e:
        print("Error connecting to sensor. Will try again in 30 seconds...")
        sleep(30)
