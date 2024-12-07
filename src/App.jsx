import React from "react";
import "./App.css";
import NotesList from "./components/NotesList";
const App = () => {
  return (
    <div className="container">
      <h1>Notes App</h1>
      <NotesList />
    </div>
  );
};

export default App;
