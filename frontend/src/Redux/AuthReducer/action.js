import { GET_PROFILE_SUCCESS, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT_SUCCESS, REQUEST_FAILED, REQUEST_SEND, REQUEST_SUCCESS } from "../ActionType"
import axios from "axios";

export const loginReq=()=>{
    return { type:REQUEST_SEND}
}

export const reqSucess=()=>{
    return {type:REQUEST_SUCCESS}
}

export const reqFailed=()=>{
    return { type:REQUEST_FAILED }
}

export const loginSuccess=(payload)=>{
    return { type:LOGIN_SUCCESS, payload }
}
export const loginFail=()=>{
    return { type:LOGIN_FAILURE }
}

export const sendReq=()=>{
    return {type:REQUEST_SEND}
}

export const getProfileSuccess=(payload)=>{
    return {type: GET_PROFILE_SUCCESS,payload}
}

export const getProfileFail=()=>{
    return { type:REQUEST_FAILED }
}


export const logoutReq=()=>{
    return { type:LOGOUT_SUCCESS }
}

export const logout=()=>(dispatch)=>{
    dispatch(logoutReq())
}
export const login=(user,loginRole)=>(dispatch)=>{
    dispatch(loginReq())
    return axios
    .post(`https://apexrecruit-api-flask-app.onrender.com/${loginRole}/login`,user)
    .then(res=>{
        dispatch(loginSuccess(res.data))
    })
    .catch(err=>{
        console.log(err.message)
    })
}

export const getProfileJobSeeker=(id)=>(dispatch)=>{
    dispatch(sendReq())
    axios.get(`https://apexrecruit-api-flask-app.onrender.com/jobseekers/profile/${id}`)
    .then(res=>{
        dispatch(getProfileSuccess(res.data.data))
    })
    .catch(()=>{
        dispatch(reqFailed())
    })
}

export const getProfileHiringManager=(id)=>(dispatch)=>{
    dispatch(sendReq())
    axios.get(`https://apexrecruit-api-flask-app.onrender.com/hiringmanager/profile/${id}`)
    .then(res=>{
        dispatch(getProfileSuccess(res.data.data))
    })
    .catch(()=>{
        dispatch(reqFailed())
        // console.log(err)
    })
}

export const updateJobseekerProfile=(id,userDetails,token)=>(dispatch)=>{
    dispatch(sendReq())
    return axios.put(`https://apexrecruit-api-flask-app.onrender.com/jobseekers/update/${id}`,userDetails,{
        headers:{'Authorization':token}
    })
    .then(res=>{
        dispatch(reqSucess())
        console.log(res)
    })
    .catch(()=>{
        dispatch(reqFailed())
        // console.log(err)
    })
}

export const updateHiringManagerProfile=(id,userDetails,token)=>(dispatch)=>{
    dispatch(sendReq())
    return axios.put(`https://apexrecruit-api-flask-app.onrender.com/hiringmanager/update/${id}`,userDetails,{
        headers:{'Authorization':token}
    })
    .then(res=>{
        dispatch(reqSucess())
        console.log(res)
    })
    .catch(()=>{
        dispatch(reqFailed())
        // console.log(err)
    })
}