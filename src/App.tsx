import React from "react";

import Controller from "./Controller";
import Listener from "./Listener";

function App() {
  return (
    <div className="app">
      <header className="heading-div">
        <h1>Apollo Cache</h1>
      </header>
      <div className="container">
        <div className="content-div">
          <article className="content-col">
            <Controller />
          </article>
          <article className="content-col">
            <Listener />
          </article>
        </div>
      </div>
    </div>
  );
}

export default App;
