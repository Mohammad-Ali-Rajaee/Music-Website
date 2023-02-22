import "./Aside.css";

const Aside = () => {
  return (
    <aside className="p-aside absolute h-screen w-20 left-0 top-0 bottom-0">
      <div className="p-aside__container h-full w-full">
        <div className="p-aside__logo h-12 w-12 rounded-full text-white text-xl flex items-center justify-center">
          M
        </div>
        <nav className="p-aside__menu">
          <ul className="menu__stream">
            <li>
              <span class="lnr lnr-home"></span>
            </li>
            <li>
              <span class="material-symbols-outlined">library_music</span>
            </li>
            <li>
              <span class="lnr lnr-mic"></span>
            </li>
            <li>
              <span class="material-symbols-outlined">graphic_eq</span>
            </li>
            <li>
              <span class="lnr lnr-diamond"></span>
            </li>
            <li>
              <i class="fa-solid fa-headphones"></i>
            </li>
            <li>
              <i class="fa-solid fa-podcast"></i>
            </li>
          </ul>
          <ul className="menu__purchase"></ul>
          <ul className="menu__playlist"></ul>
        </nav>
      </div>
    </aside>
  );
};

export default Aside;
