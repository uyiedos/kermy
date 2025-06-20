
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

const galleryItems = [
  { id: 1, title: 'Kermy Screeching', description: 'Witness the sound of the pump!', color: '#34a853' },
  { id: 2, title: 'Diamond Webfeet', description: 'HODLing strong on the lily pad.', color: '#4285f4' },
  { id: 3, title: 'Kermy on Solana', description: 'Surfing the blockchain waves.', color: '#fbbc04' },
  { id: 4, title: 'To the Moon!', description: 'Next stop: lunar cheese.', color: '#ea4335' },
];

const ImageGallery: React.FC = () => {
  return (
    <div className="image-gallery-container">
      <h2>Kermy's Meme Stash</h2>
      <div className="gallery-grid">
        {galleryItems.map(item => (
          <div key={item.id} className="gallery-item-card">
            <div className="gallery-item-placeholder" style={{ backgroundColor: item.color, color: 'white' }}>
              <span className="placeholder-icon">🖼️</span>
              <p>{item.title}</p>
            </div>
            <div className="gallery-item-info">
              {/* If we had actual images, the title would be here or as alt text */}
              {/* <h3>{item.title}</h3> */}
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
