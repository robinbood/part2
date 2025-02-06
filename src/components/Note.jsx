const Note =({note,remove}) => <li>{note.name} {note.number} <button onClick={remove}>delete</button></li>

export default Note