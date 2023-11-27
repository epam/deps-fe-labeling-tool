/* stylelint-disable */
import 'handsontable/dist/handsontable.full.css'
import { HotTable } from '@handsontable/react'
import styled from 'styled-components'

export const StyledHotTable = styled(HotTable)`
  position: relative;

  .ht_master {
    overflow: visible !important;
  }

  .handsontableInputHolder,
  && .wtBorder.current,
  && .wtBorder.area {
    z-index: unset;
  }

  .ht_clone_top,
  .ht_clone_left,
  .ht_clone_top_left_corner {
    z-index: 1;
  }

  .handsontableInput {
    box-sizing: content-box;
  }
`
