import { Markup } from '@/models/Markup'
import { saveToFile, readFile } from '@/utils/file'

const MARKUP_VERSION_V1 = '1'

const ERROR_MESSAGE = 'Import: source is malformed'

const importV1 = (fileMarkup) => {
  if (!Markup.isValid(fileMarkup)) {
    throw new Error(ERROR_MESSAGE)
  }
  return fileMarkup
}

const VERSION_TO_IMPORT_FUNC = {
  [MARKUP_VERSION_V1]: importV1
}

const importMarkup = async () => {
  const content = await readFile('@/application/json')
  if (!content) {
    throw new Error(ERROR_MESSAGE)
  }

  const json = JSON.parse(content)
  if (!json.ver) {
    throw new Error(ERROR_MESSAGE)
  }

  if (!VERSION_TO_IMPORT_FUNC[json.ver]) {
    throw new Error(ERROR_MESSAGE)
  }

  return VERSION_TO_IMPORT_FUNC[json.ver](json.markup)
}

const exportMarkup = (markup, documentName) => {
  if (!Object.keys(markup).length) {
    return
  }

  saveToFile(documentName, 'UTF-8', JSON.stringify({
    ver: MARKUP_VERSION_V1,
    markup
  }))
}

export {
  importMarkup,
  exportMarkup
}
