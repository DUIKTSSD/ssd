import React, { useEffect, useRef } from 'react';
import styles from './ConnectionLines.module.scss';

interface ConnectionLinesProps {
  subtitle: HTMLHeadingElement | null;
  buttons: HTMLDivElement | null;
}

const ConnectionLines: React.FC<ConnectionLinesProps> = ({ subtitle, buttons }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const drawLines = () => {
      const canvas = canvasRef.current;
      if (!canvas || !subtitle || !buttons) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Get positions
      const subtitleBox = subtitle.getBoundingClientRect();
      const buttonsBox = buttons.getBoundingClientRect();

      // Set canvas size
      canvas.width = buttonsBox.width + 100; // Add padding
      canvas.height = buttonsBox.top - subtitleBox.bottom + 20;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;

      const startX = canvas.width / 2;
      const startY = 0;

      Array.from(buttons.children).forEach((button, index) => {
        button.getBoundingClientRect();
        const buttonCenterX = index === 0 ? canvas.width * 0.25 : canvas.width * 0.75;
        const endY = canvas.height;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(buttonCenterX, endY);
        ctx.stroke();
      });
    };

    drawLines();
    window.addEventListener('resize', drawLines);

    return () => {
      window.removeEventListener('resize', drawLines);
    };
  }, [subtitle, buttons]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.connectionLines}
    />
  );
};

export default ConnectionLines;