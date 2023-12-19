// TODO: #2468
const tableSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  type: 'object',
  title: 'Table',
  description: 'Model that represents a table with ability to split/merge cells',
  default: {},
  required: [
    'typeName',
    'uid',
    'xGuidelines',
    'yGuidelines',
    'merges',
    'values'
  ],
  properties: {
    typeName: {
      type: 'string',
      pattern: '^table$',
      title: 'typeName',
      description: 'Uniq name of the object.'
    },
    uid: {
      type: 'string',
      title: 'uid',
      description: 'Uniq identifier of the object.'
    },
    xGuidelines: {
      type: 'array',
      title: 'xGuidelines',
      description: 'Coordinates of the x guide lines.',
      items: {
        type: 'number'
      }
    },
    yGuidelines: {
      type: 'array',
      title: 'yGuidelines',
      description: 'Coordinates of the y guide lines.',
      items: {
        type: 'number'
      }
    },
    merges: {
      $id: '#/properties/merges',
      type: 'array',
      title: 'merges',
      description: 'Array of the merges coordinates, their rowspan and colspan.',
      items: {
        type: 'object',
        title: 'merge',
        description: 'Represents merge coordinates, rowspan and colspan.',
        required: [
          'row',
          'column',
          'rowspan',
          'colspan'
        ],
        properties: {
          row: {
            type: 'integer',
            title: 'row',
            description: 'Merge row index.'
          },
          column: {
            type: 'integer',
            title: 'column',
            description: 'Merge column index.'
          },
          rowspan: {
            type: 'integer',
            title: 'rowspan',
            description: 'Number of rows merged together.'
          },
          colspan: {
            type: 'integer',
            title: 'colspan',
            description: 'Number of columns merged together.'
          }
        },
        additionalProperties: false
      }
    },
    values: {
      type: 'array',
      title: 'values',
      description: 'An array that holds table values and their coordinates.',
      items: {
        type: 'object',
        title: 'value',
        description: 'Holds value and its coordinates.',
        required: [
          'row',
          'column',
          'value'
        ],
        properties: {
          row: {
            type: 'integer',
            title: 'row',
            description: 'Merge row index.'
          },
          meta: {
            type: {
              oneOf: [
                {
                  type: 'object'
                },
                {
                  type: 'null'
                }
              ]
            },
            title: 'meta',
            description: 'Meta data for the cell'
          },
          column: {
            type: 'integer',
            title: 'column',
            description: 'Merge column index.'
          },
          value: {
            type: {
              oneOf: [
                {
                  type: 'string'
                },
                {
                  type: 'number'
                }
              ]
            },
            title: 'value',
            description: 'Value of the cell.'
          },
          confidence: {
            type: {
              oneOf: [
                {
                  type: 'number'
                },
                {
                  type: 'null'
                }
              ]
            },
            title: 'confidence',
            description: 'Confidence of value'
          }
        },
        additionalProperties: false
      }
    },
    index: {
      type: 'integer',
      title: 'index',
      description: 'Subfield index of the field with type "list"'
    },
    meta: {
      description: 'Meta data for the table',
      type: {
        oneOf: [
          {
            type: 'object'
          },
          {
            type: 'null'
          }
        ]
      }
    }
  }
}

export {
  tableSchema
}
