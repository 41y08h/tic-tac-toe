import React from "react";
import ActionButton from "./ActionButton";
import { CallEnd } from "@material-ui/icons";

export default function RejectButton(props) {
  return <ActionButton color="red" icon={CallEnd} {...props} />;
}
