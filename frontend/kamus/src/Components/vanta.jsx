import React, { useEffect, useRef } from "react";
import * as THREE from "three"; // Mengimpor Three.js
import Vanta from "vanta/dist/vanta.net.min"; // Mengimpor efek Vanta

const VantaBackground = () => {
  const containerRef = useRef(null); // Referensi untuk elemen yang akan diberikan efek Vanta

  useEffect(() => {
    const vantaEffect = Vanta({
      el: containerRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 600.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
    });

    return () => {
      vantaEffect.destroy(); // Bersihkan efek ketika komponen di-unmount
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
};

export default VantaBackground;
