import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setPrimaryLanguage } from '@/actions/ocr'
import { CompilationFeatureControl } from '@/components/CompilationFeatureControl'
import { Select } from '@/components/Select'
import { CompilationFeature } from '@/enums/CompilationFeature'
import { Feature } from '@/enums/Feature'
import { KnownLanguage } from '@/enums/KnownLanguage'
import { ocrLanguageShape } from '@/models/OcrLanguage'
import { Option } from '@/models/Option'
import { Settings, settingsShape } from '@/models/Settings'
import { primaryLanguageSelector, ocrLanguagesSelector } from '@/selectors/ocr'
import { settingsSelector } from '@/selectors/settings'
import { Wrapper } from './DocumentProperties.styles'

const DocumentProperties = ({
  ocrLanguages,
  setPrimaryLanguage,
  primaryLanguage,
  settings
}) => {
  const languageOptions = useMemo(
    () => ocrLanguages?.map(({ code, name }) => (
      new Option(
        code,
        name,
        code === primaryLanguage
      ))
    ),
    [ocrLanguages, primaryLanguage]
  )

  return (
    <Wrapper>
      <CompilationFeatureControl featureName={CompilationFeature.SHOW_NOT_IMPLEMENTED}>
        <Select
          value={'currency'}
          options={[]}
          onChange={() => {}}
        />
      </CompilationFeatureControl>
      {
        Settings.has(settings, Feature.LANGUAGE) && !!ocrLanguages?.length && (
          <Select
            value={primaryLanguage}
            options={languageOptions}
            onChange={setPrimaryLanguage}
          />
        )
      }
    </Wrapper>
  )
}

DocumentProperties.propTypes = {
  primaryLanguage: PropTypes.oneOf(
    Object.values(KnownLanguage)
  ),
  ocrLanguages: PropTypes.arrayOf(ocrLanguageShape),
  setPrimaryLanguage: PropTypes.func.isRequired,
  settings: settingsShape.isRequired
}

const mapStateToProps = (state) => ({
  primaryLanguage: primaryLanguageSelector(state),
  ocrLanguages: ocrLanguagesSelector(state),
  settings: settingsSelector(state)
})

const mapDispatchToProps = {
  setPrimaryLanguage: setPrimaryLanguage
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(DocumentProperties)

export {
  ConnectedComponent as DocumentProperties
}
