import React from 'react';
import '../styles/globals.scss';

// import App from 'next/app'
// import { Provider } from 'react-redux'


// import withReduxStore from '../lib/with-redux-store'

// import '../css/antd.less'

// class WgApp extends App {
//   render() {
//     const { Component, pageProps, store } = this.props

//     return (
//       <Provider store={store}>
//         <Component {...pageProps} />
//       </Provider>
//     )
//   }
// }

// export default withReduxStore(WgApp)
export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}