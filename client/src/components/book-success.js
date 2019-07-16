import React from "react";
import astronaut from "../assets/images/Astronaut.png";

export default () => (
  <div
    style={{
      width: "100%",
      height: "400px",
      backgroundSize: "auto",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundImage: `url(${astronaut})`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    <div
      style={{
        paddingTop: "120px",
        fontWeight: "600",
        fontSize: "22px"
      }}
    >
      Bon Voyage!
    </div>
  </div>
);
