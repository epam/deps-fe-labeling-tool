
import { HotKeyEvent } from '@/constants/hotKeys'

const hotKeysSelector = jest.fn(() => [HotKeyEvent.COPY.name])

const mockHotKeysSelectors = {
  hotKeysSelector
}

export {
  mockHotKeysSelectors
}
