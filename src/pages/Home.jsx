import React from 'react';
import '../styles/Home.scss';
import AboutMe from '../components/aboutMe/AboutMe';
import Footer from '../components/footer/Footer';
import Skills from '../components/skills/Skills';
import Slider from '../components/slider/Slider';
import Target from '../components/targets/Target';

const Home = () => {
    return (
        <div className='main'>
            {/* <Slider />
            <Main /> */}
            <section className='main-landing'>
                <div></div>
            </section>
            <section className='main-container'>
                <AboutMe />
                <Target />
                <Skills />
                <Footer />
            </section>
        </div>
    );
};

export default Home;