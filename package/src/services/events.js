let events = {}

const setEvents = (eventConfig) => {
  events = {
    ...events,
    ...eventConfig
  }
}

const getEvents = () => {
  if (!Object.entries(events).length) {
    throw new Error('Events doesn\'t exist. Check whether incoming events config has been set.')
  }
  return events
}

export {
  getEvents,
  setEvents
}
