import React from "react";

import App from "./App";
import AddUser from "./components/dialog/AddUser";
import Payment from "./components/dialog/Payment";
import History from "./components/dialog/History";

export default function NestingExample() {
  const View = () => {
    const pathName = window.location.pathname.substr(1);
    if (pathName === "addUser") {
      return <AddUser />;
    } else if (pathName === "payment") {
      return <Payment />;
    } else if (pathName === "history") {
      return <History />;
    } else {
      return <App />;
    }
  };

  return <View />;
}
