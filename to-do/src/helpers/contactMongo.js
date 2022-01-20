export const mongoGetAllNotes = () => {
    return fetch('/notes')
			.then(res => {
                return res.ok ? res.json() : [];
            })
}

export const mongoMultipleDelete = (idList) => {
    console.log(idList);
    return fetch(`/notes`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(idList)
    })
    
}
    
export const mongoPostNewNote = (note) => {
    return fetch('/notes', {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(note)
    })
}

export const mongoMultipleToggleDone = (newIsDone) => {
    console.log(newIsDone);
    return fetch(`/notes/setdone`, {
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
    return fetch(`/notes`, {
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

export const mongoLogin = (data) => {
    return fetch('/login', {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data)
    })
}

export const mongoRegister = (data) => {
    return fetch('/register', {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data)
    })
}

export const mongoLogout = () => {
    return fetch('/logout')
}

export const mongoCheckLogin = () => {
    return fetch('/checklogin')
}


// ADMIN

export const mongoGetAllUsers = () => {
    return fetch('/users')
			.then(res => res.json())
}

export const mongoSwitchAdmin = (login, newIsAdmin) => {
    return fetch('/users', {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            login: login,
            newIsAdmin: newIsAdmin
        })
    })
}

export const mongoAdminGetUserNotes = (login) => {
    return fetch(`/users/${login}`, {
        method: "GET",
    })
}