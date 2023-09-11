import { HotKey } from '@/models/HotKey'

const customKeyCodes = {
  37: 'KeyLeftArrow',
  39: 'KeyRightArrow',
  65: 'KeyA',
  67: 'KeyC',
  68: 'KeyD',
  75: 'KeyK',
  76: 'KeyL',
  77: 'KeyM',
  82: 'KeyR',
  83: 'KeyS',
  84: 'KeyT',
  86: 'KeyV',
  88: 'KeyX',
  89: 'KeyY',
  90: 'KeyZ',
  220: 'Backslash'
}

const HotKeyEvent = {
  UNDO: new HotKey('UNDO', ['ctrl+KeyZ'], 'Undo last action'),
  DELETE: new HotKey('DELETE', ['del'], 'Delete'),
  RECOGNIZE: new HotKey('RECOGNIZE', ['shift+KeyR'], 'Recognize'),
  REDO: new HotKey('REDO', ['ctrl+KeyY'], 'Redo last action'),
  RESET: new HotKey('RESET', ['ctrl+alt+KeyZ'], 'Undo all actions'),
  COPY: new HotKey('COPY', ['ctrl+KeyC'], 'Copy'),
  PASTE: new HotKey('PASTE', ['ctrl+KeyV'], 'Paste'),
  SAVE_WITHOUT_EXTRACTION: new HotKey('SAVE_WITHOUT_EXTRACTION', ['shift+KeyS'], 'Save without extraction'),
  SELECT_TOOL_DETECT_TABLES: new HotKey('SELECT_TOOL_DETECT_TABLES', ['shift+KeyD'], 'Detect tables'),
  SELECT_TOOL_POINTER: new HotKey('SELECT_TOOL_POINTER', ['shift+KeyX'], 'Pointer tool'),
  SELECT_TOOL_LABEL: new HotKey('SELECT_TOOL_LABEL', ['shift+KeyA'], 'Label tool'),
  SELECT_TOOL_TABLE: new HotKey('SELECT_TOOL_TABLE', ['shift+KeyT'], 'Table tool'),
  SELECT_TOOL_TABLE_MERGE: new HotKey('SELECT_TOOL_TABLE_MERGE', ['shift+KeyM'], 'Merge tool'),
  SELECT_TOOL_TABLE_SPLIT: new HotKey('SELECT_TOOL_TABLE_SPLIT', ['shift+KeyK'], 'Split tool'),
  SELECT_TOOL_AREA: new HotKey('SELECT_TOOL_AREA', ['shift+KeyL'], 'Area tool'),
  GRABBING_DOWN: new HotKey('GRABBING_DOWN', { action: 'keydown', sequence: 'alt' }, 'Drag', 'with left mouse button'),
  GRABBING_UP: new HotKey('GRABBING_UP', { action: 'keyup', sequence: 'alt' }),
  ROTATION_LEFT: new HotKey('ROTATION_LEFT', ['ctrl+KeyLeftArrow'], 'Rotate left'),
  ROTATION_RIGHT: new HotKey('ROTATION_RIGHT', ['ctrl+KeyRightArrow'], 'Rotate right'),
  COLLAPSE_EXPAND_SIDERS: new HotKey('COLLAPSE_EXPAND_SIDERS', ['ctrl+Backslash'], 'Collapse/expand side bar')
}

const HotKeyModifier = {
  SPLIT_ALL: new HotKey('SPLIT_ALL', ['Shift'], 'Split whole row/column', 'with left mouse button')
}

export {
  HotKeyEvent,
  HotKeyModifier,
  customKeyCodes
}
