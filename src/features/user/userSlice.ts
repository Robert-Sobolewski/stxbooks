import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IRootUsers{ 
    users: IUsers|null
}

interface IUsers{ 
    users: IUser[]
    currentUser: IUser|null
}
export interface IUser{
    email: string
    password: string,
    books?: string[],
    language?: string

}
const init:IUsers= {
    users:localStorage.getItem('users')? JSON.parse(
        localStorage.getItem('users')!): [],
    currentUser:localStorage.getItem('cuser')? JSON.parse(
        localStorage.getItem('cuser')!): null,
}

const usersSlice = createSlice({
    name: 'users',
    initialState: init,
    reducers:{
        login: (state:any, action: PayloadAction<IUser>) =>{
            let existUser =state.users.filter((u:IUser)=>u.email=== action.payload.email)
            // find user if exist select one
            if(existUser.length>0){
                state.currentUser = existUser[0]
                localStorage.setItem('cuser', JSON.stringify(existUser[0]))

            }else{
                // if not exist add new user
                state.users.push(action.payload)
                state.currentUser =action.payload;
                localStorage.setItem('users', JSON.stringify(state.users))
                localStorage.setItem('cuser', JSON.stringify(action.payload))
            }
            
        },
        logout: (state:any)=>{
            state.currentUser = null
            localStorage.removeItem('cuser')
        },
        update: (state:any, action: PayloadAction<IUser>)=>{
            let users= JSON.parse(
                localStorage.getItem('users')!)
            let index = users.findIndex((user:IUser)=>user.email === action.payload.email)
            state.users[index] = action.payload
            localStorage.setItem('users', JSON.stringify(state.users))
        }
    },

})

export default usersSlice.reducer;
export const {login, logout, update} = usersSlice.actions;
export const selectUsers = (state: IRootUsers)=> state.users?.users
export const selectCurrentUser = (state:IRootUsers) => state.users?.currentUser