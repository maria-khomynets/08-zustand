"use client";

import { RotatingLines } from "react-loader-spinner";
import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.loader}>
      <RotatingLines
        visible={true}
        width="60"
        strokeColor="#3f52ae"
        strokeWidth="4"
        animationDuration="0.75"
      />
    </div>
  );
}
