export const mongoGetAllNotes = () => {
    return fetch('http://localhost:4000/notes')
			.then(res => res.json())
}

export const mongoMultipleDelete = (idList) => {
    console.log(idList);
    return fetch(`http://localhost:4000/notes`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(idList)
    })
    
}
    
export const mongoPostNewNote = (note) => {
    fetch('http://localhost:4000/notes', {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(note)
    })
}

export const mongoMultipleToggleDone = (newIsDone) => {
    console.log(newIsDone);
    return fetch(`http://localhost:4000/notes/setdone`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            isDone: newIsDone
        })
    })
}
    
export const mongoPatchOne = (id, key, val) => {
    console.log(id, key, val);
    return fetch(`http://localhost:4000/notes`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            _id: id,
            key: key,
            val: val
        })
    })
}