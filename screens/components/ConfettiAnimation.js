import React from 'react';
import Confetti from 'react-native-magic-confetti';
import FastImage from 'react-native-fast-image';

const ConfettiAnimation = () => {
  return (
    <Confetti
      count={50} // custom number of confettis
      size={20}
      colors={['#0F60B0', '#16BCE4']} // require FastImage
      imageComponent={FastImage} // custom image component
      confettiImages={[
        require('../../asset/star.png'),
        require('../../asset/stars.png'),
        require('../../asset/square.png'),
      ]} // all confetti images to be chosen randomly
      yspeed={3} // fall speed
    />
  );
};

export default ConfettiAnimation;
