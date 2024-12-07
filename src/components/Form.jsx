import React, { useContext, useState, useEffect } from "react";
import Style from "./Form.module.css";

import Modal from "../ui/Modal";
import NotesContext from "../store/notesContext";

const Form = ({ closeModal, isAddNew, noteToUpdate }) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");

  const { addNotes, updateNotes } = useContext(NotesContext);

  useEffect(() => {
    if (!isAddNew && noteToUpdate) {
      setEnteredTitle(noteToUpdate.title);
      setEnteredDescription(noteToUpdate.description);
    }
  }, [isAddNew, noteToUpdate]);

  const handleAddOrUpdateNote = (e) => {
    e.preventDefault();

    if (isAddNew) {
      const id = Date.now();
      addNotes({
        id: id,
        title: enteredTitle,
        description: enteredDescription,
      });
    } else {
      updateNotes(noteToUpdate.id, {
        title: enteredTitle,
        description: enteredDescription,
      });
    }

    closeModal();
  };

  const handleTitleChange = (e) => {
    setEnteredTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setEnteredDescription(e.target.value);
  };

  return (
    <Modal>
      <form onSubmit={handleAddOrUpdateNote} className={Style.form}>
        <label htmlFor="title">Notes Title</label>
        <input
          type="text"
          id="title"
          placeholder="Ex: DSA"
          required
          value={enteredTitle}
          onChange={handleTitleChange}
        />
        <label htmlFor="description">Notes Description</label>
        <textarea
          name="description"
          id="description"
          cols="20"
          rows="3"
          required
          value={enteredDescription}
          onChange={handleDescriptionChange}
        ></textarea>
        <div className={Style.btns}>
          <button type="button" className={Style.cancel} onClick={closeModal}>
            Cancel
          </button>
          <button type="submit">{isAddNew ? "Add Note" : "Update Note"}</button>
        </div>
      </form>
    </Modal>
  );
};

export default Form;
