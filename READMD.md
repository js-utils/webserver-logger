# Install
```bash
$ yarn add log-server
```


### Client
```
import logClient from './log-server/client'
logClient({ server: 'http://localhost:3000', watches: ['xhr', 'console'] })
```

### server 
```bash
node log-server/server
```