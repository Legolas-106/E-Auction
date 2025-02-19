import React from "react";
import { createRoot } from "react-dom/client";
import HammerOverlay from "./basic/hammerOverlay";

let hammerRoot = null;
let isHammerVisible = false;

export function hammerOverlay(action) {
    if (action === "show" && !isHammerVisible) {
      isHammerVisible = true;
      if (!hammerRoot) {
        const hammerDiv = document.createElement("div");
        document.body.appendChild(hammerDiv);
        hammerRoot = createRoot(hammerDiv);
      }
      hammerRoot.render(
        <HammerOverlay
          isOpen={true}
          onClose={() => {
            hammerRoot.unmount();
            isHammerVisible = false;
          }}
        />
      );
    } else if (action === "hide") {
      if (hammerRoot) {
        hammerRoot.unmount();
        isHammerVisible = false;
      }
    }
  }
