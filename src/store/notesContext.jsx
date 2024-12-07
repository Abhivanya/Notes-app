import React, { useEffect, useState } from "react";

const NotesContext = React.createContext({
  notes: [],
  count: 0,
  addNotes: (note) => {},
  updateNotes: (id, updatedNote) => {},
  deleteNotes: (id) => {},
});

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("storedNotes")) || [];
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("storedNotes", JSON.stringify(notes));
  }, [notes]);

  const handleAddNotes = (note) => {
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
  };

  const handleDeleteNotes = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const handleUpdateNotes = (id, updatedNote) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, ...updatedNote } : note
    );
    setNotes(updatedNotes);
  };

  const contextValue = {
    notes,
    count: notes.length,
    addNotes: handleAddNotes,
    updateNotes: handleUpdateNotes,
    deleteNotes: handleDeleteNotes,
  };

  return (
    <NotesContext.Provider value={contextValue}>
      {children}
    </NotesContext.Provider>
  );
};

export default NotesContext;
