import { DragIcon } from '@/components/Icons/DragIcon'
import { LabelIcon } from '@/components/Icons/LabelIcon'
import { LabelingIcon } from '@/components/Icons/LabelingIcon'
import { MergeIcon } from '@/components/Icons/MergeIcon'
import { PointerIcon } from '@/components/Icons/PointerIcon'
import { SplitIcon } from '@/components/Icons/SplitIcon'
import { TableIcon } from '@/components/Icons/TableIcon'

const Tool = {
  DETECT_TABLES: 'detectTables',
  LABEL: 'label',
  AREA: 'area',
  TABLE: 'table',
  MERGE: 'merge',
  SPLIT: 'split',
  POINTER: 'pointer',
  GRABBING: 'grabbing'
}

const RESOURCE_TOOL = {
  [Tool.LABEL]: 'Label',
  [Tool.AREA]: 'Area',
  [Tool.TABLE]: 'Table',
  [Tool.DETECT_TABLES]: 'Detect Tables',
  [Tool.POINTER]: 'Pointer',
  [Tool.GRABBING]: 'Drag'
}

const RESOURCE_TOOL_TOOLTIP = {
  [Tool.DETECT_TABLES]: 'Detect Tables (Shift+D)',
  [Tool.AREA]: 'Area (Shift+L)',
  [Tool.GRABBING]: 'Drag (Hold Alt)',
  [Tool.LABEL]: 'Label (Shift+A)',
  [Tool.MERGE]: 'Merge (Shift+M)',
  [Tool.POINTER]: 'Pointer (Shift+X)',
  [Tool.TABLE]: 'Table (Shift+T)',
  [Tool.SPLIT]: 'Split (Shift+K)'
}

const TOOL_TO_ICON = {
  [Tool.POINTER]: PointerIcon,
  [Tool.GRABBING]: DragIcon,
  [Tool.LABEL]: LabelIcon,
  [Tool.AREA]: LabelingIcon,
  [Tool.TABLE]: TableIcon,
  [Tool.DETECT_TABLES]: TableIcon,
  [Tool.SPLIT]: SplitIcon,
  [Tool.MERGE]: MergeIcon
}

export {
  RESOURCE_TOOL,
  RESOURCE_TOOL_TOOLTIP,
  TOOL_TO_ICON,
  Tool
}
