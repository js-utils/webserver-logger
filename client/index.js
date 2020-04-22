import SmXMLHttpRequestProxy from 'smweb/src/NativeExt/SmXMLHttpRequestProxy'
import axios from 'axios'
axios.defaults.timeout = 60 * 1000
export default function (config) {
  config = Object.assign({ watches: ['xhr', 'console'], server: 'http://localhost:3000'}, config)
  console.warn(`start remote log-server watch: ${ config.watches }`)
  // xhr
  if (config.watches.indexOf('xhr') !== -1) {
    SmXMLHttpRequestProxy.setProxy({
      // onreadystatechange 之前执行
      onreadystatechange_before: (xhr) => {
        if (xhr.readyState == 2 && !new RegExp(config.server).test(xhr.responseURL)) {
          console.log('post')
          // axios.post(config.server, { message: `begin api: ${ xhr.responseURL }` })
        }
      },
      // onreadystatechange 之后执行
      onreadystatechange_after: (xhr) => {
        if (xhr.readyState == 4 && !new RegExp(config.server).test(xhr.responseURL)) {
          axios.post(config.server, { message: `after api: ${ xhr.responseURL }, responseData: ${ xhr.responseText }` })
        }
      }
    })
    window.XMLHttpRequest = SmXMLHttpRequestProxy
  }
  // console.log
  if (config.watches.indexOf('console') !== -1) {
    let originLog = console.log.bind(console)
    console.log = function () {
      originLog(...arguments)
      axios.post(config.server, { message: JSON.stringify({ console: Array.prototype.join.call(arguments, ' ') }) })
    }
  }
}
