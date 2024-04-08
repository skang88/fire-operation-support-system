# How to deploy in the cloud environment

## connect to cloud shell using ssh 

```
ssh -i ~/.ssh/id_rsa username@IP_address
```

## Clone repository
```
git clone https://github.com/skang88/fire-operation-support-system.git
```

## generate .env file
```
cd fire-operation-support-system
cd server
nano .env
```
copy and paste .env file

## test server
```
npm install
node server.js
```

## add port to firewall
```
sudo firewall-cmd --add-port=4040/tcp
```

## edit client

after,
```
npm install
```

specify port number in package.json

```
"scripts": { 
    "dev": "next dev -p 3030",
    "start": "next start -p 3030",
},
```

and build application
```
npm build
```

make file, next.config.mjs and copy paste content of .env file


## Now run backend server as background service
```
sudo nano /etc/systemd/system/FOSBackend.service
```

copy and paste below content
```
[Unit]

Description=This is my backend server for Book Exchange Platform in OCI

# Documentation=https://github.com/skang88/fire-operation-support-system
# After=network.target

[Service]

ExecStart=/usr/bin/node /home/opc/fire-operation-support-system/server/server.js
RestartSec=10
Restart=always

[Install]
WantedBy=multi-user.target
```

Backend service start
```
sudo systemctl restart FOSBackend.service
sudo systemctl status FOSBackend.service
```

specify path of .env file in server.js file
```
const dotenv = require('dotenv');
dotenv.config({ path: '/home/opc/fire-operation-support-system/server/.env' });
```

Change swagger ip address and port in swagger.json
```
"servers": [
    {
      "url": "http://localhost:4000/api/v1"
    }
  ]
```

## Now run frontend server as background service
```
sudo nano /etc/systemd/system/FOSFrontend.service
```
/etc/systemd/system/FOSFrontend.service
```
[Unit]

Description=This is my backend server for Book Exchange Platform in OCI

# Documentation=https://github.com/skang88/fire-operation-support-system
# After=network.target

[Service]

ExecStart=/usr/bin/npm start WorkingDirectory=/home/opc/fire-operation-support-system/client/ 
RestartSec=10
Restart=always

[Install]
WantedBy=multi-user.target
```

Frontend service start
```
sudo systemctl stop FOSFrontend.service
sudo systemctl start FOSFrontend.service
sudo systemctl status FOSFrontend.service
```

```
sudo firewall-cmd --add-port=3030/tcp
```

