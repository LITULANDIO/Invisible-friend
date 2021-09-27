

export const currentState = (state) =>{
    return state.status
}

export const username= (state) =>{
    return state.user?.name || ''
}

export const friendSelected = (state) =>{
    return state.friend;
}

