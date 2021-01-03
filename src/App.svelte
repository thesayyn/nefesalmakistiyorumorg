<script>
  import { onMount } from "svelte";
  import * as three from "three";

  let canvas;

  onMount(() => {
    const renderer = new three.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const camera = new three.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(0, 20, 100);
    camera.lookAt(0, -30, 0);
    camera.layers.enable(1);
    camera.layers.enable(2);

    const scene = new three.Scene();

    const directionalLight = new three.DirectionalLight(0xffffff, 1);

    scene.add(directionalLight);

    renderer.render(scene, camera);

    move = (event) => {
      event.preventDefault();
      camera.position.z += event.deltaY * -0.05;
      renderer.render(scene, camera);
    };

    fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      count = data.length
      const material = new three.MeshLambertMaterial({ color: three });

const geometry = new three.SphereGeometry(3, 32, 32);

for (let index = 0; index < count; index++) {
  const circle = new three.Mesh(geometry, material);
  circle.position.set(
    Math.random() * 5 * (Math.random() < 0.5 ? -1 : 1),
    0,
    30 * index
  );

  scene.add(circle);
}
    });
  });

  let move;

  let count = "";


</script>

<style>
  main {
    display: flex;
    flex-flow: column;
    height: 100%;
    color: #fff;
    background: radial-gradient(
      circle,
      rgba(24, 24, 24, 1) 0%,
      rgba(0, 0, 0, 1) 100%
    );
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    z-index: 1;
  }
  header img {
    color: #fff;
    width: 50px;
  }
  header h1 {
    margin: 0;
    font-size: 4rem;
  }

  /* content */
  div {
    flex: 1;
  }
  canvas {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    z-index: 0;
  }

  /* footer */
  footer {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    align-self: flex-end;
    width: 100%;
    padding: 5px 15px;
  }
  footer h1 {
    font-weight: 100;
    margin: 0;
    font-family: "Amatic SC", cursive;
    opacity: 0.7;
  }
  footer ul {
    display: flex;
    gap: 20px;
    float: right;
    font-weight: 500;
    margin: 0;
    padding: 0;
  }
  footer ul li:first-of-type {
    list-style: none;
  }
  footer ul li {
    padding-right: 10px;
  }
  footer ul li a {
    text-decoration: none;
    color: currentColor;
  }
</style>

<main>
  <header>
    <img alt="monument" src="monument.svg" />
    <h1>{count}</h1>
  </header>

  <div />
  <canvas bind:this={canvas} on:mousewheel={move} />

  <footer>
    <h1># stopfemicide</h1>
    <ul>
      <li>why</li>
      <li>data source</li>
      <li>
        <a
          target="blank"
          href="https://github.com/thesayyn/nefesalmakistiyorumorg">contribute</a>
      </li>
    </ul>
  </footer>
</main>
