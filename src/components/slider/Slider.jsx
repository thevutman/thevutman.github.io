import React, { useEffect } from 'react';
import './Slider.scss'

import img1 from '../../assets/slider/1.png'
import img2 from '../../assets/slider/2.png'
import img3 from '../../assets/slider/3.png'

const Slider = () => {

    useEffect(() => {
        let isDown = false;
        let startX;
        let scrollLeft;

        const activities = document.querySelector('.slider__items');

        activities.addEventListener('mousedown', (e) => {
            isDown = true;
            activities.classList.add('active');
            startX = e.pageX - activities.offsetLeft;
            scrollLeft = activities.scrollLeft;
            console.log(activities.offsetLeft)
        });
        activities.addEventListener('mouseleave', () => {
            isDown = false;
            activities.classList.remove('active');
        });
        activities.addEventListener('mouseup', () => {
            isDown = false;
            activities.classList.remove('active');
        });
        activities.addEventListener('mousemove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - activities.offsetLeft;
            const walk = (x - startX) * 2; //scroll-fast
            activities.scrollLeft = scrollLeft - walk;
        });

        function slider(i) {
            let count = i
            const x = document.querySelectorAll('.slider__img')
            const y = document.querySelector('.slider__items')
            let size = window.screen

            console.log(y.scrollLeft/size.width)

            if (count == x.length-1){

                if(y.scrollLeft/size.width != x.length-1){
                    console.log('l'+1)
                }
                y.classList.toggle('slide')
                y.scrollLeft = 0
                y.classList.toggle('slide')
                count = 0
            }
            else{
                count++
                y.classList.toggle('slide')
                y.scrollLeft += size.width
                y.classList.toggle('slide')
            }

            setTimeout(function(){slider(count)}, 5000)

        }

        slider(2)
        
    },[])

    return (
        <div className="slider">
            <div className="slider__items">
                <div>
                    <img src={img1} alt="" className='slider__img' />
                </div>
                <div>
                    <img src={img2} alt="" className='slider__img' />
                </div>
                <div>
                    <img src={img3} alt="" className='slider__img' />
                </div>
            </div>
            <div className="slider__next" style={{color:"#ffffff"}}></div>
            <div className="slider__prev" style={{color:"#ffffff"}}></div>
            <div className="slider__pagination"></div>
        </div>
    );
};

export default Slider;