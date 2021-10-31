from time import sleep

from pydash import throttle
from ruuvitag_sensor.ruuvi import RuuviTagSensor

from db import add_temperature_measurement_to_database, create_database

"""

This only works on a rapberry pi!

"""

throttled_add_measurement = throttle(
    # save data every 10 minutes
    add_temperature_measurement_to_database,
    10 * 60 * 1000,
)


def start_measuring():
    create_database()

    def handle_data(data):
        measurement = data[1]

        if measurement.get("data_format") == 5:
            throttled_add_measurement(measurement=measurement)

    RuuviTagSensor.get_datas(handle_data)


while True:
    try:
        start_measuring()
        sleep(5 * 60)
    except Exception:
        print(
            "Error connecting to ruuvi sensor. Will try again in 5 minutes..."
        )
        sleep(5 * 60)
