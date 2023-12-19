import 'antd/lib/style/themes/default.less';
import 'antd/lib/style/core/index.less';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { LabelingTool } from 'labeling-tool';
import { SHIM_CONFIG } from './config/shim';

const App = () => {
  return (
    <StrictMode>
      <LabelingTool config={SHIM_CONFIG} />
    </StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
