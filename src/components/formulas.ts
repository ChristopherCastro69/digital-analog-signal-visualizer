export const NRZL = (
  c: CanvasRenderingContext2D,
  BINARY: string,
  HEIGHT: number
) => {
  c.beginPath();
  c.lineWidth = 2.5;
  c.setLineDash([0, 0]);
  c.strokeStyle = "red";

  // Determine the starting level based on the first bit
  const startPoint = BINARY.charAt(0) === "1" ? -50 : +50; // High for "1", Low for "0"
  c.moveTo(50, HEIGHT / 2 + startPoint); // Start position

  for (let i = 50, j = 0; j < BINARY.length; i += 50, j++) {
    if (BINARY.charAt(j) === "0") {
      // Draw low level for "0"
      c.lineTo(i, HEIGHT / 2 + 50); // Draw to low level
      c.lineTo(i + 50, HEIGHT / 2 + 50); // Continue at low level
    } else {
      // Draw high level for "1"
      c.lineTo(i, HEIGHT / 2 - 50); // Draw to high level
      c.lineTo(i + 50, HEIGHT / 2 - 50); // Continue at high level
    }
  }
  c.stroke();
  c.closePath();
};

export const NRZI = (
  c: CanvasRenderingContext2D,
  BINARY: string,
  HEIGHT: number
) => {
  let inverse = true; // Track the current level
  let currentLevel = HEIGHT / 2 + 50; // Start at the ground level
  c.beginPath();
  c.lineWidth = 2.5;
  c.setLineDash([0, 0]);
  c.strokeStyle = "red";
  c.moveTo(50, currentLevel); // Start position

  for (let i = 50, j = 0; j < BINARY.length; i += 50, j++) {
    if (BINARY.charAt(j) === "1") {
      // Toggle the level for "1"
      currentLevel = inverse ? HEIGHT / 2 - 50 : HEIGHT / 2 + 50; // Set the new level based on the current state
      c.lineTo(i, currentLevel); // Draw to the new level
      c.lineTo(i + 50, currentLevel); // Continue at the new level
      inverse = !inverse; // Toggle the inverse state
    } else {
      // For "0", maintain the current level
      c.lineTo(i + 50, currentLevel); // Draw to the current level
    }
  }
  c.stroke();
  c.closePath();
};

export const bipolarAMI = (
  c: CanvasRenderingContext2D,
  BINARY: string,
  HEIGHT: number
) => {
  let inverse = true; // Track the current level
  c.beginPath();
  c.lineWidth = 2.5;
  c.setLineDash([0, 0]);
  c.strokeStyle = "red";
  c.moveTo(50, HEIGHT / 2); // Start position

  for (let i = 50, j = 0; j < BINARY.length; i += 50, j++) {
    if (BINARY.charAt(j) === "1" && inverse) {
      // If the bit is "1" and we are in the high state
      c.lineTo(i, HEIGHT / 2 - 50); // Draw to high level
      c.lineTo(i + 50, HEIGHT / 2 - 50); // Continue at high level
      inverse = false; // Toggle to low state
    } else if (BINARY.charAt(j) === "1" && !inverse) {
      // If the bit is "1" and we are in the low state
      c.lineTo(i, HEIGHT / 2 + 50); // Draw to low level
      c.lineTo(i + 50, HEIGHT / 2 + 50); // Continue at low level
      inverse = true; // Toggle to high state
    } else {
      // If the bit is "0"
      c.lineTo(i, HEIGHT / 2); // Draw to zero level
      c.lineTo(i + 50, HEIGHT / 2); // Continue at zero level
    }
  }
  c.stroke();
  c.closePath();
};

export const pseudoternary = (
  c: CanvasRenderingContext2D,
  BINARY: string,
  HEIGHT: number
) => {
  let inverse = true; // Track the current level
  c.beginPath();
  c.lineWidth = 2.5;
  c.setLineDash([0, 0]);
  c.strokeStyle = "red";
  c.moveTo(50, HEIGHT / 2); // Start position

  for (let i = 50, j = 0; j < BINARY.length; i += 50, j++) {
    if (BINARY.charAt(j) === "0") {
      // If the bit is "0", alternate levels
      const level = inverse ? HEIGHT / 2 - 50 : HEIGHT / 2 + 50; // Alternate between high and low
      c.lineTo(i, level); // Draw to the current level
      c.lineTo(i + 50, level); // Continue at the current level
      inverse = !inverse; // Toggle the state
    } else {
      // If the bit is "1", no line signal
      c.lineTo(i, HEIGHT / 2); // Draw to zero level
      c.lineTo(i + 50, HEIGHT / 2); // Continue at zero level
    }
  }
  c.stroke();
  c.closePath();
};

export const manchester = (
  c: CanvasRenderingContext2D,
  BINARY: string,
  HEIGHT: number
) => {
  let currentLevel = HEIGHT / 2;
  c.beginPath();
  c.lineWidth = 2.5;
  c.setLineDash([0, 0]);
  c.strokeStyle = "red";

  // Initialize the starting level based on the first bit
  if (BINARY.charAt(0) === "1") currentLevel = 50; // High level for "1"
  else currentLevel = -50; // Low level for "0"

  c.moveTo(50, HEIGHT / 2 + currentLevel); // Start position

  for (let i = 50, j = 0; j < BINARY.length; i += 50, j++) {
    if (BINARY.charAt(j) === "1") {
      currentLevel = 50; // Set to high level
      c.lineTo(i, HEIGHT / 2 + currentLevel); // Draw to current level
      c.lineTo(i + 25, HEIGHT / 2 + currentLevel); // Midpoint
      currentLevel = -50; // Toggle to low level
      c.lineTo(i + 25, HEIGHT / 2 + currentLevel); // Draw to low level
      c.lineTo(i + 50, HEIGHT / 2 + currentLevel); // Continue at low level
    } else {
      currentLevel = -50; // Set to low level
      c.lineTo(i, HEIGHT / 2 + currentLevel); // Draw to current level
      c.lineTo(i + 25, HEIGHT / 2 + currentLevel); // Midpoint
      currentLevel = 50; // Toggle to high level
      c.lineTo(i + 25, HEIGHT / 2 + currentLevel); // Draw to high level
      c.lineTo(i + 50, HEIGHT / 2 + currentLevel); // Continue at high level
    }
  }
  c.stroke();
  c.closePath();
};

