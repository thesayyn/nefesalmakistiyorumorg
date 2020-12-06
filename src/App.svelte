<script>
  let count = "";

  fetch("data.json")
    .then((response) => response.json())
    .then((data) => (count = data.length));
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
