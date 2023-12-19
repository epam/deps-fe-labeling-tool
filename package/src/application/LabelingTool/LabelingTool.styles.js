import { css, createGlobalStyle } from 'styled-components'
import { COLORS } from '@/theme/theme.default'

const GlobalStyle = createGlobalStyle`${css` 
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 62.5%;
  }

  .root {
    box-sizing: border-box;
  }

  * {
  ::-webkit-scrollbar {
    width: 0.8rem;
    height: 0.8rem;
  }

  ::-webkit-scrollbar-track {
    border-radius: 0.8rem;
    background: ${COLORS.PRIMARY_3};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 0.8rem;
    background: ${COLORS.GRAYSCALE_1};
  }

  scrollbar-color: ${COLORS.PRIMARY_3} ${COLORS.GRAYSCALE_1};
  scrollbar-width: thin;
}
  
`}`

export {
  GlobalStyle
}
