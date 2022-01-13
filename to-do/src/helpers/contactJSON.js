export const getFromJSON = () => {
    return fetch('http://localhost:3000/notes/')
    .then(res =>  res.json())
    .then(data => {
        console.log(data)
        return data
    })

}

export const postNoteToJSON = (notes) => {
    return fetch(`http://localhost:3000/notes/`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(notes)
    })
}

export const deleteFromJSON = (id) => {
    return fetch(`http://localhost:3000/notes/${id}`, {
        method: "DELETE"
    })
}

export const patchToJSON = (id, key, value) => {
    return fetch(`http://localhost:3000/notes/${id}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            [key]: value,
        })
    })
}

            
            