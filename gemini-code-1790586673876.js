// 1. THREE.JS 3D SCENE SETUP
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg-canvas'),
    antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Create 3D Wireframe Cyber Object
const geometry = new THREE.IcosahedronGeometry(10, 2);
const material = new THREE.MeshBasicMaterial({ color: 0x00ffcc, wireframe: true });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Floating Star Particles
const particlesGeometry = new THREE.BufferGeometry();
const count = 700;
const positions = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 100;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const particlesMaterial = new THREE.PointsMaterial({ size: 0.25, color: 0x58a6ff });
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Mouse Interaction
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) - 0.5;
    mouseY = (event.clientY / window.innerHeight) - 0.5;
});

// Render Loop
function animate() {
    requestAnimationFrame(animate);

    sphere.rotation.x += 0.003;
    sphere.rotation.y += 0.003;

    sphere.rotation.x += mouseY * 0.03;
    sphere.rotation.y += mouseX * 0.03;

    renderer.render(scene, camera);
}

animate();

// Resize Handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 2. FILE DOWNLOAD FUNCTIONALITY
function downloadFile(filename, textContent) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(textContent));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

document.getElementById('download-btn').addEventListener('click', () => {
    // Download index.html
    const htmlContent = document.documentElement.outerHTML;
    downloadFile('index.html', htmlContent);

    alert('Downloaded index.html! Copy the CSS and JS code into style.css and script.js files in the same folder.');
});