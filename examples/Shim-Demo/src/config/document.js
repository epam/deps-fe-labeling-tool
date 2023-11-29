import { pages } from 'labeling-tool/lib/assets/document'
import { KnownLanguage } from 'labeling-tool/lib/enums/KnownLanguage'
import { Document } from 'labeling-tool/lib/models/Document'

const documentForLabeling = new Document(
  pages,
  KnownLanguage.ENGLISH,
  'Demo',
  'Tesseract'
)

export {
  documentForLabeling
}
