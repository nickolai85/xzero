import React from "react";

export default props => (
  <div>
    <button value={2} onClick={props.clickBtn}>
    Signin
    </button>
    <button value={1} onClick={props.clickBtn}>
    Signup
    </button>
  </div>
);