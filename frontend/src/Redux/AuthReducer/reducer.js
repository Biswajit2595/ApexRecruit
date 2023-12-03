import { GET_PROFILE_SUCCESS, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT_SUCCESS, REQUEST_FAILED, REQUEST_SEND, REQUEST_SUCCESS } from "../ActionType"


const initState={
    isLoading:false,
    profile:[],
    id:'',
    role:'',
    token:'',
    isError:false,
    isAuth:false
}

export const authReducer=(state=initState,{type,payload})=>{
    switch(type){
        case REQUEST_SEND:
            return {
                ...state,
                isLoading: true,
            }
        case REQUEST_FAILED:
            return {
                ...state,
                isLoading:true,
                isError:true,
            }
        case REQUEST_SUCCESS:
            return {
                ...state,
                isLoading:false,
                isError:false
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuth:true,
                id:payload.id,
                token: payload.token,
                role:payload.role,
                isLoading: false,
            }
        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                profile:payload,
                isLoading:false,
                isError:true
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoading:false,
                isError:true,
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuth:false,
                token:'',
                role:''
            }
        default: return state;
    }
}