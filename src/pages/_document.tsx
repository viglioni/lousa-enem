import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import theme from '../theme/theme'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="shortcut icon" href="/heart-lgbt.png" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

// MyDocument.getInitialProps = async ctx => {
//   const originalRenderPage = ctx.renderPage

//   ctx.renderPage = () =>
//     originalRenderPage({
//       enhanceApp: App => props => sheets.collect(<App {...props} />),
//     })

//   const initialProps = await Document.getInitialProps(ctx)

//   return {
//     ...initialProps,
//     // Styles fragment is rendered after the app and page rendering finish.
//     styles: [...React.Children.toArray(initialProps.styles)],
//   }
// }
