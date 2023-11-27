
import dayjs from 'dayjs'
import dayjsPlugins from './antd/dayjs-plugins'

dayjsPlugins.forEach((pluginName) => {
  const plugin = require(`dayjs/plugin/${pluginName}`)
  dayjs.extend(plugin)
})
