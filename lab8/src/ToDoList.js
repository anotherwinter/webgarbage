import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from "react"

const NoteStatus = Object.freeze({
    ACTIVE: 0,
    COMPLETED: 1,
    DISCARDED: 2,
    POSTPONED: 3
});


function ToDoList() {
    const [notes, changeNotes] = useState([]);
    const [currentNote, changeCurrentNote] = useState({ id: -1, name: "", text: "" });
    const [error, setError] = useState("");

    function newNote() {
        saveNote();
        const note = {
            id: -1,
            name: "",
            text: "",
            status: NoteStatus.ACTIVE,
        };
        if (currentNote.name.length == 0) {
            deleteNote(currentNote.id);
        }
        changeCurrentNote(note);
    }

    function saveNote() {
        if (currentNote.name.length == 0) {
            displayError(true)
        }
        if (currentNote.id == -1) {
            currentNote.id = notes.length;
            changeNotes([...notes, currentNote]);
        }
        else {
            const updatedNotes = notes.map(val => val.id == currentNote.id ?
                { ...val, name: currentNote.name, text: currentNote.text, } : val);
            changeNotes(updatedNotes);
        }
    }

    function deleteNote(id) {
        if (currentNote.id == id) {
            changeCurrentNote({ id: -1, name: "", text: "" });
        }
        const updatedNotes = notes.filter(val => val.id != id);
        changeNotes(updatedNotes);
    }

    function updateCurrentNote(isName, event) {
        if (isName) {
            currentNote.name = event.target.value;
            if (currentNote.name.length == 0) {
                setError("Додайте назву нотатки!");
                displayError(true);
            }
        }
        else {
            currentNote.text = event.target.value;
        }
        saveNote();
    }

    function displayError(isError) {
        const errorText = document.getElementById("name-error");

        if (isError) {
            errorText.classList.remove("d-none");
        }
        else {
            errorText.classList.add("d-none");
        }
    }

    function setNote(event, id) {
        event.stopPropagation();
        if (currentNote.name.length == 0) {
            deleteNote(currentNote.id);
        }
        changeCurrentNote(notes.find(val => val.id == id));
    }

    function toggleDropdown(event, id) {
        event.stopPropagation();
        const dropdown = document.getElementById("dropdown");
        const statusBtn = document.getElementById("statusbtn-" + id);

        const rect = statusBtn.getBoundingClientRect();

        dropdown.style.left = `${rect.left}px`;
        dropdown.style.top = `${rect.bottom}px`;
        dropdown.setAttribute("data-id", id);

        dropdown.classList.toggle("d-none");
    }

    function changeStatus(newStatus) {
        const dropdown = document.getElementById("dropdown");
        const id = dropdown.getAttribute("data-id");
        const statusBtn = document.getElementById("statusbtn-" + id);
        const statusText = document.getElementById("status-" + id);

        statusBtn.classList.remove("btn-primary", "btn-success", "btn-danger", "btn-warning");

        switch (newStatus) {
            case NoteStatus.ACTIVE: {
                statusText.textContent = "Активно";
                statusBtn.classList.add("btn-primary");
                break;
            }
            case NoteStatus.COMPLETED: {
                statusText.textContent = "Виконано";
                statusBtn.classList.add("btn-success");
                break;
            }
            case NoteStatus.DISCARDED: {
                statusText.textContent = "Відхилено";
                statusBtn.classList.add("btn-danger");
                break;
            }
            case NoteStatus.POSTPONED: {
                statusText.textContent = "Відкладено";
                statusBtn.classList.add("btn-warning");
                break;
            }
        }

        dropdown.classList.toggle("d-none");
    }

    return (
        <>
            <div data-id="-1" id="dropdown" className="d-none position-absolute d-flex flex-column mt-1">
                <button onClick={() => changeStatus(NoteStatus.ACTIVE)} className="btn btn-primary rounded-circle" style={{ width: "2rem", height: "2rem" }} />
                <button onClick={() => changeStatus(NoteStatus.POSTPONED)} className="btn btn-warning rounded-circle" style={{ width: "2rem", height: "2rem" }} />
                <button onClick={() => changeStatus(NoteStatus.COMPLETED)} className="btn btn-success rounded-circle" style={{ width: "2rem", height: "2rem" }} />
                <button onClick={() => changeStatus(NoteStatus.DISCARDED)} className="btn btn-danger rounded-circle" style={{ width: "2rem", height: "2rem" }} />
            </div>
            <div id="todolist-window" className="d-flex vw-100 vh-100">
                <div className="col-3 bg-light h-100 text-start pt-3 ps-3 pe-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2 className="m-0">My ToDoList</h2>
                        <button onClick={newNote} className="btn btn-secondary rounded-circle p-0" style={{ width: "3rem", height: "3rem" }}>
                            <i className="bi bi-plus fs-3"></i>
                        </button>
                    </div>
                    <hr />
                    <div id="notes-list">
                        {notes.map((note) => (
                            <div onClick={(event) => setNote(event, note.id)} key={note.id} className="bg-primary bg-opacity-25 p-2 mt-2 rounded border border-1 border-secondary">
                                <div className="text-truncate mb-2">{note.name}</div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <button id={"statusbtn-" + note.id} onClick={(event) => toggleDropdown(event, note.id)} className="btn btn-primary rounded-circle" style={{ width: "2rem", height: "2rem" }} />
                                        <span id={"status-" + note.id} className="fw-bold ms-2 fs-5">
                                            Активно
                                        </span>
                                    </div>
                                    <button onClick={() => deleteNote(note.id)} className="btn btn-transparent p-0">
                                        <i className="bi bi-trash-fill fs-3"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="d-flex flex-column col-9 pt-3 ps-3 pe-3">
                    <div className="d-flex align-items-center">
                        <label className="form-label text-start fs-4 me-2" htmlFor="note-edit-name">Заголовок:</label>
                        <span id="name-error" className="d-none text-danger fs-6">Нотатка без назви автоматично видалиться при зміні нотаток</span>
                    </div>
                    <input onChange={(event) => updateCurrentNote(true, event)} value={currentNote.name} type="text" id="note-edit-name" placeholder="Дайте мені ім'я!"></input>
                    <label className="form-label text-start fs-4 mt-3" htmlFor="note-edit-text">Текст нотатки:</label>
                    <textarea onChange={(event) => updateCurrentNote(false, event)} value={currentNote.text} className="mb-3 h-100" type="text" id="note-edit-text" placeholder="Дайте мені зміст!"></textarea>
                </div>
            </div>
        </>
    )
}

export default ToDoList;