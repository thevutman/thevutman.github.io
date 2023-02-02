import React, {useEffect} from 'react';
import './Target.scss';
import steamburger from '../../assets/img/Steam Burger.png';
import Notflix from '../../assets/img/Notflix.png';

const Target = () => {
    useEffect(()=>{
        scrolling()
        noScroll(function () {
            // Scroll parado
            scrolling()
          });

    },[])

    function scrolling() {
        const targets = document.querySelector('.targets')
        const target = document.querySelectorAll('.target')
        let size = window.screen.width
        let scroll = targets.scrollLeft
        let total = Math.ceil(scroll/size)

        for(var i=0;i<=2;i++){
            target[i].classList.remove('active')
        }

        if(total == 0){
            target[0].classList.add("active")
        }
        else if (total == 1){
            target[1].classList.add("active")
        }
        else if (total == 2){
            target[2].classList.add("active")
        }

    }


    function noScroll (callback, refresh = 100) {
        if (!callback || typeof callback !== 'function') return;
        let isScrolling;
        const targets = document.querySelector('.targets')

        targets.addEventListener('scroll', function (event) {

          window.clearTimeout(isScrolling);
          isScrolling = setTimeout(callback, refresh);
        }, false);
      }
      

    return (
        <section>
            <h2>PROJECTS</h2>
            <div className='targets'>
                <div className="target">
                    <img src={steamburger} alt=""/>
                    <h3>Cabañas la Marquesa</h3>
                    <div className='target__btn'>
                        <a href="">Code</a>
                        <a href="">Watch</a>
                    </div>
                </div>
                <div className="target">
                    <img src={Notflix} alt="" />
                    <h3>Notflix</h3>
                    <div className='target__btn'>
                        <a href="https://github.com/thevutman/ciclo4">Code</a>
                        <a href="https://thevutman.github.io/ciclo4/">Watch</a>
                    </div>
                </div>
                <div className="target">
                    <img src={steamburger} alt="" />
                    <h3>Steam Burger</h3>
                    <div className='target__btn'>
                        <a href="https://github.com/thevutman/Steam-Burger">Code</a>
                        <a href='https://thevutman.github.io/Steam-Burger/'>Watch</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Target;