import App from "next/app";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import testHoc from "../lib/withRedux";

class MyApp extends App {
  state = {
    counter: 1
  };
  static async getInitialProps(ctx) {
    const { Component } = ctx;
    console.log("app init");
    let pageProps;
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return {
      pageProps
    };
  }
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Provider store={reduxStore}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}
export default testHoc(MyApp);
