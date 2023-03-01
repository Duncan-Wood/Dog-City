import Nav from "./Nav";
import DogCityLogo from '../Assets/DogCityLogo.png'

export default function Header() {
  return (
    <div>
      <div className="header">
      <img className='logo' src={DogCityLogo} alt="Dog City Logo"/>
        {/* <div className="header-title">
          <h1>Dog City</h1>
        </div> */}
        <div className="nav-container">
          <Nav />
        </div>
      </div>
    </div>
  );
}
