import Nav from "./Nav";
import DogCityLogo from "../Assets/DogCityLogo.png";

export default function Header() {
  return (
    <div>
      <div className="header">
        <a href="/">
          <img className="logo" src={DogCityLogo} alt="Dog City Logo" />
        </a>

        <div className="nav-container">
          <Nav />
        </div>
      </div>
    </div>
  );
}
