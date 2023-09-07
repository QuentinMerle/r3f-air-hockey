import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "RussoOne";
    src: local("RussoOne"),
        url("russo-one-v14-latin-regular.woff") format("woff");
  }

  @font-face {
    font-family: "Caveat";
    src: local("Caveat"),
        url("caveat-v17-latin-regular.woff") format("woff");
  }

  html,
  body,
  #root
  {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ivory;
  }
`;

export default GlobalStyle;
