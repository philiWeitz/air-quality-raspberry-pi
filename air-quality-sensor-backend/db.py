import sqlite3

DB_NAME = "air-quality.db"

CREATE_AIR_QUALITY_TABLE_QUERY = """
  CREATE TABLE IF NOT EXISTS air_quality (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pm2p5 REAL,
    pm10 REAL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
  );
"""

CREATE_TEMPERATURE_TABLE_QUERY = """
  CREATE TABLE IF NOT EXISTS temperature (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    temperature REAL,
    humidity REAL,
    created_at timestamp  NOT NULL DEFAULT current_timestamp
  );
"""


TREND_DATA_AIR_24_HOURS = f"""
    SELECT 
        round(pm2p5, 2), 
        round(pm10, 2), 
        strftime('%H:%M', datetime(created_at, 'localtime')) as timestamp
    FROM air_quality
    WHERE created_at >= datetime('now', '-1 days')
    ORDER BY created_at;
"""

TREND_DATA_TEMPERATURE_24_HOURS = f"""
    SELECT 
        round(temperature, 2), 
        round(humidity, 2), 
        strftime('%H:%M', datetime(created_at, 'localtime')) as timestamp
    FROM temperature
    WHERE created_at >= datetime('now', '-1 days')
    ORDER BY created_at;
"""

MEAN_DATA_AIR_24_HOURS = f"""
    SELECT avg(pm2p5) pm2p5, avg(pm10) pm10
    FROM air_quality
    WHERE created_at >= datetime('now', '-1 days');
"""

TREND_DATA_AIR_30_DAYS = f"""
    WITH month_range as (
        SELECT 
            pm2p5, 
            pm10, 
            strftime('%d.%m.%Y', datetime(created_at, 'localtime')) as timestamp,
            created_at
        FROM air_quality
        WHERE created_at >= date('now', '-30 days') 
        ORDER BY created_at
    )
    SELECT round(avg(pm2p5), 2) pm2p5, round(avg(pm10), 2) pm10, timestamp
    FROM month_range
    GROUP BY timestamp
    ORDER BY max(created_at)
"""


TREND_DATA_TEMPERATURE_30_DAYS = f"""
    WITH month_range as (
        SELECT 
            temperature, 
            humidity, 
            strftime('%d.%m.%Y', datetime(created_at, 'localtime')) as timestamp,
            created_at
        FROM temperature
        WHERE created_at >= date('now', '-30 days') 
        ORDER BY created_at
    )
    SELECT round(avg(temperature), 2) temperature, round(avg(humidity), 2) humidity, timestamp
    FROM month_range
    GROUP BY timestamp
    ORDER BY max(created_at)
"""

MEAN_DATA_AIR_30_DAYS = f"""
    SELECT avg(pm2p5), avg(pm10)
    FROM air_quality
    WHERE created_at >= date('now', '-30 days');
"""


TREND_DATA_AIR_365_DAYS = f"""
    WITH month_range as (
        SELECT 
            pm2p5, 
            pm10, 
            strftime('%m.%Y', datetime(created_at, 'localtime')) as timestamp, 
            created_at
        FROM air_quality
        WHERE created_at >= date('now', '-365 days') 
        ORDER BY created_at
    )
    SELECT round(avg(pm2p5), 2) pm2p5, round(avg(pm10), 2) pm10, timestamp
    FROM month_range
    GROUP BY timestamp
    ORDER BY max(created_at)
"""

TREND_DATA_TEMPERATURE_365_DAYS = f"""
    WITH month_range as (
        SELECT 
            temperature, 
            humidity, 
            strftime('%m.%Y', datetime(created_at, 'localtime')) as timestamp, 
            created_at
        FROM temperature
        WHERE created_at >= date('now', '-365 days') 
        ORDER BY created_at
    )
    SELECT round(avg(temperature), 2) temperature, round(avg(humidity), 2) humidity, timestamp
    FROM month_range
    GROUP BY timestamp
    ORDER BY max(created_at)
"""

