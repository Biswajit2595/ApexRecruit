import axios from 'axios';
import { GET_APPLICANTS_SUCCESS, GET_APPLIED_JOB_SUCCESS, GET_CREATED_POST_SUCCESS, GET_JOB_POST_SUCCESS, GET_RECOMMENDATIONS_SUCCESS, GET_SINGLE_APPLICANT_SUCCESS, GET_SINGLE_CREATED_POST_SUCCESS, GET_SINGLE_JOB_POST_SUCCESS, REQUEST_FAILED, REQUEST_SEND, REQUEST_SUCCESS } from "../ActionType"
import { reqFailed } from '../AuthReducer/action';

export const sendReq=()=>{
    return {type: REQUEST_SEND}
}

export const reqSucess=()=>{
    return {type:REQUEST_SUCCESS}
}
export const failedReq=()=>{
    return { type: REQUEST_FAILED }
}
export const getJobPostsReq=(payload)=>{
    return {type:GET_JOB_POST_SUCCESS,payload}
}
export const getSingleJobPostReq=(payload)=>{
    return {type:GET_SINGLE_JOB_POST_SUCCESS,payload}
}

export const getApplicantsReq=(payload)=>{
    return {type:GET_APPLICANTS_SUCCESS,payload}
}
export const getSingleApplicantReq=(payload)=>{
    return {type:GET_SINGLE_APPLICANT_SUCCESS,payload}
}
export const getCreatedpostReqSuccess=(payload)=>{
    return {type:GET_CREATED_POST_SUCCESS,payload}
}

export const getSingleCreatedpostReqSuccess=(payload)=>{
    return {type:GET_SINGLE_CREATED_POST_SUCCESS,payload}
}
export const getAppliedJobSucess=(payload)=>{
    return { type:GET_APPLIED_JOB_SUCCESS,payload }
}

export const recommendationsReqSuccess=(payload)=>{
    return { type:GET_RECOMMENDATIONS_SUCCESS,payload }
}

export const getRecommendations=(id,token)=>(dispatch)=>{
    dispatch(sendReq())
    axios.post(`https://apexrecruit-api-flask-app.onrender.com/applications/recommendations/${id}`,{},{
        headers:{
            'Authorization':token
        }
    })
    .then(res=>{
        console.log(res)
        dispatch(recommendationsReqSuccess(res.data.recommendations))
    })
    .catch(err=>{
        console.log(err)
        dispatch(failedReq())
    })
}
export const getAppliedjob=(id,token)=>(dispatch)=>{
    dispatch(sendReq())
    axios(`https://apexrecruit-api-flask-app.onrender.com/applications/jobseeker/${id}`,{
        headers:{'Authorization':token}
    })
    .then(res=>{
        // console.log(res.data.applications)
        dispatch(getAppliedJobSucess(res.data.applications))
    })
    .catch(()=>{
        dispatch(failedReq())
    })
}

export const getJobPosts=()=>(dispatch)=>{
    dispatch(sendReq())
    axios.get(`https://apexrecruit-api-flask-app.onrender.com/jobs/get/all`)
    .then(res=>{
        dispatch(getJobPostsReq(res.data.data))
    }).catch(()=>{
        // console.log(err)
        dispatch(failedReq())
    })
}
export const getSingleJobPost=(id)=>(dispatch)=>{
    dispatch(sendReq())
    axios.get(`https://apexrecruit-api-flask-app.onrender.com/jobs/get/${id}`)
    .then(res=>{
        // console.log(res.data.data)
        dispatch(getSingleJobPostReq(res.data.data))
    })
    .catch(()=>{
        dispatch(failedReq())
    })
}

export const postJobs=(token,job)=>(dispatch)=>{
    dispatch(sendReq())
    return axios.post(`https://apexrecruit-api-flask-app.onrender.com/jobs/create`,job,{
        headers:{'Authorization':token}
    })
    .then(()=>{
        dispatch(reqSucess())
        // console.log(res)
    })
    .catch(()=>{
        dispatch(reqFailed())
    })
}

