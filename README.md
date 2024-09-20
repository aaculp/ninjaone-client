Installation: 
## The below command will npm install in both the backend && cd into frontend and run npm install. 
------------

```bash
$ npm run build
```


Run: 
## Run this command from the root folder, this will start your node server && cd frontend and start the frontend. Please pay attention to your console to see what port the frontend is running on -- 3000 vs 3001?
------------

```bash
$ npm start
```


API:
------------

Base url: `http://localhost:3000`


```bash
GET /devices
```


```bash
GET /devices/:id
```


```bash
DELETE /devices/:id
```


```bash
POST /devices
```
> |  Request Body                                                           | content-type          |
> |:------------------------------------------------------------------------|:----------------------|
> | `{"system_name": "DESKTOP-ONE","type": "WINDOWS","hdd_capacity": "92"}` | `application/json`    |


```bash
PUT /devices/:id
```
> |  Request Body                                                            | content-type          |
> |:-------------------------------------------------------------------------|:----------------------|
> | `{"system_name": "DESKTOP-OFFICE","type": "MAC","hdd_capacity": "500"}`  | `application/json`    |
