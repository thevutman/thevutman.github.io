import React, {useEffect} from 'react';
import './Header.scss'

const Header = () => {
    let count = window.scrollY
    useEffect(()=>{
        nav()
        window.addEventListener('scroll', nav)
    },[])

    function menuOpen() {
        const menuBtn = document.getElementById('menuBtn')
        const menu = document.getElementById('menu')
        const nav = document.querySelector('.nav')

        menuBtn.classList.toggle('active')
        menu.classList.toggle('active')
        nav.classList.toggle('active')
    }

    function darkMode(){
        document.querySelectorAll('.dark-mode')[0].classList.toggle('active')
        document.querySelectorAll('.dark-mode')[1].classList.toggle('active')
        document.body.classList.toggle('dark')

    }

    function nav() {
        let scroll = window.scrollY
        const items = document.getElementById('nav__items')
        const nav = document.getElementById('nav')

        if(window.screen.width > 991){
            if(scroll == 0){
                nav.classList.remove('scrollUp')
            }
            else if(scroll < count){
                nav.classList.remove('scrollUp')
            }
            else if(scroll > count){
                nav.classList.add('scrollUp')
            }
        }
        count = scroll

        if (scroll < window.screen.height){
            items.classList.add('active')
            console.log(1)
        }
        else if(scroll > window.screen.height){
            items.classList.remove('active')
            console.log(2)
        }
    }

    return (
        <header>
            <nav className='nav' id='nav'>
                <section className='nav__items' id='nav__items'>
                    <div className="nav__items--title">
                        <h1>Thevutman</h1>
                    </div>
                    <div className="nav__items--links">
                        <ul>
                            <li>About me</li>
                            <li>Projects</li>
                            <li>Education</li>
                            <li>Contact</li>
                        </ul>
                    </div>
                    <div className="nav__items--elements">
                        <ul className='menu__social-networks'>
                            <li><i class="fa-brands fa-square-twitter"></i></li>
                            <li><i class="fa-brands fa-linkedin"></i></li>
                        </ul>
                        <button className='dark-mode' onClick={darkMode}>
                            <span><i class="fa-solid fa-sun"></i></span>
                            <span><i class="fa-solid fa-moon"></i></span>
                        </button>
                    </div>
                </section>
                <section className='nav__items--mobile'>
                    <i class="fa-solid fa-house"></i>
                    <i class="fa-solid fa-folder"></i>
                    <div className="nav__menu-btn" id="menuBtn" onClick={menuOpen}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </section>
            </nav>
            <section className='menu' id='menu'>
                <h1>Thevutman</h1>
                <ul className='menu__items'>
                    <li>About me</li>
                    <li>Projects</li>
                    <li>Education</li>
                    <li>Contact</li>
                </ul>
                <ul className='menu__social-networks'>
                    <li><i class="fa-brands fa-square-twitter"></i></li>
                    <li><i class="fa-brands fa-linkedin"></i></li>
                </ul>
                <button className='dark-mode' onClick={darkMode}>
                    <span><i class="fa-solid fa-sun"></i></span>
                    <span><i class="fa-solid fa-moon"></i></span>
                </button>
            </section>
        </header>
    );
};

export default Header;