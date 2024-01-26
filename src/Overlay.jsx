import React from 'react';

const OverlayComponent = ({ isVisible, handleExploreClick }) => {
return (
    console.log('overlay is visible', isVisible),
    <div className={`hud-cust ${isVisible ? 'visible' : 'hidden'}`} id="hudcust">
        <div className="hud-title">SAMIRA'S JOURNEY</div>
        <div className="hud-why">WHY ?</div>
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
    </div>
);
};

export default OverlayComponent;
