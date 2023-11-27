/* eslint-disable no-console */

import { Table, CellValue, CellsMerge } from '@/models/Table'

const api = {
  close: () => window.alert('Executing callback to the parent to close the application'),
  detectTables: (url, selectedAreaCoords, detectEngine, ocrEngine, language, rotation) => {
    const getGuidelines = (start, length) => [start, start + length / 2, start + length]
    return Promise.resolve(
      [
        new Table(
          getGuidelines(selectedAreaCoords.x, selectedAreaCoords.w),
          getGuidelines(selectedAreaCoords.y, selectedAreaCoords.h),
          [
            new CellsMerge(1, 0, 2, 1)
          ],
          [
            new CellValue(0, 0, `Detected Tables are from ${url}.`),
            new CellValue(0, 1, `Tables were detected with ${detectEngine} and were extracted with ${ocrEngine}.`),
            new CellValue(1, 0, `Chosen language was ${language}. Rotation angle ${rotation} was passed.`)
          ]
        )
      ]
    )
  },
  getImage: (url) => Promise.resolve(url),
  ocrTable: (engine, url, table) => Promise.resolve({
    ...table,
    values: table.values.map((v) => ({
      ...v,
      value: `Text content from [${engine}]`,
      confidence: 0.1567
    }))
  }),
  ocrText: (engine, url, coordinates) => Promise.resolve({
    content: `Text content from [${engine}]`,
    confidence: 0.9578347883
  }),
  omrArea: (url, coordinates) => Promise.resolve({
    content: false,
    confidence: 0.9578347883
  }),
  save: (data) => Promise.resolve(data),
  saveMarkup: (data) => Promise.resolve(data),
  addFieldForm: undefined,
  notify: {
    success: (text) => console.log(text),
    warning: (text) => console.log(text),
    error: (text) => console.log(text),
    info: (text) => console.log(text)
  }
}

export {
  api
}
