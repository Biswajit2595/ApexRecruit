import { GET_APPLICANTS_SUCCESS, GET_APPLIED_JOB_SUCCESS, GET_CREATED_POST_SUCCESS, GET_JOB_POST_SUCCESS, GET_RECOMMENDATIONS_SUCCESS, GET_SINGLE_APPLICANT_SUCCESS, GET_SINGLE_CREATED_POST_SUCCESS, GET_SINGLE_JOB_POST_SUCCESS, REQUEST_FAILED, REQUEST_SEND, REQUEST_SUCCESS } from "../ActionType"


const initState={
    isLoading:false,
    isError:false,
    recommendations:'',
    jobposts:[],
    postedJobs:[],
    singlePostedJob:[],
    appliedJobs:[],
    singlePost:[],
    applicants:[],
    singleapplicant:[],
}


export const postReducer=(state=initState,{type,payload})=>{
    switch(type){
        case REQUEST_SEND:
            return {
                ...state,
                isLoading:true,
            }
        case REQUEST_FAILED:
            return {
                ...state,
                isLoading:false,
                isError:true
            }
        case REQUEST_SUCCESS:
            return {
                ...state,
                isLoading:false,
                isError:false
            }
        case GET_JOB_POST_SUCCESS:
            return {
                ...state,
                isLoading:false,
                isError:false,
                jobposts:payload
            }
        case GET_SINGLE_JOB_POST_SUCCESS:
            return {
                ...state,
                isLoading:false,
                isError:false,
                singlePost:payload
            }
        case GET_APPLIED_JOB_SUCCESS:
            return {
                ...state,
                isLoading:false,
                isError:true,
                appliedJobs:payload
            }
        case GET_CREATED_POST_SUCCESS:
            return {
                ...state,
                isLoading:false,
                isError:false,
                postedJobs:payload
            }
            case GET_SINGLE_CREATED_POST_SUCCESS:
                return {
                    ...state,
                    isLoading:false,
                    isError:false,
                    singlePostedJob:payload
                }
            case GET_APPLICANTS_SUCCESS:
                return {
                    ...state,
                    isLoading:false,
                    isError:false,
                    applicants:payload
                }
            case GET_SINGLE_APPLICANT_SUCCESS:
                return {
                    ...state,
                    isLoading:false,
                    isError:false,
                    singleapplicant:payload
                }
            case GET_RECOMMENDATIONS_SUCCESS:
                return {
                    ...state,
                    isLoading:false,
                    isError:false,
                    recommendations:payload
                }
        default: return state
    }
}