# 3D Solar System Simulation

This project is a real-time interactive 3D simulation of the solar system, built using HTML, CSS (without animations), JavaScript, and Three.js.

It visually demonstrates how planets orbit the Sun with adjustable speed controls, camera zoom, and a realistic starry background, all rendered using WebGL.

---

## Live Demo

[https://solar-system-nikita.netlify.app](https://solar-system-nikita.netlify.app)  
*(Click to open the hosted version of the project)*

---

## Features

- Real-time orbiting motion for 8 planets
- Scaled visual sizes for the Sun and planets
- Individual speed sliders for each planet
- Pause and Resume animation control
- Tooltip on planet hover
- Click-to-zoom camera focus on planets
- Starfield background using particles
- Light and Dark theme toggle
- No CSS animations used (only JavaScript-based animation)

---

## How It Works

- The Sun and planets are created using `THREE.SphereGeometry`
- Orbital motion is calculated using angles and circular movement
- Animation is handled by JavaScript using `requestAnimationFrame`
- All controls (sliders, buttons) are HTML elements with DOM event handling

---

## Technologies Used

- HTML5
- CSS3 (for layout only, no animations)
- JavaScript (ES6)
- Three.js (via CDN)

---

## Project Structure

# Solar-System-Nikita
