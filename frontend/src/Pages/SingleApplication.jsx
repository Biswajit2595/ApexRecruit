
import { useParams } from 'react-router-dom'

const SingleApplication = () => {
    const {id}=useParams()
    // const { token, }
  return (
    <div>SingleApplication
        {id}
    </div>
  )
}

export default SingleApplication