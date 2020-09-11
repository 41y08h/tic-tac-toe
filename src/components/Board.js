import React from "react";
import Square from "./Square";

export default function Board({ values, onPlay }) {
  return (
    <div className="board">
      <Square value={values[0]} onClick={onPlay} id="0" key="0" />
      <Square value={values[1]} onClick={onPlay} id="1" key="1" />
      <Square value={values[2]} onClick={onPlay} id="2" key="2" />
      <Square value={values[3]} onClick={onPlay} id="3" key="3" />
      <Square value={values[4]} onClick={onPlay} id="4" key="4" />
      <Square value={values[5]} onClick={onPlay} id="5" key="5" />
      <Square value={values[6]} onClick={onPlay} id="6" key="6" />
      <Square value={values[7]} onClick={onPlay} id="7" key="7" />
      <Square value={values[8]} onClick={onPlay} id="8" key="8" />
    </div>
  );
}
