import React, { useContext, useEffect, useState } from "react";
import NotesContext from "../store/notesContext";
import Form from "./Form";
import Style from "./NotesList.module.css";

const NotesList = () => {
  const [enteredText, setEnteredText] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddNewNote, setIsAddNewNote] = useState(true);
  const [noteToUpdate, setNoteToUpdate] = useState(null);

  const { notes } = useContext(NotesContext);

  useEffect(() => {
    if (enteredText.trim() === "") {
      setFilteredNotes(notes);
    } else {
      const updatedNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(enteredText.toLowerCase())
      );
      setFilteredNotes(updatedNotes);
    }
  }, [enteredText, notes]);

  const handleSearch = (e) => {
    setEnteredText(e.target.value);
  };

  const handleAddNewNote = () => {
    setIsAddNewNote(true);
    setNoteToUpdate(null);
    setIsModalOpen(true);
  };

  const handleUpdateNote = (note) => {
    setIsAddNewNote(false);
    setNoteToUpdate(note);
    setIsModalOpen(true);
  };

  return (
    <>
      {isModalOpen && (
        <Form
          isAddNew={isAddNewNote}
          noteToUpdate={noteToUpdate}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
      <div className={Style.search}>
        <div className={Style.searchForm}>
          <label htmlFor="search">Search Notes</label>
          <input
            id="search"
            value={enteredText}
            onChange={handleSearch}
            placeholder="Search by title"
          />
          <button onClick={handleAddNewNote}>Add Notes</button>
        </div>
        <div>
          <div>Total Notes: {notes.length}</div>
          <div>Filtered Notes: {filteredNotes.length}</div>
        </div>
      </div>
      <div className={Style.wrapper}>
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <div key={note.id} className={Style.card}>
              <h2>{note.title}</h2>
              <p>{note.description}</p>
              <div className={Style.btns}>
                <button className={Style.delete}>Delete</button>
                <button onClick={() => handleUpdateNote(note)}>Update</button>
              </div>
            </div>
          ))
        ) : (
          <p className={Style.noNotes}>No notes found.</p>
        )}
      </div>
    </>
  );
};

export default NotesList;
