import React , {useState} from 'react';
import PopIn from './PopIn.jsx'; // Adjust the path based on your project structure

const OverlayComponent = ({ isVisible, handleExploreClick, handleMusicBtn }) => {

const [isPopInVisible, setPopinVisible] = useState(false);
const [isWhyVisible, setWhyVisible] = useState(true);
const handleWhyClick = () => {
    console.log('WHY clicked');
    setPopinVisible(true);
    setWhyVisible(false);
    };

    const handlePopinClose = () => {
    console.log('Closing PopIn');
    setPopinVisible(false);
    setWhyVisible(true);
    };
return (
    
    console.log('overlay is visible', isVisible),
    <div className={`hud-cust ${isVisible ? 'visible' : 'hidden'}`} id="hudcust">
        <div className="hud-title">SAMIRA'S JOURNEY</div>
        <button className={`hud-why ${isWhyVisible ? 'visible' : 'hidden'}`} onClick={handleWhyClick}>
            WHY ?
        </button>
        <div className="hud-langs"></div>
        <div className={`explore-block ${isVisible ? 'visible' : 'hidden'}`} id='exploreBlock'>
            <p>
            “War makes people invisible.<br/>
            War steals the past and the future.<br/>
            The only support that remains is the present moment and fragments of memories that the war did not have time to finish for lunch.”
            </p>
            <div className="explore-btn" onClick={handleExploreClick}>
                EXPLORE
            </div>
        </div>
        <div className="music-btn" onClick={handleMusicBtn}>
            <div class="sound-text">Sound</div>
            <div class="sound-separator">―</div>
            <div class="sound-state" id="sound-state">OFF</div>
        </div>
        <PopIn isVisible={isPopInVisible} handlePopinClose={handlePopinClose}/>

    </div>
);
};

export default OverlayComponent;
