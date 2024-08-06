import React, { useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchConcerns } from '../features/concerns/concernsSlice';
import './Concerns.css';
import Slider from "react-slick";

const Concerns = () => {
  const dispatch = useDispatch();
  const concerns = useSelector((state) => state.concerns.concerns);
  const status = useSelector((state) => state.concerns.status);
  const error = useSelector((state) => state.concerns.error);

  useEffect(() => {
    console.log('Fetching concerns');
    dispatch(fetchConcerns());
  }, [dispatch]);

  console.log('Concerns:', concerns);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>{error}</p>;

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Tablet and larger
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768, // Tablet
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 480, // Mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true
        }
      }
    ]
  };

  return (
    <div className="concerns-section">
      <h2 className='text-center p-3'>Shop by Concerns</h2>
      
      <div className="concerns-carousel">
        <Slider {...settings}>
          {concerns.map((concern) => (
            <div key={concern.id} className="concern-card">
              <img src={concern.image} alt={concern.name} className="concern-image" />
              <p className="concern-name">{concern.name}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Concerns;



// import React,{useEffect} from 'react'
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import {useDispatch,useSelector} from 'react-redux'
// import { fetchConcerns } from '../features/concerns/concernsSlice';
// import './Concerns.css';
// import Slider from "react-slick";


// const Concerns = () => {
//     const dispatch = useDispatch();
//     const concerns=useSelector((state)=>state.concerns.concerns);
//     const status=useSelector((state)=>state.concerns.status);
//     const error=useSelector((state)=>state.concerns.error);

//     useEffect(() =>{
//         console.log('Fetching concerns');
//         dispatch(fetchConcerns());
//     },[dispatch])
    
//     console.log('Concerns:', concerns);

//   if (status === 'loading') return <p>Loading...</p>;
//   if (status === 'failed') return <p>{error}</p>;

//   var settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1024, // Tablet and larger
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true
//         }
//       },
//       {
//         breakpoint: 768, // Tablet
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true
//         }
//       },
//       {
//         breakpoint: 480, // Mobile
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           dots: true
//         }
//       }
//     ]
//   };
    

//   return (
//     <div className="concerns-section">
//       <h2 className='text-center p-3'>Shop by Concerns</h2>
      
//       <div className="concerns-carousel">
//       <Slider {...settings}>
//         {concerns.map((concern) => (
//           <div key={concern.id} className="concern-card">
//             <img src={concern.image} alt={concern.name} className="concern-image" />
//             <p className="concern-name">{concern.name}</p>
//           </div>
//         ))}
//        </Slider>
//       </div>
      
//     </div>
//   )
// }

// export default Concerns;  
