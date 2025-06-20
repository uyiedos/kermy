
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useEffect, useState, useRef } from 'react';
import useFace from '../../../hooks/demo/use-face';
import useHover from '../../../hooks/demo/use-hover';
import useTilt from '../../../hooks/demo/use-tilt';
import { useLiveAPIContext } from '../../../contexts/LiveAPIContext';

// Minimum volume level that indicates audio output is occurring
const AUDIO_OUTPUT_DETECTION_THRESHOLD = 0.05;
// Amount of delay between end of audio output and setting talking state to false
const TALKING_STATE_COOLDOWN_MS = 2000;

export default function KermitFace() {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { volume } = useLiveAPIContext();
  const [isTalking, setIsTalking] = useState(false);
  const [svgScale, setSvgScale] = useState(0.3);

  const { eyeScale: blinkScale } = useFace(); // mouthScale is not used for geometry now
  const hoverPosition = useHover({ amplitude: 8 });
  const tiltAngle = useTilt({
    maxAngle: 8,
    speed: 0.075,
    isActive: isTalking,
  });

  useEffect(() => {
    function calculateScale() {
      const smallerDimension = Math.min(window.innerWidth, window.innerHeight);
      // Adjusted divisor for viewbox 0 0 48 48 to maintain similar perceived size
      setSvgScale(smallerDimension / 600);
    }
    window.addEventListener('resize', calculateScale);
    calculateScale();
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  useEffect(() => {
    if (volume > AUDIO_OUTPUT_DETECTION_THRESHOLD) {
      setIsTalking(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(
        () => setIsTalking(false),
        TALKING_STATE_COOLDOWN_MS
      );
    }
  }, [volume]);

  const eyeOpenness = blinkScale > 0.5 ? 1 : 0.05; // Blink almost closed

  return (
    <div
      className="kermit-face-container"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `translateY(${hoverPosition}px) rotate(${tiltAngle}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
      role="img"
      aria-label="Animated face of Kermit the Frog"
    >
      <svg
        width={48 * 5 * svgScale} // Base width of 48 units from viewbox, scaled
        height={48 * 5 * svgScale} // Base height of 48 units from viewbox, scaled
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* User-provided SVG content starts here */}
        <path fill="#689f38" d="M40.074,28.111c0,0-5.889,4.333-5.889,10.111S24.074,44,24.074,44s-10.111,0-10.111-5.778 S8.074,28.111,8.074,28.111H40.074z"/>
        <path fill="#7cb342" d="M43,24.5C43,30.333,28.385,37,24,37S5,30.333,5,24.5S19.615,7,24,7S43,18.667,43,24.5z"/>

        {/* Right Eye (from user SVG, was top-left in their structure) */}
        <g id="kermit-right-eye">
          <path
            fill="#e0e0e0"
            d="M26,10c0,0,1.778,5.556,9,7c2.889-2.889,2.708-7.167-1.167-9.333C30.463,5.782,26,10,26,10z"
            style={{ transformOrigin: '32px 10px', transition: 'transform 0.05s linear' }}
            transform={`scaleY(${eyeOpenness})`}
          />
          <circle cx="32" cy="12" r="2" fill="#424242" visibility={eyeOpenness > 0.5 ? 'visible' : 'hidden'}/>
          <path fill="#424242" d="M33.668,15.055c-1.814-2.721-5.029-4.122-5.062-4.136l0.787-1.838 c0.154,0.066,3.798,1.654,5.938,4.864L33.668,15.055z" visibility={eyeOpenness > 0.5 ? 'visible' : 'hidden'}/>
        </g>

        {/* Left Eye (from user SVG, was top-right in their structure) */}
        <g id="kermit-left-eye">
          <path
            fill="#e0e0e0"
            d="M22,10c0,0-1.778,5.556-9,7c-2.889-2.889-2.708-7.167,1.167-9.333C17.537,5.782,22,10,22,10z"
            style={{ transformOrigin: '16px 10px', transition: 'transform 0.05s linear' }}
            transform={`scaleY(${eyeOpenness})`}
          />
          <circle cx="16" cy="12" r="2" fill="#424242" visibility={eyeOpenness > 0.5 ? 'visible' : 'hidden'}/>
          <path fill="#424242" d="M14.332,15.055l-1.664-1.109c2.141-3.21,5.784-4.798,5.938-4.864l0.789,1.837 C19.363,10.933,16.136,12.35,14.332,15.055z" visibility={eyeOpenness > 0.5 ? 'visible' : 'hidden'}/>
        </g>

        {/* Static Mouth line (from user SVG) */}
        <path fill="#558b2f" d="M24,30c-7.204,0-15.193-4.941-15.53-5.152l1.06-1.696C9.607,23.2,17.375,28,24,28 c6.637,0,14.393-4.799,14.47-4.848l1.061,1.696C39.193,25.059,31.204,30,24,30z"/>

        {/* Other details from user SVG (nostrils/cheek details) */}
        <path fill="#558b2f" d="M39.948,27.316l-1.896-0.633c0.741-2.225-1.514-3.789-1.61-3.854l1.113-1.662 C38.813,22.006,40.931,24.37,39.948,27.316z"/>
        <path fill="#558b2f" d="M8.052,27.316c-0.982-2.946,1.136-5.31,2.394-6.148l1.109,1.664L11,22l0.559,0.83 c-0.097,0.065-2.352,1.629-1.61,3.854L8.052,27.316z"/>
        {/* User-provided SVG content ends here */}
      </svg>
    </div>
  );
}
