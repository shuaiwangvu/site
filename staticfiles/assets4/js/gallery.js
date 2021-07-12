import * as THREE from '//cdn.skypack.dev/three@0.129?min'
import { OrbitControls } from '//cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls?min'
import { EffectComposer, Pass, FullScreenQuad } from '//cdn.skypack.dev/three@0.129.0/examples/jsm/postprocessing/EffectComposer?min'
import { RenderPass } from '//cdn.skypack.dev/three@0.129.0/examples/jsm/postprocessing/RenderPass?min'
import { RadialBlurPassGen } from '//cdn.jsdelivr.net/gh/ycw/three-radial-blur@3.1.1/src/index.js'
import { DualBloomPassGen } from '//cdn.jsdelivr.net/gh/ycw/three-dual-bloom@1.1.7/src/index.js'
import { LensDistortionPassGen } from '//cdn.jsdelivr.net/gh/ycw/three-lens-distortion@1.0.0/src/index.js'
import gsap from '//cdn.skypack.dev/gsap@3.6.1'

// ----
// main
// ----

const renderer = new THREE.WebGLRenderer({ alpha: true });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 2, .1, 100);
const controls = new OrbitControls(camera, renderer.domElement);

camera.position.set(0, -.25, 1.5);
controls.enableDamping = true;
renderer.shadowMap.enabled = true;

const light = new THREE.DirectionalLight();
light.position.set(2, 2, 2);
scene.add(light);
light.castShadow = true;
light.shadow.mapSize.set(2048, 2048);

function Picture(url) {
  const map = new THREE.TextureLoader().load(url, (tex) => {
    mesh.scale.set(tex.image.width / tex.image.height, 1, 1);
  });
  const geom = new THREE.BoxGeometry(1, 1, 0.01); // 1 x 1
  const mat = new THREE.MeshBasicMaterial({ map });
  const mesh = new THREE.Mesh(geom, mat);
  mesh.castShadow = true;
  return mesh;
}

const urls = [
  'https://images.unsplash.com/photo-1621207897490-c63a4ad33e85?ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MjV8fHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
  'https://images.unsplash.com/photo-1621207897795-4863c966a0bf?ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MjZ8fHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
  'https://images.unsplash.com/photo-1621207897387-a32678a77b5d?ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MjJ8fHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
];

const pics = new THREE.Group();
pics.position.set(0, 0, -3);
for (const [i, url] of urls.entries()) {
  const pic = Picture(url);
  const ang = (i / urls.length) * Math.PI * 2;
  pic.position.x = 3 * Math.sin(ang);
  pic.position.z = 3 * Math.cos(ang);
  pic.lookAt(new THREE.Vector3());
  pics.add(pic);
}
scene.add(pics);

// ----
// ground
// ----

{
  const geom = new THREE.PlaneGeometry(100, 100).rotateX(-0.5 * Math.PI);
  const mat = new THREE.ShadowMaterial();
  const mesh = new THREE.Mesh(geom, mat);
  mesh.position.y = -1;
  mesh.receiveShadow = true;
  scene.add(mesh);
}

// ----
// render
// ----

const RadialBlurPass = RadialBlurPassGen({ THREE, Pass, FullScreenQuad });
const DualBloomPass = DualBloomPassGen({ THREE, Pass, FullScreenQuad });
const LensDistortionPass = LensDistortionPassGen({ THREE, Pass, FullScreenQuad });
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new RadialBlurPass({ intensity: .02, maxIterations: 16 }));
composer.addPass(new DualBloomPass({ threshold: 0.2, blurriness: 0.5, intensity: 0.5 }));
composer.addPass(new LensDistortionPass({
  distortion: new THREE.Vector2(-.4, .5),
  focalLength: new THREE.Vector2(.7, .5)
}));

renderer.setAnimationLoop(() => {
  composer.render();
  controls.update();
});

gsap.timeline({ repeat: -1, defaults: { delay: 2, duration: 2, ease: 'elastic' }})
  .to(pics.rotation, { y: Math.PI * 2 * 1 / 3 })
  .to(pics.rotation, { y: Math.PI * 2 * 2 / 3 })
  .to(pics.rotation, { y: Math.PI * 2 * 3 / 3 })

// ----
// view
// ----

function resize(w, h, dpr = devicePixelRatio) {
  renderer.setPixelRatio(dpr);
  renderer.setSize(w, h, false);
  composer.setPixelRatio(dpr);
  composer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
addEventListener('resize', () => resize(innerWidth, innerHeight));
dispatchEvent(new Event('resize'));
document.body.prepend(renderer.domElement);
