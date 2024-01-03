import { useState } from "react";

import '../index.css';

export default function Player({ initialName, symbol }) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditing() {
      setIsEditing((editing) => !editing); // => schedules a state update to true
    }

    function handleChange(event) {
        console.log(event);
        setPlayerName(event.target.value);
    }

    let editorContent = <span className="player-name">{playerName}</span>;
    // let btnCaption = 'Edit';

    if (isEditing) {
        editorContent = (
            <input type="text" required value={playerName} onChange={handleChange}/>
        );
        // btnCaption = 'Save';
    }

    return (
      <li>
        <span className="player">
            {editorContent}
            <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditing}>{isEditing ? 'Save' : 'Edit'}</button>
      </li>
    );
}