
# cd air-quality-sensor-backend && python3 server.py &

SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

cd $SCRIPT_DIR/air-quality-sensor-backend
python3 sds011_sensor.py &
python3 ruuvi_sensor.py &
python3 server.py &

cd $SCRIPT_DIR/air-quality-sensor-frontend/prebuild
./node_modules/.bin/serve -p 9999 -s build