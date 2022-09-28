import React, { useState } from 'react'
import Carousel from 'react-elastic-carousel';
import carousel1 from '../../images/carousel1.png'
import carousel2 from '../../images/carousel2.png'
import carousel3 from '../../images/carousel3.png'

import Key from '../../images/Key.png'

import '../../Components/Carousel/CarouselComponent.css'


function CarouselComponent() {
  const [objectData, setObjectData] = useState([
    { id: 1, image: carousel1 },
    { id: 2, image: carousel2 },
    { id: 3, image: carousel3 },
    { id: 4, image: carousel1 },
    { id: 5, image: carousel2 },
    { id: 10, image: carousel3 },
    { id: 11, image: carousel1 },
    { id: 12, image: carousel2 },
    { id: 13, image: carousel3 },
    { id: 14, image: carousel1 },
    { id: 15, image: carousel2 },
    { id: 16, image: carousel3 },
    { id: 17, image: carousel1 }
  ])

  const breakPoints = [
    { width: 500, itemsToShow: 3 },
    { width: 768, itemsToShow: 4 },
    { width: 1200, itemsToShow: 5 },
    { width: 1500, itemsToShow: 6 },
  ]

  return (
    <div className='carosel-section' >
      <Carousel breakPoints={breakPoints} >
        {
          objectData.map((ele, ind) => {
            return (
              <div key={ind} style={{ marginTop: '10%', marginLeft: "2%", marginBottom: "3%" }} >
                <div className="card" style={{ width: '100%', paddingBottom: '5%' }}>
                  <img className="card-img-top" width='500px' src={ele.image} alt="Card image cap" />
                  <div className="card-body">
                    <h5 className="carosel-section-title1 ">TOURSIM</h5>
                    <h2 className='carosel-section-title2' >Travel and Tourism</h2>
                    <h6 className='carosel-section-title3' >30 Classes |  6 Months</h6>
                    <div className='button-div' >
                      <div className='d-flex button-content' >
                        <div className='button-icon' >
                          <img src={Key} width='13px' height='13px' />
                        </div>
                        <div>
                          <h5 className='button-title' >Enroll Now</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </Carousel>
    </div>
  )
}
export default CarouselComponent