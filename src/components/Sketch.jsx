import React, { createRef, useEffect } from 'react';
import p5 from 'p5';

export const SketchComponent = () => {
  const myRef = createRef();
  let c1, c2;
  const Sketch = (p) => {
    p.setup = () => {
      p.createCanvas(800, 800);

      c1 = p.color(`hsba(${hue + 100}, 100%, 20%, 1)`);
      c2 = p.color(`hsba(${hue}, 60%, 100%, 0)`);
    };

    const numVertices = 10;
    const radius = 200;
    const centerX = 400;
    const centerY = 400;
    const hue = 200;
    let offset = 0;
    let xoff = 0;
    // let xoff2 = 0;
    // let yoff = 0;

    p.draw = () => {
      p.background(150);
      p.noFill();
      for(let k = 0; k < 1; k++) {
        for(let j = radius; j >= 40; j -= 0.6){
          p.beginShape();
          const thisColor = p.lerpColor(c1, c2, j / radius - 0.1);
          p.noStroke();
          for(let i = 0; i < numVertices * 2; i++) {
            p.fill(thisColor);
            offset = p.map(
              p.noise(p.cos(p.TWO_PI / numVertices * i) + 1,
                p.sin(p.TWO_PI / numVertices * i) + 1, xoff),
              0, 1, -25, 25);
            
            
            p.curveVertex(
              centerX + (j + p.sin(offset) * 30) *
              p.cos(p.TWO_PI / numVertices * i),
              centerY + (j + p.sin(offset) * 30) *
              p.sin(p.TWO_PI / numVertices * i)
            );
            if(j % 100 === 0) xoff += 0.00003;
            
          }
      
          p.endShape(p.CLOSE);
        //   yoff += 0.000002;
        }
          
      }
    };
  }
    useEffect(() => {
      const myp5 = new p5(Sketch, myRef.current);
      return myp5;
    }, []);

  
  return <div ref={myRef}></div>;
};

