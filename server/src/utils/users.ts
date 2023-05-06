
 

let users: {id: string, userName: string}[] = []

export const userJoin = (id: string, userName: string): boolean => {
    let user = users.find(user => user.userName === userName)

    if(user){
        return false;
    }

    users.push({id, userName})

    return true;
}

export const userLeft = (id: string) => {
    users = users.filter(user => user.id !== id)
}

export const getUsers = () => users