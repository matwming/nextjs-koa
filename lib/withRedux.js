import createStore from "../store/store";
import React from "react";

const isServer = typeof window !== "defined";

const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__";
function getOrCreateStore(initialState) {
  if (isServer) {
    return createStore(initialState);
  }
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = createStore(initialState);
  }
  return window[__NEXT_REDUX_STORE__];
}

export default Comp => {
  class withReduxApp extends React.Component {
    constructor(props) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }
    render() {
      const { Component, pageProps, ...rest } = this.props;
      console.log(Component, pageProps);
      if (pageProps) {
        pageProps.test = "123";
      }

      return (
        <Comp
          Component={Component}
          pageProps={pageProps}
          {...rest}
          reduxStore={this.reduxStore}
        />
      );
    }
  }

  withReduxApp.getInitialProps = async ctx => {
    let appProps = {};
    if (typeof Comp.getInitialProps === "function") {
      appProps = await Comp.getInitialProps(ctx);
    }
    const reduxStore = getOrCreateStore();
    return {
      ...appProps,
      initialReduxState: reduxStore.getState()
    };
  };
  return withReduxApp;
};
