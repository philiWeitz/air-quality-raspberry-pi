
# cd air-quality-sensor-backend && python3 server.py &

SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

cd $SCRIPT_DIR/air-quality-sensor-backend
python3 server.py &
python3 sensor.py &

cd $SCRIPT_DIR/air-quality-sensor-frontend/prebuild
./node_modules/.bin/serve -s build