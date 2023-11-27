import { pages } from '@/assets/document'
import { KnownLanguage } from '@/enums/KnownLanguage'
import { Document } from '@/models/Document'

const documentForLabeling = new Document(
  pages,
  KnownLanguage.ENGLISH,
  'Demo',
  'Tesseract'
)

export {
  documentForLabeling
}
