const mockComponent = (componentName, namedExport = true, fn = () => { }) => {
  Object.defineProperty(fn, 'name', { value: componentName })
  return !namedExport ? fn : { [componentName]: fn }
}

export {
  mockComponent
}
