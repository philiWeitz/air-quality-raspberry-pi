# Air Quality Raspberry PI

## Install dependencies (raspberry pi)
1. copy the code into the pi root directory "/home/pi/"
1. install nodejs (>=12)
1. go to "air-quality-sensor-backend" and install all dependencies ```pip3 install -r requirements.txt```
1. go to "air-quality-sensor-frontend/prebuild" and install all dependencies ```npm install```

## Install as service
1. copy the "raspberry-pi/air-quality.service" to "/etc/systemd/system/"
1. change the permissions ```sudo chmod 644 /etc/systemd/system/air-quality.service```
1. reload the service ```sudo systemctl daemon-reload```
1. enable service on boot ```sudo systemctl enable air-quality.service```
1. start the service ```sudo systemctl start air-quality.service```
1. check service logs ```sudo systemctl status air-quality.service```