MEAN_DATA_365_DAYS = f"""
    SELECT avg(pm2p5), avg(pm10)
    FROM air_quality
    WHERE created_at >= date('now', '-365 days');
"""


def create_database():
    connection = sqlite3.connect(DB_NAME)
    connection.execute(CREATE_AIR_QUALITY_TABLE_QUERY)
    connection.execute(CREATE_TEMPERATURE_TABLE_QUERY)
    connection.commit()
    connection.close()


def add_air_quality_measurement_to_database(measurement):
    insert_query = f"""
        INSERT INTO air_quality (pm2p5, pm10)  
        VALUES({measurement['pm2.5']}, {measurement['pm10']});
    """

    connection = sqlite3.connect(DB_NAME)
    connection.execute(insert_query)
    connection.commit()
    connection.close()


def add_temperature_measurement_to_database(measurement):
    insert_query = f"""
        INSERT INTO temperature (temperature, humidity)  
        VALUES({measurement['temperature']}, {measurement['humidity']});
    """

    connection = sqlite3.connect(DB_NAME)
    connection.execute(insert_query)
    connection.commit()
    connection.close()


def temperature_measurement_to_response(measurement):
    return {
        "temperature": measurement[0],
        "humidity": measurement[1],
        "timestamp": measurement[2],
    }


def get_temperature_last_24_hours():
    connection = sqlite3.connect(DB_NAME)
    measurements = list(connection.execute(TREND_DATA_TEMPERATURE_24_HOURS))
    connection.close()

    return {
        "measurements": [
            temperature_measurement_to_response(measurement)
            for measurement in measurements
        ]
    }


def get_temperature_last_30_days():
    connection = sqlite3.connect(DB_NAME)
    measurements = list(connection.execute(TREND_DATA_TEMPERATURE_30_DAYS))
    connection.close()

    return {
        "measurements": [
            temperature_measurement_to_response(measurement)
            for measurement in measurements
        ]
    }


def get_temperature_last_365_days():
    connection = sqlite3.connect(DB_NAME)
    measurements = list(connection.execute(TREND_DATA_TEMPERATURE_365_DAYS))
    connection.close()

    return {
        "measurements": [
            temperature_measurement_to_response(measurement)
            for measurement in measurements
        ]
    }


def air_measurement_to_response(measurement):
    return {
        "pm2p5": measurement[0],
        "pm10": measurement[1],
        "timestamp": measurement[2],
    }


def get_air_last_24_hours():
    connection = sqlite3.connect(DB_NAME)
    measurements = list(connection.execute(TREND_DATA_AIR_24_HOURS))
    mean = list(connection.execute(MEAN_DATA_AIR_24_HOURS))
    connection.close()

    return {
        "measurements": [
            air_measurement_to_response(measurement)
            for measurement in measurements
        ],
        "mean": {
            "pm2p5": mean[0][0],
            "pm10": mean[0][1],
        },
    }


def get_air_last_30_days():
    connection = sqlite3.connect(DB_NAME)
    measurements = list(connection.execute(TREND_DATA_AIR_30_DAYS))
    mean = list(connection.execute(MEAN_DATA_AIR_30_DAYS))
    connection.close()

    return {
        "measurements": [
            air_measurement_to_response(measurement)
            for measurement in measurements
        ],
        "mean": {
            "pm2p5": mean[0][0],
            "pm10": mean[0][1],
        },
    }


def get_air_last_365_days():
    connection = sqlite3.connect(DB_NAME)
    measurements = list(connection.execute(TREND_DATA_AIR_365_DAYS))
    mean = list(connection.execute(MEAN_DATA_365_DAYS))
    connection.close()

    return {
        "measurements": [
            air_measurement_to_response(measurement)
            for measurement in measurements
        ],
        "mean": {
            "pm2p5": mean[0][0],
            "pm10": mean[0][1],
        },
    }
