export default function Layout(props) {
  const { children } = props;

  const header = <header>
    <div>
        <h1 className="text-gradient">CAFFIEND</h1>
        <p>For Coffee Insatiates</p>
    </div>
    <button>
        <p>Sign up free</p>
        <i class="fa-solid fa-mug-hot"></i>
    </button>
  </header>;
  const footer = <footer>
    <p><span className="text-gradient">Caffiend</span> was made by <a href="https://rafeyosa.netlify.app/" target="_blank">Rafeyosa</a> <br />using the <a href="https://www.fantacss.smoljames.com/" target="_blank">FantaCSS</a> design library.<br />Check out the project on <a href="https://github.com/rafeyosa/caffiend.git" target="_blank">Github</a></p>
  </footer>;

  return (
    <>
      {header}
      <main>{children}</main>
      {footer}
    </>
  );
}
