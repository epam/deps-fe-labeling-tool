let api = null

const setApi = (apiConfig) => {
  api = apiConfig
}

const getApi = () => {
  if (api === null) {
    throw new Error('Api doesn\'t exist. Check whether incoming api config has been set.')
  }
  return api
}

export {
  getApi,
  setApi
}
