import sqlite3

DB_NAME = "air-quality.db"

CREATE_AIR_QUALITY_TABLE_QUERY = """
  CREATE TABLE IF NOT EXISTS air_quality (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pm2p5 REAL,
    pm10 REAL,
    created_at timestamp  NOT NULL  DEFAULT current_timestamp
  );
"""

LATEST_MEASUREMENT_QUERY = f"""
    SELECT pm2p5, pm10, datetime(created_at, 'localtime')
    FROM air_quality
    ORDER BY created_at desc
    LIMIT 1
"""

TREND_DATA_24_HOURS = f"""
    SELECT round(pm2p5, 2), round(pm10, 2), strftime('%H:%M', datetime(created_at, 'localtime')) as created_at
    FROM air_quality
    WHERE created_at >= date('now', '-1 days')
    ORDER BY created_at;
"""

MEAN_DATA_24_HOURS = f"""
    SELECT avg(pm2p5) pm2p5, avg(pm10) pm10
    FROM air_quality
    WHERE created_at >= date('now', '-1 days');
"""

TREND_DATA_30_DAYS = f"""
    WITH month_range as (
        SELECT pm2p5, pm10, strftime('%d.%m.%Y', datetime(created_at, 'localtime')) as created_at
        FROM air_quality
        WHERE created_at >= date('now', '-30 days') 
        ORDER BY created_at
    )
    SELECT round(avg(pm2p5), 2) pm2p5, round(avg(pm10), 2) pm10, created_at
    FROM month_range
    GROUP BY created_at
    ORDER BY max(created_at)
"""

MEAN_DATA_30_DAYS = f"""
    SELECT avg(pm2p5), avg(pm10)
    FROM air_quality
    WHERE created_at >= date('now', '-30 days');
"""


TREND_DATA_365_DAYS = f"""
    WITH month_range as (
        SELECT pm2p5, pm10, strftime('%m.%Y', datetime(created_at, 'localtime')) as created_at
        FROM air_quality
        WHERE created_at >= date('now', '-365 days') 
        ORDER BY created_at
    )
    SELECT round(avg(pm2p5), 2) pm2p5, round(avg(pm10), 2), created_at
    FROM month_range
    GROUP BY created_at
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


def get_latest_air_quality_measurement():
    connection = sqlite3.connect(DB_NAME)
    measurement = list(connection.execute(LATEST_MEASUREMENT_QUERY))
    connection.close()

    return (
        {"pm2p5": measurement[0][1], "pm10": measurement[0][2]}
        if len(measurement) > 0
        else {}
    )


def measurement_to_response(measurement):
    return {
        "pm2p5": measurement[0],
        "pm10": measurement[1],
        "created_at": measurement[2],
    }


def get_last_24_hours():
    connection = sqlite3.connect(DB_NAME)
    measurements = list(connection.execute(TREND_DATA_24_HOURS))
    mean = list(connection.execute(MEAN_DATA_24_HOURS))
    connection.close()

    return {
        "measurements": [
            measurement_to_response(measurement)
            for measurement in measurements
        ],
        "mean": {
            "pm2p5": mean[0][0],
            "pm10": mean[0][1],
        },
    }


def get_last_30_days():
    connection = sqlite3.connect(DB_NAME)
    measurements = list(connection.execute(TREND_DATA_30_DAYS))
    mean = list(connection.execute(MEAN_DATA_30_DAYS))
    connection.close()

    return {
        "measurements": [
            measurement_to_response(measurement)
            for measurement in measurements
        ],
        "mean": {
            "pm2p5": mean[0][0],
            "pm10": mean[0][1],
        },
    }


def get_last_365_days():
    connection = sqlite3.connect(DB_NAME)
    measurements = list(connection.execute(TREND_DATA_365_DAYS))
    mean = list(connection.execute(MEAN_DATA_365_DAYS))
    connection.close()

    return {
        "measurements": [
            measurement_to_response(measurement)
            for measurement in measurements
        ],
        "mean": {
            "pm2p5": mean[0][0],
            "pm10": mean[0][1],
        },
    }
