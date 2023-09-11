const replaceAll = (str, ...args) => args.reduce((acc, arg, index) => acc.split(`{${index}}`).join(arg), str)

export {
  replaceAll
}
