import { Tool } from '@/enums/Tool'

const selectedToolSelector = jest.fn(() => Tool.LABEL)

const mockToolsSelectors = {
  selectedToolSelector
}

export {
  mockToolsSelectors
}
