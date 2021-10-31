# Air Quality Raspberry PI

This project uses a Raspberry PI 3+ and a SDS011 sensor to collect air quality measurements

## Install dependencies (raspberry pi)
1. copy the code into the pi root directory "/home/pi/"
1. install nodejs (>=12)
1. go to "air-quality-sensor-backend" and install all dependencies ```pip3 install -r requirements.txt```
1. go to "air-quality-sensor-frontend/prebuild" and install all dependencies ```npm install```

## Install ruuvi tag requirements
1. sudo apt-get install bluetooth bluez libbluetooth-dev
1. sudo apt-get install bluez-hcidump libboost-python-dev libboost-thread-dev libglib2.0-dev
1. sudo python3 -m pip install pybluez
1. pip3 install gattlib

## Install as service
1. copy the "raspberry-pi/air-quality.service" to "/etc/systemd/system/"
1. change the permissions ```sudo chmod 644 /etc/systemd/system/air-quality.service```
1. reload the service ```sudo systemctl daemon-reload```
1. enable service on boot ```sudo systemctl enable air-quality.service```
1. start the service ```sudo systemctl start air-quality.service```
1. check service logs ```sudo systemctl status air-quality.service```

## Update hostname
1. update sudo nano /etc/hostname
1. update sudo nano /etc/hosts
1. reboot raspberry

## Access server
Access the server either via your new hostname or via ```http://raspberrypi:9999/```

