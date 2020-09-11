import React from "react";

export default function Square(props) {
  return (
    <button className="square" {...props}>
      {props.value}
    </button>
  );
}
