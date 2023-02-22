import "./Header.css";
import "../../style.css";
import Form from "./Form";
import Button from "../Button";

const Header = () => {
  return (
    <header className="p-header">
      <div className="p-header-container max-w-7xl mx-auto w-full py-5 flex justify-between items-center px-9 lg:pr-3 lg:pl-24">
        <div className="inner flex gap-6 items-center justify-between">
          <Form />
          <div className="p-header__trend font-normal lg:line-clamp-1">
            <span className="trend-btn hidden lg:inline cursor-pointer">
              Trending Songs:{" "}
            </span>
            <span className="text-white hidden lg:inline">
              Dream your moments, Until I Met You ...{" "}
            </span>
          </div>
        </div>
        <div className="p-header__buttons flex items-center gap-5 text-white">
          <Button
            className={"sign-btn rounded-full w-24 h-8"}
            text="Register"
            additional={""}
            handleClick={""}
          />
          <Button
            className={"sign-btn rounded-full w-24 h-8"}
            text="Login"
            additional={""}
            handleClick={""}
          />

          <div class="menu__container lg:hidden text-white">
            <button class="menu">
              <div class="hambergur">
                <div class="line flex"></div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
