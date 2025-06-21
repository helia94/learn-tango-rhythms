
// Generate winding path coordinates for each concept
export const generateWindingPath = (index: number, total: number) => {
  const progress = index / (total - 1);
  const baseY = progress * 100; // Base vertical progression

  // Create curves using sine waves with different frequencies
  const curve1 = Math.sin(progress * Math.PI * 3) * 15; // Primary curve
  const curve2 = Math.sin(progress * Math.PI * 7) * 8; // Secondary curve
  const curve3 = Math.sin(progress * Math.PI * 11) * 4; // Tertiary curve

  const x = 50 + curve1 + curve2 + curve3; // Center at 50% with curves
  const y = baseY;
  return {
    x,
    y
  };
};
