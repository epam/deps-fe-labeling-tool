module.exports = {
  plugins: [
    '@babel/plugin-proposal-class-properties',
    [
      'babel-plugin-styled-components',
      {
        pure: true
      }
    ]
  ],
  presets: [
    '@babel/preset-react'
  ]
}
