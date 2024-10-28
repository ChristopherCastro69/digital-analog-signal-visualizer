import React, { useEffect, useRef } from "react";
import { selectMethod } from "./formulas";

interface CanvasProps {
  binary: string;
  method: string;
}

const Canvas: React.FC<CanvasProps> = ({ binary, method }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const HEIGHT = 300;
  let WIDTH = window.innerWidth;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const c = canvas.getContext("2d");
      if (c) {
        canvas.width = WIDTH;
        canvas.height = HEIGHT;

        init(c);
      }
    }
  }, [binary, method]);

  const init = (c: CanvasRenderingContext2D) => {
    canvasRef.current!.width = WIDTH;
    drawBoard(c);
    selectMethod(method, c, binary, HEIGHT);
  };

  const drawBoard = (c: CanvasRenderingContext2D) => {
    // Clear the canvas
    c.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);

    // Outer box
    c.beginPath();
    c.moveTo(5, 5);
    c.lineTo(WIDTH - 5, 5);
    c.lineTo(WIDTH - 5, HEIGHT - 5);
    c.lineTo(5, HEIGHT - 5);
    c.closePath();
    c.stroke();

    // 0V line
    c.beginPath();
    c.moveTo(50, HEIGHT / 2);
    c.lineTo(WIDTH - 5, HEIGHT / 2);
    c.setLineDash([10, 5]);
    c.lineWidth = 2;
    c.stroke();
    c.closePath();

    // Horizontal lines and binary numbers
    for (let i = 50, j = 0; i <= 50 * binary.length + 50; i += 50, j++) {
      c.beginPath();
      c.lineWidth = 0.5;
      c.setLineDash([0, 0]);
      c.moveTo(i, 5);
      c.lineTo(i, HEIGHT - 5);
      c.stroke();
      c.closePath();
      drawNumbers(c, i, j);
    }

    // +v line
    c.beginPath();
    c.moveTo(50, HEIGHT / 2 - 50);
    c.lineTo(WIDTH - 5, HEIGHT / 2 - 50);
    c.setLineDash([10, 5]);
    c.lineWidth = 2;
    c.stroke();
    c.closePath();
    c.fillText("+v", 25, HEIGHT / 2 - 50);

    // -v line
    c.beginPath();
    c.moveTo(50, HEIGHT / 2 + 50);
    c.lineTo(WIDTH - 5, HEIGHT / 2 + 50);
    c.setLineDash([10, 5]);
    c.lineWidth = 2;
    c.stroke();
    c.closePath();
    c.fillText("-v", 25, HEIGHT / 2 + 50);

    // 0V label
    c.fillText("0", 25, HEIGHT / 2 + 5);
  };

  const drawNumbers = (c: CanvasRenderingContext2D, i: number, j: number) => {
    c.font = "bold 20px sans-serif";
    if (j < binary.length) {
      c.fillText(binary.charAt(j), i + 25, 30);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      className="mx-auto block border border-gray-600 bg-white" // Added bg-white class
    ></canvas>
  );
};

export default Canvas;
