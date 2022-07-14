 import { useState, useEffect } from "react";
 import '../styles/styles.css';
 import { MdDeleteForever } from 'react-icons/md';
 import { MdPublishedWithChanges } from 'react-icons/md';

const NotesEtConsignes = ({ clientId, token, client, refresh, setRefresh }) => {

    const { notes } = client !== undefined && client;
    const [inputNote, setInputNote] = useState('');
    const [notesArray, setNotesArray] = useState([]);
    const [arrayOfIndex, setArrayOfIndex] = useState([]);

    useEffect(() => {

        setNotesArray([...notes]);

    }, []);
    
    function handleSubmitNotes(e) {
        e.stopPropagation();
        e.preventDefault();

        if (notes) {
            fetch(`https://calldirect.herokuapp.com/api/clients/modifyClient/${clientId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json, text/plain,"
                },
                body: JSON.stringify({
                    notes: [...notes, inputNote]
                })
            })
            .then(response => response.json())
            .then(data => {
                setInputNote('');
                setRefresh(!refresh);
            })
            .catch(error => console.log(error));
        } 
    };

    function handleChangeNote(e, index) {

        let newArray = notesArray;
        newArray[index] = e.target.value;
        setNotesArray(newArray);

        console.log(notesArray)
    }

    function deleteNote(index) {
        let newArray = notes;
        newArray.splice(index, 1);

        fetch(`https://calldirect.herokuapp.com/api/clients/modifyClient/${clientId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json, text/plain,"
                },
                body: JSON.stringify({
                    notes: newArray
                })
            })
            .then(response => response.json())
            .then(data => {
                setInputNote('');
                setRefresh(!refresh);
            })
            .catch(error => console.log(error));
    }

    function handleModifyNote(index) {

        if (arrayOfIndex.includes(index)) {
            let copyOfArray = [...arrayOfIndex];
            let indexOfNote = copyOfArray.indexOf(index);
            copyOfArray.splice(indexOfNote, 1);
            setArrayOfIndex(copyOfArray);

            fetch(`https://calldirect.herokuapp.com/api/clients/modifyClient/${clientId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json, text/plain,"
                },
                body: JSON.stringify({
                    notes: [...notes, inputNote]
                })
            })
            .then(response => response.json())
            .then(data => {
                setInputNote('');
                setRefresh(!refresh);
            })
            .catch(error => console.log(error));
        }else {
            let copyOfArray = [...arrayOfIndex];
            copyOfArray.push(index);
            setArrayOfIndex(copyOfArray);
        }
    }

    return (
        <>        
        {
            client &&
            <form className="notesEtConsignes" onSubmit={handleSubmitNotes} >
                <div className="containerColonne colonne-notes width30"> 
                    <u>NOTES :</u> 
                    <div className="textZone width100" style={{overflowY: "scroll", maxHeight: "40vh"}}>
                        {
                            notes.map((note, index) => 
                            <div key={index} className="notes">
                                {
                                    arrayOfIndex.includes(index) ?
                                    <div>
                                        <span style={{fontSize: "0.5rem"}} className="pastille">🟢</span><input onChange={(e) => handleChangeNote(e, index)} defaultValue={notesArray[index]} type='text'/>
                                    </div>
                                    :
                                    <div style={{display: "flex", flex: 1, width: "50%", paddingRight: "0.5rem"}}>
                                        <span style={{fontSize: "0.5rem"}} className="pastille">🟢</span><span>{note}</span>
                                    </div>
                                }
                                <div>
                                    {
                                        arrayOfIndex.includes(index) ? 
                                        <MdPublishedWithChanges onClick={() => handleModifyNote(index)} className='iconNotes colorGreen' style={{marginRight: "10px"}} />
                                        :
                                        <MdPublishedWithChanges onClick={() => handleModifyNote(index)} className='iconNotes colorGreen' style={{marginRight: "10px"}} />
                                    }
                                    <MdDeleteForever className='iconNotes colorRed' onClick={() => deleteNote(index)}/>
                                </div>
                            </div>)
                        }
                    </div>
                    <div className="containerInput">
                        <input onChange={(e) => setInputNote(e.target.value)} value={inputNote} className="notesEtConsignes__input" type="text" id="notes" />
                        <button className='btn'>Envoyer</button> 
                    </div>
                </div>                
            </form>
        }
        </>
    )
}

export default NotesEtConsignes