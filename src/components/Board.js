import React from "react";
import Square from "./Square";

export default function Board({ values, onPlay }) {
  return (
    <div className="board">
      {values.map((value, index) => (
        <Square value={value} onClick={onPlay} id={index} key={index} />
      ))}
    </div>
  );
}
