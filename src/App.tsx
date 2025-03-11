import React from "react";
import "./App.css";
import { ExampleComponent } from "./components/ExampleComponent/ExampleComponent";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello World</h1>
      </header>
      <main>
        <h2>Welcome to test app</h2>
        <ExampleComponent />
      </main>
    </div>
  );
}

export default App;
