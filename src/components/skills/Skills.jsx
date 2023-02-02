import React from 'react';
import './Skils.scss';

const Skills = () => {
    return (
        <section>
            <h2>SKILLS</h2>
            <div className="skills">
                <span>
                    <i class="fa-brands fa-html5"></i>
                </span>
                <span>
                    <i class="fa-brands fa-css3-alt"></i>
                </span>
                <span>
                    <i class="fa-brands fa-square-js"></i>
                </span>
            </div>
            <h2>FRAMEWORKS</h2>
            <div className="frameworks">
                <span>
                    <i class="fa-brands fa-sass"></i>
                </span>
                <span>
                    <i class="fa-brands fa-react"></i>
                </span>
            </div>
        </section>
    );
};

export default Skills;