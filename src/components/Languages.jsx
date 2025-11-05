import geo from '../assets/Flag_of_Georgia.svg';
import eng from '../assets/Flag_of_the_United_Kingdom.svg.webp';


function Languages() {
  return (
    <>
    <div className='languages'>
        <img src={geo} alt="Georgian flag" />
        <img src={eng} alt="Britain flag" />
    </div>
   
    </>
  )
}

export default Languages