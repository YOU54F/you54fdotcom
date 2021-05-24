import * as React from "react";
import { StyleContext } from "../contexts/StyleContext";

export default function Controls(props: any) {
  const style = React.useContext(StyleContext);

  const { controlButtonLabels } = props;
  const { showControlButtons } = props;
  // @ts-ignore
  const consoleCtrl: string = style ? style["consoleCtrl"] : "";
  const getButtonLabel: (arg0: string) => string = (label: string) => {
    if (style !== null) return "";
    else return "";
  };

  const controlButtons = showControlButtons
    ? controlButtonLabels.map((buttonLabel: string) => (
        <div
          key={buttonLabel}
          className={`${consoleCtrl} ${getButtonLabel(buttonLabel)}`}
        />
      ))
    : null;
  // @ts-ignore

  return <div className={style.controls}>{controlButtons}</div>;
}
