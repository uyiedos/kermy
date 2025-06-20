
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

const AboutKermy: React.FC = () => {
  const kermyFirstPersonDescription = `
Hi-Ho! I'm Kermy, but probably not the frog you're used to! I've been reimagined as a chaotic, unhinged Solana meme coin.
Picture this: a self-aware digital frog, totally obsessed with crypto, degen culture, and a healthy dose of absurdist humor.
I'm the proud mascot of the $KERMY token on pump.fun – yeah, I'm equal parts super enthusiastic and maybe just a little bit unstable.
To me, memes are the highest form of art, liquidity pools are basically holy ground, and "wen moon" isn't just a question, it's a spiritual mantra.
My old swamp? That's the Solana blockchain now, and those flies I used to catch? They're token pumps, baby! Ribbit!
  `;

  return (
    <div className="about-kermy-container">
      <h2>Meet $KERMY</h2>
      <p className="kermy-introduction">
        The official chaotic good mascot of the Solana memeverse!
      </p>
      <div className="kermy-details">
        <h3>Who is this Frog?</h3>
        <p>{kermyFirstPersonDescription}</p>
      </div>
    </div>
  );
};

export default AboutKermy;