export const differentialManchester = (
  c: CanvasRenderingContext2D,
  BINARY: string,
  HEIGHT: number
) => {
  let currentLevel = HEIGHT / 2;
  c.beginPath();
  c.lineWidth = 2.5;
  c.setLineDash([0, 0]);
  c.strokeStyle = "red";

  // Initialize the starting level based on the first bit
  if (BINARY.charAt(0) === "1") currentLevel = +50; // Start low for "1"
  else currentLevel = -50; // Start high for "0"

  c.moveTo(50, HEIGHT / 2 + currentLevel); // Start position

  for (let i = 50, j = 0; j < BINARY.length; i += 50, j++) {
    if (BINARY.charAt(j) === "1") {
      c.lineTo(i + 25, HEIGHT / 2 + currentLevel); // Draw to the current level
      currentLevel = currentLevel * -1; // Toggle level
      c.lineTo(i + 25, HEIGHT / 2 + currentLevel); // Midpoint (same level)
      c.lineTo(i + 50, HEIGHT / 2 + currentLevel); // Continue at the new level
    } else {
      currentLevel = currentLevel * -1; // Toggle level first
      c.lineTo(i, HEIGHT / 2 + currentLevel); // Draw to current level
      c.lineTo(i + 25, HEIGHT / 2 + currentLevel); // Midpoint (same level)
      currentLevel = currentLevel * -1; // Toggle level again
      c.lineTo(i + 25, HEIGHT / 2 + currentLevel); // Draw to the new level
      c.lineTo(i + 50, HEIGHT / 2 + currentLevel); // Continue at the new level
    }
  }
  c.stroke();
  c.closePath();
};

export const uniPolarNRZ = (
  c: CanvasRenderingContext2D,
  BINARY: string,
  HEIGHT: number
) => {
  c.beginPath();
  c.lineWidth = 2.5;
  c.strokeStyle = "red";
  c.moveTo(50, HEIGHT / 2);
  for (let i = 0; i < BINARY.length; i++) {
    if (BINARY[i] === "1") {
      c.lineTo(50 + i * 50, HEIGHT / 2 - 50);
      c.lineTo(50 + (i + 1) * 50, HEIGHT / 2 - 50);
    } else {
      c.lineTo(50 + i * 50, HEIGHT / 2);
      c.lineTo(50 + (i + 1) * 50, HEIGHT / 2);
    }
  }
  c.stroke();
  c.closePath();
};

export const MLT3 = (
  c: CanvasRenderingContext2D,
  BINARY: string,
  HEIGHT: number
) => {
  c.beginPath();
  c.lineWidth = 2.5;
  c.strokeStyle = "red";
  let currentLevel = 0;

  for (let i = 0; i < BINARY.length; i++) {
    if (BINARY[i] === "1") {
      currentLevel = (currentLevel + 1) % 3; // Cycle through levels 0, 1, 2
      const y = HEIGHT / 2 - currentLevel * 50;
      c.lineTo(50 + i * 50, y);
      c.lineTo(50 + (i + 1) * 50, y);
    } else {
      c.lineTo(50 + i * 50, HEIGHT / 2);
      c.lineTo(50 + (i + 1) * 50, HEIGHT / 2);
    }
  }
  c.stroke();
  c.closePath();
};
// Placeholder for B8ZS and HDB3 implementations
export const B8ZS = (
  c: CanvasRenderingContext2D,
  BINARY: string,
  HEIGHT: number
) => {
  c.beginPath();
  c.lineWidth = 2.5;
  c.strokeStyle = "brown";
  c.moveTo(50, HEIGHT / 2);
  // B8ZS logic would go here
  c.stroke();
  c.closePath();
};

export const HDB3 = (
  c: CanvasRenderingContext2D,
  BINARY: string,
  HEIGHT: number
) => {
  c.beginPath();
  c.lineWidth = 2.5;
  c.strokeStyle = "gray";
  c.moveTo(50, HEIGHT / 2);
  // HDB3 logic would go here
  c.stroke();
  c.closePath();
};

export const selectMethod = (
  method: string,
  c: CanvasRenderingContext2D,
  BINARY: string,
  HEIGHT: number
) => {
  switch (method) {
    case "uniPolarNRZ":
      uniPolarNRZ(c, BINARY, HEIGHT);
      break;
    case "NRZL":
      NRZL(c, BINARY, HEIGHT);
      break;
    case "NRZI":
      NRZI(c, BINARY, HEIGHT);
      break;
    case "AMI":
      bipolarAMI(c, BINARY, HEIGHT);
      break;
    case "PST":
      pseudoternary(c, BINARY, HEIGHT);
      break;
    case "MLT3":
      MLT3(c, BINARY, HEIGHT);
      break;
    case "MAN":
      manchester(c, BINARY, HEIGHT);
      break;
    case "diffMan":
      differentialManchester(c, BINARY, HEIGHT);
      break;
    case "B8ZS":
      B8ZS(c, BINARY, HEIGHT);
      break;
    case "HDB3":
      HDB3(c, BINARY, HEIGHT);
      break;
    default:
      break;
  }
};
