import { resetDefault as resetApi } from './api'
import { resetDefault as resetCanvas } from './canvas'
import { resetDefault } from './common'
import { resetDefault as resetDocument } from './document'
import { resetDefault as resetMarkup } from './markup'
import { resetDefault as resetModel } from './model'
import { resetDefault as resetOcr } from './ocr'
import { resetDefault as resetPagination } from './pagination'
import { resetDefault as resetSettings } from './settings'
import { resetDefault as resetTools } from './tools'

describe('Actions: common', () => {
  let dispatch

  beforeEach(() => {
    dispatch = jest.fn()
    resetDefault()(dispatch)
  })

  it('should call dispatch with resetApi action', () => {
    expect(dispatch).toHaveBeenCalledWith(resetApi())
  })

  it('should call dispatch with resetOcr action', () => {
    expect(dispatch).toHaveBeenCalledWith(resetOcr())
  })

  it('should call dispatch with resetCanvas action', () => {
    expect(dispatch).toHaveBeenCalledWith(resetCanvas())
  })

  it('should call dispatch with resetDocument action', () => {
    expect(dispatch).toHaveBeenCalledWith(resetDocument())
  })

  it('should call dispatch with resetMarkup action', () => {
    expect(dispatch).toHaveBeenCalledWith(resetMarkup())
  })

  it('should call dispatch with resetPagination action', () => {
    expect(dispatch).toHaveBeenCalledWith(resetPagination())
  })

  it('should call dispatch with resetTools action', () => {
    expect(dispatch).toHaveBeenCalledWith(resetTools())
  })

  it('should call dispatch with resetModel action', () => {
    expect(dispatch).toHaveBeenCalledWith(resetModel())
  })

  it('should call dispatch with resetSettings action', () => {
    expect(dispatch).toHaveBeenCalledWith(resetSettings())
  })
})
