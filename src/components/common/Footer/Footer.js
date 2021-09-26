import React from "react";
import "./Footer.scss";
import { SiAppstore } from "react-icons/si";

function Header() {
  return (
    <footer>
      <p>
        문의 : algosketch@gmail.com
        <i className="xi-google-play xi-2x" />
        <SiAppstore className="app-store" />
      </p>
    </footer>
  );
}

export default Header;
