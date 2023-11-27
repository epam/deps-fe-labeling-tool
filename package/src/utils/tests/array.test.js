import { arraysEqual, range } from '@/utils/array'

describe('util: array arraysEqual', () => {
  let array1, array2, copyArray1, comparator, arrayOfObjects, copyArrayOfObjects, sameArrayAsArray1, wrongArrayWithSameLength

  beforeEach(() => {
    array1 = [1, 2, '', 'hello', true, false, null, undefined, 0]
    copyArray1 = array1
    array2 = [6, 7, '', 'hello', true, null, undefined]
    sameArrayAsArray1 = [1, 2, '', 'hello', true, false, null, undefined, 0]
    wrongArrayWithSameLength = [1, 2, '', 'hello', true, 'false', null, 9, 0]
    arrayOfObjects = [
      {
        id: 1,
        name: 'Dan',
        place: 'New York'
      },
      {
        id: 2,
        name: 'Peter',
        place: 'Oklahoma'
      },
      {
        id: 3,
        name: 'Daniel',
        place: 'San Francisco'
      },
      {
        id: 4,
        name: 'Jasmine',
        place: 'Baltimore'
      },
      {
        id: 5,
        name: 'Sofie',
        place: 'Moscow'
      }
    ]
    copyArrayOfObjects = arrayOfObjects
    comparator = (arr1, arr2) => arr1.id === arr2.id
  })

  it('should be equal', () => {
    expect(arraysEqual(array1, copyArray1)).toBe(true)
    expect(arraysEqual(array1, sameArrayAsArray1)).toBe(true)
    expect(arraysEqual(arrayOfObjects, copyArrayOfObjects, comparator)).toBe(true)
  })

  it('should not be equal', () => {
    expect(arraysEqual(array1, array2)).toBe(false)
    expect(arraysEqual(array1, wrongArrayWithSameLength)).toBe(false)
  })

  it('arrays should exist', () => {
    expect(arraysEqual(undefined, undefined)).toBe(false)
    expect(arraysEqual(undefined, array1)).toBe(false)
    expect(arraysEqual(array1, undefined)).toBe(false)
  })
})

describe('util: array range', () => {
  let from, to, step3, stepHalf1, expectedArray1, expectedArray3, expectedArrayHalf1

  beforeEach(() => {
    from = 4
    to = 12
    step3 = 3
    stepHalf1 = 0.5
    expectedArray1 = [4, 5, 6, 7, 8, 9, 10, 11, 12]
    expectedArray3 = [4, 7, 10]
    expectedArrayHalf1 = [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12]
  })

  it('should return expect array without specified step', () => {
    expect(range(from, to)).toStrictEqual(expectedArray1)
  })

  it('should return expect array with specified step', () => {
    expect(range(from, to, step3)).toStrictEqual(expectedArray3)
  })

  it('should return expect array with specified float step', () => {
    expect(range(from, to, stepHalf1)).toStrictEqual(expectedArrayHalf1)
  })
})
