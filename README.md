# Install
```bash
$ yarn add webserver-logger
```


### Client
```
import webServerLogger from './webserver-logger/client'
webServerLogger({ server: 'http://localhost:3000', watches: ['xhr', 'console'] })
```

### server 
```bash
node webserver-logger/server
```