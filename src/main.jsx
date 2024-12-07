import { createRoot } from "react-dom/client";

import { NotesProvider } from "./store/notesContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <NotesProvider>
    <App />
  </NotesProvider>
);
