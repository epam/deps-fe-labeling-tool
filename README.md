# labeling-tool

_labeling-tool_ is powerful package built with React. It is designed for data labeling to assist with document markup tasks and training ML models.

Data labeling involves adding relevant keywords to unstructured data, such as text or images, enabling machines to automatically recognize and categorize the information.
As the crucial first step in the ML lifecycle, data labeling forms the foundation for accurate predictive models.

The _labeling-tool_ package simplifies editing table layouts and labeling documents, ultimately improving data extraction processes and preserving document structure.

![img.png](labeling-tool.png)

## Features and Benefits

### Features
- Import/Export Markup: _labeling-tool_ allows users to seamlessly import and export markup data.
- Feature-rich interface: A comprehensive panel with document controls such as zoom, undo, and pointer tool for selecting and moving markup.
- Markup Creation: Easily create data markups within the document.
- Merge/Split Table Cells: Allows managing table cells manually as needed during the labeling process.
- Data Extraction: _labeling-tool_ interface allows to extract data from the labeling tool (when the appropriate [API](#api) handler is passed) improving efficiency and saving time.
- Editable Extracted Content: Users have the ability to create, modify, and delete extracted content for each label, providing greater flexibility over the labeling process.
- Delete Markup: Allows users to delete unnecessary or incorrect markup to maintain organized and accurate data labeling.
- Labels Assignment: Assign selected labels to existing fields, simplifying data organization and extraction.
- Markup Object Panel: Easily view and manage markup objects in a dedicated panel, with JSON preview available.
- Hotkeys: Enhance productivity by using hotkeys to quickly access different tools.
- Table Detection: Allows automatic table detection feature within the document (when the appropriate [API](#api) handler is passed).
- AutoSave: Ensure the security of your work with an autosave functionality that periodically saves markup data automatically.

### Benefits
 - Streamlines data labeling, leading to better ML model training and development.
 - Preserves document content structure, ensuring the accuracy of extracted data.
 - Simplify data labeling and extraction process.
 - Enhances workflow efficiency, saving time and effort during the ML lifecycle.

## API

The root `LabelingTool` component accepts the following prop to configure and customize its behavior:

`config` (required)
The config object contains all necessary settings and configurations.

#### `config` object

| Key           | Type                              | Required | Description                                                                |
|---------------|-----------------------------------|----------|----------------------------------------------------------------------------|
| api           | [Object](#api-object)             | Yes      | Contains functions related to API interactions                             |
| addFieldForm  | `() => ReactNode`                 | No       | Renders a custom form to create a new document fields                      |
| document      | [Object](#document-object)        | Yes      | Describes the document being labeled                                       |
| events        | [Object](#events-object)          | No       | Contains possible handlers for events                                      |
| fields        | Array of [objects](#field-object) | Yes      | Defines the available document fields                                      |
| markup        | [Object](#markup-object)          | No       | Defines existed markup objects                                             |
| ocr           | [Object](#ocr-object)             | No       | Contains configuration related to Optical Character Recognition (OCR)      |
| settings      | [Object](#settings-object)        | No       | Settings related to the appearance and capabilities of the _labeling-tool_ |

#### `document` object 

| Key        | Type       | Required | Description                                                                                            |
|------------|------------|----------|--------------------------------------------------------------------------------------------------------|
| extraName  | `string`   | No       | Document extra name (displayed on UI)                                                                  |
| engine     | `string`   | Yes      | The primary OCR engine for handling data extraction                                                    |
| language   | `string`   | No       | The document [language](https://git.epam.com/epm-deps/deps-LT/-/blob/main/src/enums/KnownLanguage.js)  |
| name       | `string`   | Yes      | Document name (displayed on UI)                                                                        |
| pages      | `string[]` | Yes      | List of images, for ex. `['https://domain/doc-page.png']`                                              |

#### `field` object

| Key       | Type      | Required                        | Description                                                                                                                                                                                                 |
|-----------|-----------|---------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| code      | `string`  | Yes                             | Field code                                                                                                                                                                                                  |
| fieldType | `string`  | Yes                             | Field type, see possible [values](https://git.epam.com/epm-deps/deps-LT/-/blob/main/src/enums/FieldType.js)                                                                                                 |
| fieldMeta | `Object`  | No                              | Additional Field data depending on Field type.<br/> See `enumFieldMetaShape`, `listFieldMetaShape`, `pairFieldMetaShape` [here](https://git.epam.com/epm-deps/deps-LT/-/blob/main/src/models/FieldMeta.js)  |
| index     | `number`  | Yes - only for fieldType `list` | Field index                                                                                                                                                                                                 |
| name      | `string`  | Yes                             | Field name                                                                                                                                                                                                  |
| required  | `boolean` | Yes                             | Define whenever field is required                                                                                                                                                                           |

#### `ocr` object

| Key       | Type                                | Required | Description                                                                                                         |
|-----------|-------------------------------------|---------|---------------------------------------------------------------------------------------------------------------------|
| engines   | `{ code: string, name: string }[]`  | No      | The list of the available OCR engines                                                                               |
| languages | `{ code: string, name: string }[]`  | No      | The list of the available [languages](https://git.epam.com/epm-deps/deps-LT/-/blob/main/src/enums/KnownLanguage.js) |

#### `api` object

| Key          | Type        | Required | Description                                                                                                                                                                                                                          |
|--------------|-------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| close        | `Function`  | Yes      | The function handles the Labeling Tool closing                                                                                                                                                                                       |
| detectTables | `Function`  | No       | The function handles automatic table detection.<br/>Required only in case the tool for Table detection is available.<br/>Format: `function(imageUrl, detectCoords){}`                                                                |
| getImage     | `Function`  | No       | The function for getting the data of the document image.<br/>Format: `(imageUrl) => URL.createObjectURL(imageBlob)`                                                                                                                  |
| notify       | `Object`    | No       | Contains functions for showing notifications: `error`, `info`, `success`, `warning`.<br/>Ex. `{ success: (text) => console.log(text) }`                                                                                              |
| ocrTable     | `Function`  | No       | The function handles extracting table data.<br/>Required only in case [Table tool](#settings-object) is available and [ocr](#ocr-object) prop is passed as well).<br/>Format: `function(engine, imageUrl, markupTable, language){}`  |
| ocrText      | `Function`  | No       | The function handles extracting labels data.<br/>Required only in case [Label tool](#settings-object) is available and [ocr](#ocr-object) prop is passed as well).<br/>Format: `function(engine, imageUrl, labelCoords, language){}` |
| save         | `Function`  | No       | The function handles data extraction and markup saving.<br/>Format: `function(markup, rotationAngles, language){}`                                                                                                                   |
| saveMarkup   | `Function`  | Yes      | The function handles markup saving.<br/>Format: `function(markup, rotationAngles, language, fields){}`                                                                                                                               |

#### `markup` object

| Key        | Type            | Required | Description                                                                                                                                                                                      |
|------------|-----------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| labels     | `{ label }[]`   | No       | The list of the existed markup [labels](https://git.epam.com/epm-deps/deps-LT/-/blob/main/src/models/Label.js#L142).<br/>Required only in case [Label tool](#settings-object) is available       |
| tables     | `{ table }[]`   | No       | The list of the existed markup [tables](https://git.epam.com/epm-deps/deps-LT/-/blob/main/src/models/Table/Table.js#L110).<br/>Required only in case [Table tool](#settings-object) is available |

#### `settings` object

| Key        | Type                    | Required | Description                                                                                                                                                                                                                                                                                                                                       |
|------------|-------------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| features   | `string[]`              | No       | List of the available features. Possible [values](https://git.epam.com/epm-deps/deps-LT/-/blob/main/src/enums/Feature.js).                                                                                                                                                                                                                        |
| mode       | `'default' or 'markup'` | No       | Represents the current mode.<br/>`Markup` mode enables the possibility to extract and see labels' content                                                                                                                                                                                                                                         |
| panels     | `string[]`              | No       | List of the [panels](https://git.epam.com/epm-deps/deps-LT/-/blob/main/src/enums/Panel.js) displayed on UI.<br/>`Toolbar panel` displayed in the header and contains available tools.<br/>`Markup sidebar` locates in the right sidebar, contains markup objects properties and possible actions.<br/>`Left sidebar` displays markup objects list |
| tools      | `string[]`              | No       | List of the available tools. Possible [values](https://git.epam.com/epm-deps/deps-LT/-/blob/main/src/enums/Tool.js)                                                                                                                                                                                                                               |

#### `events` object

| Key        | Type         | Required | Description                                            |
|------------|--------------|----------|--------------------------------------------------------|
| onClose    | `Function`   | No       | The callback function, executed on Labeling Tool close |

Check the working example of the config [here](https://git.epam.com/epm-deps/deps-LT/-/blob/main/src/config/shim.js). This config could be used for playing with LabelingTool package. 

## Requirements

Min NodeJS version 14.16.0 

## Installation and Usage
To get started, follow these steps:

1. Install the package:

```bash
# If you use npm:
npm install labeling-tool

# Or if you use Yarn:
yarn add labeling-tool
```

2. Then import the LabelingTool package and use as in the example:
```js
import { LabelingTool } from 'labeling-tool'

function App() {
  return (
    <div className="App">
      <LabelingTool config={yourConfigHere} />
    </div>
  )
}

export default App
```

3. Update `yourConfigHere` with your desired configurations.

## Demo
There is a demo hosted on [Demo Link] which allows to check _labeling-tool_ package.

## License
_labeling-tool_ is licensed under the MIT License.
