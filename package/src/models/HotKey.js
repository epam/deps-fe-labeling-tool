class HotKey {
  /**
    * Create a HotKeyEvent.
    * @param {string} name - The hotkey name value.
    * @param {string[] | { action: string, sequence: string }} shortcut - The hotkey shortcut value.
    * @param {string} description - The text value of hotKey to display for user.
    * @param {string} note - The additional info about hotKey for user.
    */

  constructor (name, shortcut, description, note) {
    this.name = name
    this.shortcut = shortcut
    this.description = description
    this.note = note
  }

  [Symbol.toPrimitive] (hint) {
    return this.name
  }

  getShortcutsArray () {
    return Array.isArray(this.shortcut) ? this.shortcut : [this.shortcut.sequence]
  }
}

export {
  HotKey
}
