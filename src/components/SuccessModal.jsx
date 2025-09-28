import { useNavigate } from "react-router-dom";

function Success({ isOpen, onClose }) {
if(!isOpen) return null
    const navigate = useNavigate();


  return (<>
     <div className='overlay' onClick={onClose}>
        
     </div>
      
    
</>

);
}

export default Success;