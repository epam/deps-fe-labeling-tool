import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setScale } from '@/actions/canvas'
import { storeDocument } from '@/actions/document'
import { setImage } from '@/actions/image'
import { storeMarkup } from '@/actions/markup'
import { storeFields, storeInitialFields } from '@/actions/model'
import { storeOcr, setPrimaryLanguage } from '@/actions/ocr'
import { openPage } from '@/actions/pagination'
import { storeSettings } from '@/actions/settings'
import { FeatureUserNotifier } from '@/application/FeatureUserNotifier'
import { Spinner } from '@/components/Spinner'
import { WIDTH_SCALING_TARGET } from '@/constants/canvas'
import { Feature } from '@/enums/Feature'
import { configShape } from '@/models/Config'
import { documentShape } from '@/models/Document'
import { fieldShape } from '@/models/Field'
import { ocrEngineShape } from '@/models/OcrEngine'
import { Settings, settingsShape } from '@/models/Settings'
import { scaleSelector } from '@/selectors/canvas'
import { documentSelector } from '@/selectors/document'
import { fieldsSelector } from '@/selectors/model'
import { ocrEnginesSelector } from '@/selectors/ocr'
import { currentPageSelector } from '@/selectors/pagination'
import { settingsSelector } from '@/selectors/settings'
import { setApi } from '@/services/api'
import { setEvents } from '@/services/events'
import { loadImage } from '@/utils/image'

class ConfigLoader extends PureComponent {
  static propTypes = {
    config: configShape.isRequired,
    currentPage: PropTypes.number.isRequired,
    scale: PropTypes.number,
    document: documentShape,
    fields: PropTypes.arrayOf(fieldShape),
    ocrEngines: PropTypes.arrayOf(ocrEngineShape),
    settings: settingsShape,
    openPage: PropTypes.func.isRequired,
    setScale: PropTypes.func.isRequired,
    setImage: PropTypes.func.isRequired,
    storeMarkup: PropTypes.func.isRequired,
    storeDocument: PropTypes.func.isRequired,
    storeFields: PropTypes.func.isRequired,
    storeInitialFields: PropTypes.func.isRequired,
    storeOcr: PropTypes.func.isRequired,
    setPrimaryLanguage: PropTypes.func.isRequired,
    storeSettings: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
  }

  state = {
    isSettingMarkup: true
  }

  getImage = async (url) => {
    const { image } = await loadImage(url, this.props.config.api.getImage)
    return {
      scale: WIDTH_SCALING_TARGET / image.width,
      width: image.width,
      height: image.height
    }
  }

  initApi = () => {
    setApi(this.props.config.api)
  }

  initEvents = () => {
    setEvents(this.props.config.events)
  }

  initDocument = () => {
    this.props.storeDocument(this.props.config.document)
  }

  initPage = () => {
    const initialPage = this.props.config.settings.features?.find((f) => f.code === Feature.PAGING)?.data?.initialPage
    if (initialPage) {
      this.props.openPage(initialPage)
    }
  }

  initFields = () => {
    this.props.storeInitialFields(this.props.config.fields)
    this.props.storeFields(this.props.config.fields)
  }

  initSettings = () => {
    const settings = this.props.config.settings || new Settings()
    this.props.storeSettings(settings)
  }

  initOcr = () => {
    this.props.config.ocr && this.props.storeOcr({
      ...this.props.config.ocr,
      primaryEngine: this.props.config.document.engine
    })
    this.props.config.document.language && this.props.setPrimaryLanguage(this.props.config.document.language)
  }

  initMarkup = async () => {
    const { document, markup } = this.props.config
    const page = this.props.config.settings.features?.find((f) => f.code === Feature.PAGING)?.data?.initialPage ?? this.props.currentPage
    const url = document.pages[page - 1]
    const { width, height, scale } = await this.getImage(url)
    this.props.setScale(scale)
    this.props.setImage({ width, height })

    if (markup) {
      this.props.storeMarkup(markup)
    }

    this.setState({
      isSettingMarkup: false
    })
  }

  componentDidMount = () => {
    this.initApi()
    this.initDocument()
    this.initSettings()
    this.initPage()
    this.initFields()
    this.initOcr()
    this.initMarkup()
    this.initEvents()
  }

  isLtNotReady = () => (
    this.state.isSettingMarkup ||
    !this.props.document ||
    !this.props.fields ||
    !this.props.scale ||
    !this.props.settings ||
    (this.props.config.ocr?.engines && !this.props.ocrEngines)
  )

  render = () => {
    if (this.isLtNotReady()) {
      return <Spinner />
    }

    return (
      <FeatureUserNotifier>
        {this.props.children}
      </FeatureUserNotifier>
    )
  }
}

const mapStateToProps = (state) => ({
  currentPage: currentPageSelector(state),
  document: documentSelector(state),
  fields: fieldsSelector(state),
  scale: scaleSelector(state),
  settings: settingsSelector(state),
  ocrEngines: ocrEnginesSelector(state)
})

const mapDispatchToProps = {
  setScale,
  setImage,
  setPrimaryLanguage,
  storeDocument,
  storeMarkup,
  storeFields,
  storeInitialFields,
  storeOcr,
  storeSettings,
  openPage
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ConfigLoader)

export {
  ConnectedComponent as ConfigLoader
}
