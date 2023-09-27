import React from 'react';

const COLORS = {
  red: [231, 76, 60], // Red (Pomegranate)
  orange: [211, 84, 0], // Orange (Oragne)
  yellow: [241, 196, 15], // Yellow (Sun Flower)
  green: [39, 174, 96], // Green (Nephritis)
};

// Function to interpolate between two colors based on a percentage
const lerpColors = (color1: number[], color2: number[], t: number) => {
  const r = Math.round(color1[0] + t * (color2[0] - color1[0]));
  const g = Math.round(color1[1] + t * (color2[1] - color1[1]));
  const b = Math.round(color1[2] + t * (color2[2] - color1[2]));
  return [r, g, b];
};

const WeightBar: React.FC<{ percent: number; durability?: boolean }> = ({ percent, durability }) => {
  const getColor = React.useMemo(() => {
    if (percent >= 0 && percent <= 25) {
      const t = percent / 25; // Calculate the interpolation factor
      return lerpColors(COLORS.red, COLORS.orange, t);
    } else if (percent >= 26 && percent <= 50) {
      const t = (percent - 25) / 25;
      return lerpColors(COLORS.orange, COLORS.yellow, t);
    } else if (percent >= 51 && percent <= 75) {
      const t = (percent - 50) / 25;
      return lerpColors(COLORS.yellow, COLORS.green, t);
    } else if (percent >= 76 && percent <= 100) {
      const t = (percent - 75) / 25;
      return lerpColors(COLORS.green, COLORS.green, t); // Use green for the upper range
    } else {
      return COLORS.red; // Default to red for values outside the specified range
    }
  }, [percent]);

  return (
    <div className={durability ? 'durability-bar' : 'weight-bar'}>
      <div
        style={{
          visibility: percent > 0 ? 'visible' : 'hidden',
          height: '100%',
          width: `${percent}%`,
          backgroundColor: `rgb(${getColor.join(', ')})`,
          transition: `background ${0.3}s ease, width ${0.3}s ease`,
        }}
      ></div>
    </div>
  );
};
export default WeightBar;
