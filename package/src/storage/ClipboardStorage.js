class ClipboardStorage {
  write = async (writeData) => {
    await navigator.clipboard.writeText(JSON.stringify(writeData))
  }

  read = async () => {
    try {
      const data = await navigator.clipboard.readText()
      return JSON.parse(data)
    } catch {
      return null
    }
  }
}

const clipboardStorage = new ClipboardStorage()

export {
  clipboardStorage
}
