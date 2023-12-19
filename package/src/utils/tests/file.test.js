import FileSaver from 'file-saver'
import { readFile, saveToFile } from '@/utils/file'

jest.mock('file-saver', () => ({ saveAs: jest.fn() }))
describe('Util: file saveToFile', () => {
  Object.defineProperty(HTMLInputElement.prototype, 'onchange', {
    get () {
      return this._onchange
    },
    set (onchange) {
      this._onchange = onchange
      onchange(fakeEvent)
    }
  })

  Object.defineProperty(FileReader.prototype, 'onload', {
    get () {
      return this._onload
    },
    set (onload) {
      this._onload = onload
      onload(fakeResult)
    }
  })
  const fakeFile = new File(['content'], 'filename', { type: 'encoding' })
  const fakeEvent = {
    target: {
      files: [
        fakeFile
      ]
    }
  }
  const fakeResult = {
    target: {
      result: 'test is OK'
    }
  }

  it('should call saveAs method', () => {
    saveToFile('filename', 'encoding', 'content')
    expect(FileSaver.saveAs)
      .toHaveBeenCalledWith(new File(['content'], 'filename', { type: 'encoding' }))
  })

  it('should read file', async () => {
    const result = await readFile('test')
    expect(result).toBe('test is OK')
  })

  it('should read file with empty arg', async () => {
    const result = await readFile()
    expect(result).toBe('test is OK')
  })
})
