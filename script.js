const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 6000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("scene"), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

let isPaused = false;
let isDarkMode = true;

// 🌞 Larger realistic Sun
const sunGeometry = new THREE.SphereGeometry(25, 64, 64);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Light Source
const light = new THREE.PointLight(0xffffff, 3.5, 2000);
light.position.set(0, 0, 0);
scene.add(light);

// 🌌 Starfield
const starGeometry = new THREE.BufferGeometry();
const starCount = 15000;
const starVertices = [];
for (let i = 0; i < starCount; i++) {
  starVertices.push(
    THREE.MathUtils.randFloatSpread(4000),
    THREE.MathUtils.randFloatSpread(4000),
    THREE.MathUtils.randFloatSpread(4000)
  );
}
starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3));
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7, sizeAttenuation: true });
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// 🪐 Planets with realistic visual sizes
const orbitRadii = [60, 90, 120, 150, 200, 240, 280, 320];
const planetSizes = [1.2, 2, 2.1, 1.6, 10, 8.5, 4.5, 4.3];
const planetNames = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"];
const colors = [0xaaaaaa, 0xffcc00, 0x3399ff, 0xff6600, 0xff3300, 0xff9900, 0x66ccff, 0x9999ff];

const planets = [];
const angles = [];
const speeds = [];

orbitRadii.forEach((radius, i) => {
  const geometry = new THREE.SphereGeometry(planetSizes[i], 48, 48);
  const material = new THREE.MeshStandardMaterial({ color: colors[i] });
  const planet = new THREE.Mesh(geometry, material);
  planet.name = planetNames[i];
  scene.add(planet);
  planets.push({ mesh: planet, radius });
  angles.push(0);
  speeds.push(0.005 + i * 0.001);
  createSlider(i);
});

camera.position.z = 400;

// Tooltip
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const tooltip = document.createElement("div");
tooltip.className = "tooltip";
document.body.appendChild(tooltip);

function animate() {
  requestAnimationFrame(animate);

  if (!isPaused) {
    planets.forEach((planet, i) => {
      angles[i] += speeds[i];
      planet.mesh.position.x = planet.radius * Math.cos(angles[i]);
      planet.mesh.position.z = planet.radius * Math.sin(angles[i]);
    });
  }

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(planets.map(p => p.mesh));
  if (intersects.length > 0) {
    tooltip.style.display = "block";
    tooltip.innerHTML = intersects[0].object.name;
    tooltip.style.top = (window.innerHeight / 2) + "px";
    tooltip.style.left = (window.innerWidth / 2 + 20) + "px";
  } else {
    tooltip.style.display = "none";
  }

  renderer.render(scene, camera);
}
animate();

function createSlider(i) {
  const controls = document.getElementById("controls");
  const label = document.createElement("label");
  label.innerText = `${planetNames[i]} Speed: `;
  const slider = document.createElement("input");
  slider.type = "range";
  slider.min = "0.001";
  slider.max = "0.05";
  slider.step = "0.001";
  slider.value = speeds[i];
  slider.oninput = (e) => (speeds[i] = parseFloat(e.target.value));
  controls.appendChild(label);
  controls.appendChild(slider);
  controls.appendChild(document.createElement("br"));
}

document.getElementById("toggleAnimation").addEventListener("click", () => {
  isPaused = !isPaused;
  document.getElementById("toggleAnimation").textContent = isPaused
    ? "▶ Resume Animation"
    : "⏸ Pause Animation";
});

document.getElementById("themeToggle").addEventListener("click", () => {
  isDarkMode = !isDarkMode;
  document.body.style.backgroundColor = isDarkMode ? "black" : "white";
  document.body.style.color = isDarkMode ? "white" : "black";
  document.querySelectorAll("button").forEach(btn => {
    btn.style.backgroundColor = isDarkMode ? "#222" : "#eee";
    btn.style.color = isDarkMode ? "#fff" : "#000";
    btn.style.border = "1px solid #888";
  });
});

window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener("click", () => {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(planets.map(p => p.mesh));
  if (intersects.length > 0) {
    const target = intersects[0].object.position;
    camera.position.set(target.x * 1.5, target.y * 1.5, target.z * 1.5 + 30);
    camera.lookAt(target);
  }
});
