import React from 'react'
import { CheckmarkIcon } from '@/components/Icons/CheckmarkIcon'
import { DateFieldCalendarIcon } from '@/components/Icons/DateFieldCalendarIcon'
import { EnumIcon } from '@/components/Icons/EnumIcon'
import { KeyOfKeyValuePairIcon } from '@/components/Icons/KeyOfKeyValuePairIcon'
import { StringIcon } from '@/components/Icons/StringIcon'
import { TableIcon } from '@/components/Icons/TableIcon'
import { ValueOfKeyValuePairIcon } from '@/components/Icons/ValueOfKeyValuePairIcon'
import { IconSize23 } from '@/components/IconSize'
import {
  LabelType
} from '@/models/Label'
import { TABLE_TYPE_NAME } from '@/models/Table'

const MARKUP_OBJECT_TYPE_TO_ICON = {
  [LabelType.CHECKMARK]: <IconSize23><CheckmarkIcon /></IconSize23>,
  [LabelType.ENUM]: <IconSize23><EnumIcon /></IconSize23>,
  [LabelType.KEY]: <IconSize23><KeyOfKeyValuePairIcon /></IconSize23>,
  [LabelType.STRING]: <IconSize23><StringIcon /></IconSize23>,
  [TABLE_TYPE_NAME]: <IconSize23><TableIcon /></IconSize23>,
  [LabelType.VALUE]: <IconSize23><ValueOfKeyValuePairIcon /></IconSize23>,
  [LabelType.DATE]: <IconSize23><DateFieldCalendarIcon /></IconSize23>
}

export {
  MARKUP_OBJECT_TYPE_TO_ICON
}
