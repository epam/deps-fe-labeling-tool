import PropTypes from 'prop-types'
import { Label, labelShape } from '@/models/Label'
import { Table, tableShape } from '@/models/Table'
import { DictionaryShape } from '@/utils/propTypes'

const MARKUP_ERROR_MESSAGE = 'Markup is invalid'
const PAGE_MARKUP_ERROR_MESSAGE = 'Page markup is invalid'

class PageMarkup {
  constructor (labels, tables) {
    labels && (this.labels = Array.isArray(labels) ? labels : [labels])
    tables && (this.tables = Array.isArray(tables) ? tables : [tables])
  }

  static isValid = (pageMarkup) => {
    try {
      if (!pageMarkup) {
        throw new Error(PAGE_MARKUP_ERROR_MESSAGE)
      }

      if (pageMarkup.labels && !Array.isArray(pageMarkup.labels)) {
        throw new Error(PAGE_MARKUP_ERROR_MESSAGE)
      }

      pageMarkup.labels && pageMarkup.labels.forEach((label) => {
        const valid = Label.isValid(label)
        if (!valid) {
          throw new Error(PAGE_MARKUP_ERROR_MESSAGE)
        }
      })

      if (pageMarkup.tables && !Array.isArray(pageMarkup.tables)) {
        throw new Error(PAGE_MARKUP_ERROR_MESSAGE)
      }

      pageMarkup.tables && pageMarkup.tables.forEach((table) => {
        const valid = Table.isValid(table)
        if (!valid) {
          throw new Error(PAGE_MARKUP_ERROR_MESSAGE)
        }
      })

      return true
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
      return false
    }
  }
}

class Markup {
  constructor (pagesMarkup = new Map()) {
    pagesMarkup.forEach((pageMarkup, pageNumber) => {
      this[pageNumber] = pageMarkup
    })
  }

  static isValid = (markup) => {
    try {
      const pages = Object.keys(markup)
      if (!pages.length) {
        throw new Error(MARKUP_ERROR_MESSAGE)
      }

      Object.entries(markup).forEach(([page, pageMarkup]) => {
        if (!parseInt(page)) {
          throw new Error(MARKUP_ERROR_MESSAGE)
        }

        if (!PageMarkup.isValid(pageMarkup)) {
          throw new Error(MARKUP_ERROR_MESSAGE)
        }
      })
      return true
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
      return false
    }
  }

  static getAllObjects = (markup) => {
    return Object.entries(markup).reduce((acc, [page, pageMarkup]) => {
      Object.values(pageMarkup).forEach((markupItem) => {
        acc = [...acc, ...markupItem]
      })
      return acc
    }, [])
  }

  static getPageByObjectUid = (markup, uid) => {
    let markupObjectPage
    Object.entries(markup).forEach(([page, pageMarkup]) => {
      Object.values(pageMarkup).forEach((markupObject) => {
        if (markupObjectPage !== undefined) {
          return
        }
        const searchedItem = markupObject.find((item) => item.uid === uid)
        if (searchedItem) {
          markupObjectPage = page
        }
      })
    })
    return Number(markupObjectPage)
  }

  static merge = (markup, markupToMerge) => {
    const newMarkup = { ...markup }

    Object.entries(markupToMerge).forEach(([page, pageMarkup]) => {
      Object.entries(pageMarkup).forEach(([key, values]) => {
        newMarkup[page] = {
          ...(newMarkup[page] || {}),
          [key]: [
            ...((newMarkup[page] && newMarkup[page][key]) || []),
            ...values
          ]
        }
      })
    })

    return newMarkup
  }
}

const markupShape = DictionaryShape(PropTypes.number.isRequired, {
  labels: PropTypes.arrayOf(labelShape),
  tables: PropTypes.arrayOf(tableShape)
})

const pageMarkupShape = PropTypes.shape({
  labels: PropTypes.arrayOf(labelShape),
  tables: PropTypes.arrayOf(tableShape)
})

export {
  PageMarkup,
  Markup,
  markupShape,
  pageMarkupShape
}