export const updateJobPostStatus=(id,token,status)=>(dispatch)=>{
    dispatch(sendReq())
    return axios.put(`https://apexrecruit-api-flask-app.onrender.com/jobs/update/${id}`,{status:status},{
        headers:{
            'Authorization':token,
        }
    })
    .then((res)=>{
        console.log(res)
        dispatch(reqSucess())
    })
    .catch((err)=>{
        console.log(err)
        dispatch(reqFailed())
    })
}


export const deleteJobPost = (id, token) => (dispatch) => {
    dispatch(sendReq());
    return axios
      .delete(`https://apexrecruit-api-flask-app.onrender.com/jobs/delete/${id}`,{}, {
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json', // Set the content type to JSON
        },
      })
      .then((res) => {
        console.log('Response:', res.data);
        dispatch(reqSucess());
      })
      .catch((err) => {
        console.error('Error:', err);
        dispatch(reqFailed());
      });
  };
  
  
// export const deleteJobPost=(id,token)=>(dispatch)=>{
//     dispatch(sendReq())
//     return axios
//     .delete(`http://127.0.0.1:5000/jobs/delete/${id}`,{
//         headers:{
//             'Authorization':token,
//         }
//     })
//     .then((res)=>{
//         console.log(res)
//         dispatch(reqSucess())
//     })
//     .catch((err)=>{
//         console.log(err)
//         dispatch(reqFailed())
//     })
// }

export const jobApply=(id,token)=>(dispatch)=>{
    dispatch(sendReq())
    return axios.post(`https://apexrecruit-api-flask-app.onrender.com/applications/apply/${id}`,{},{
        headers:{'Authorization':token}
    })
    .then(res=>{
        dispatch()
        console.log(res)
    })
    .catch((err)=>{
        dispatch(failedReq())
        console.log(err)
    })
}

export const getCreatedpost=(token)=>(dispatch)=>{
    dispatch(sendReq())
    axios.get(`https://apexrecruit-api-flask-app.onrender.com/jobs/created`,{
        headers:{'Authorization':token}
    })
    .then(res=>{
        // console.log(res.data.job_postings)
        dispatch(getCreatedpostReqSuccess(res.data.job_postings))
    })
    .catch(err=>{
        dispatch(failedReq())
        console.log(err)
    })
}

export const getSingleCreatedpost=(id,token)=>(dispatch)=>{
    dispatch(sendReq())
    axios.get(`https://apexrecruit-api-flask-app.onrender.com/jobs/get/${id}`,{
        headers:{'Authorization':token}
    })
    .then(res=>{
        // console.log(res.data.data)
        dispatch(getSingleCreatedpostReqSuccess(res.data.data))
    })
    .catch(err=>{
        dispatch(failedReq())
        console.log(err)
    })
}

export const getApplicants=(id,token)=>(dispatch)=>{
    dispatch(sendReq())
    axios(`https://apexrecruit-api-flask-app.onrender.com/applications/job/${id}`,{
        headers:{'Authorization':token}
    })
    .then(res=>{
        // console.log(res.data.applications)
        dispatch(getApplicantsReq(res.data.applications))
    })
    .catch(()=>{
        // console.log(err)
        dispatch(failedReq())
    })
}

export const getSingleApplicants=(id,token)=>(dispatch)=>{
    dispatch(sendReq())
    axios(`https://apexrecruit-api-flask-app.onrender.com/applications/get/${id}`,{
        headers:{'Authorization':token}
    })
    .then(res=>{
        // console.log(res.data.applications)
        dispatch(getApplicantsReq(res.data.applications))
    })
    .catch(err=>{
        console.log(err)
        dispatch(failedReq())
    })
}

export const updateApplicationStatus=(id,token,status)=>(dispatch)=>{
    dispatch(sendReq())
    return axios.put(`https://apexrecruit-api-flask-app.onrender.com/applications/update/${id}`,{status:status},{
        headers:{'Authorization':token}
    })
    .then(res=>{
        dispatch(reqSucess())
        console.log(res.data)
    })
    .catch(()=>{
        // console.log(err)
        dispatch(failedReq())
    })
}