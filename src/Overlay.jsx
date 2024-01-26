import React from 'react';

const OverlayComponent = ({ isVisible, handleExploreClick }) => {
return (
    console.log('overlay is visible', isVisible),
    <div className={`hud-cust ${isVisible ? 'visible' : 'hidden'}`} id="hudcust">
        <div className="hud-title">Samira's journey</div>
        <div className="hud-why">Why ?</div>
        <div className="hud-langs"></div>
        <div className={`explore-block ${isVisible ? 'visible' : 'hidden'}`} id='exploreBlock'>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam minima exercitationem, sunt ad odit suscipit cum commodi earum dolore, libero esse autem corrupti quidem accusantium. Sit eius voluptates pariatur aut!</p>
            <div className="explore-btn" onClick={handleExploreClick}>
                EXPLORE
            </div>
        </div>
    </div>
);
};

export default OverlayComponent;
