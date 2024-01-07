import React from "react";
import { Provider } from "react-redux";
import { store } from "./state/store";
import Footer from "./Components/Footer";
import WrappedApp from "./Components/WrappedApp";

function App() {
  return (
    <div className='container' style={styles.container}>
      <Provider store={store}>
        <WrappedApp />
      </Provider>
      {/* <p>Open up App.js to start working on your app!</p> */}
      {/* If StatusBar is supposed to display the app status, it might not have a direct counterpart in web development */}
      {/* Therefore, it's often omitted in web apps */}
      {/* <Footer /> */}
    </div>
  );
}

const styles = {
  container: {
    // Flex and alignment properties in React Native don't have direct equivalents in web development
    // Adjust styling according to your requirements
    // flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
};

export default App;
