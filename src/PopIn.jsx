// PopinComponent.jsx
import React from 'react';
import Credits from './components/Credits.jsx'; 

const PopIn = ({ isVisible, handlePopinClose }) => {
  return (
    <div className={`popin ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="popin-content">
        <p className='creditText'>This site was created as part of a university project which aims at highlighting and putting forward Ukrainian women forced to leave their heritage and homes because of the war.<br/><br/>
Here is <strong>Samira Tymchenko’s testimony.</strong> </p>
        <div className='creditsBox'>
            <h3 className='popinTitle' >CRÉDITS :</h3>
            <div className='creditsFlex'>
                <div className='column'>
                <Credits title="SPECIAL THANKS:" items={['Samira Tymchenko', 'Zlata Tymchenko']} />
                <Credits title="MANAGEMENT:"  items={["Oscar Motta", "IUT Bordeaux Montaigne", "MMI Bordeaux", "La Maison Ukrainienne"]} />
                <Credits title="MUSIC:" items={["DakhaBrakha - Alambari"]} />
                <Credits title="3D SCAN:" items={["Polycam"]} />

                </div>
                <div className='column'>
                    <Credits title="CREATIVE DIRECTION:" items={['Akkouche Anaïs', 'Marilleau Thomas', 'Millot Audrey']} />
                    <Credits title="DEVELOPMENT:"  items={["Despouys André", "Duverneuil Lucas"]} />
                    <Credits title="DIGITAL STRATEGY:" items={["Delavier Anaïs"]} />
                    <Credits title="3D:" items={["Akkouche Anaïs", "Marilleau Thomas"]} />
                </div>
            </div>

        </div>
        <button className='closeButton' onClick={handlePopinClose}><img src='./closeButton.svg'/></button>
      </div>
    </div>
  );
};

export default PopIn;
