import { CellsMerge } from '@/models/Table'
import { overrideMerges } from '@/models/Table/overrideMerges'

describe('Table model: overrideMerges', () => {
  const mergesToOverride = [new CellsMerge(0, 0, 6, 6)]
  const mergeOverrides = [new CellsMerge(0, 0, 3, 3), new CellsMerge(0, 2, 2, 2)]

  it('should successfully override a merge', () => {
    const result = overrideMerges(mergesToOverride, mergeOverrides)
    const expectedResult = [new CellsMerge(0, 2, 2, 2)]
    expect(result).toEqual(expectedResult)
  })
})
