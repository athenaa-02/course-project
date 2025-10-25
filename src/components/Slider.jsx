import { useEffect, useState } from "react";
import styles from './Slider.module.css'
import one from '../assets/sliderImages/1.jpg'
import two from '../assets/sliderImages/2.jpg'
import three from '../assets/sliderImages/3.jpg'


const images = [
    one, two, three
];

function Slider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

//   ||||||||||||||||||||||||||||||||||||||||||||||||||

  return (
    <>
      <div className={styles.slider}>
        <img src={images[index]} alt="slide" className={styles.slide_image} />
        <div className="dots">
          {images.map((_, i) => (
            <span
              key={i}
              className='image'
              onClick={() => setIndex(i)}
            ></span>
          ))}
        </div>
      </div>
    </>
  );
}

export default Slider;
