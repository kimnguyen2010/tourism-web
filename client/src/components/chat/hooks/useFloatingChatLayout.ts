import { useEffect, useState } from "react";

type FloatingChatLayout = {
  panelWidth: number;
  panelHeight: number;
  inset: number;
};

const DESKTOP_BREAKPOINT = 768;
const MOBILE_INSET = 20;
const DESKTOP_INSET = 24;
const LAUNCHER_SIZE = 64;
const STACK_GAP = 12;
const DESKTOP_WIDTH_RATIO = 0.28;
const MOBILE_WIDTH_RATIO = 0.92;

function getViewportSize() {
  if (typeof window === "undefined") {
    return { width: 0, height: 0 };
  }

  return {
    width: window.visualViewport?.width ?? window.innerWidth,
    height: window.visualViewport?.height ?? window.innerHeight
  };
}

function calculateLayout(): FloatingChatLayout {
  const viewport = getViewportSize();
  const isDesktop = viewport.width >= DESKTOP_BREAKPOINT;
  const inset = isDesktop ? DESKTOP_INSET : MOBILE_INSET;
  const horizontalSpace = Math.max(viewport.width - inset * 2, 280);
  const verticalSpace = Math.max(viewport.height - inset * 2 - LAUNCHER_SIZE - STACK_GAP, 360);
  const widthRatio = isDesktop ? DESKTOP_WIDTH_RATIO : MOBILE_WIDTH_RATIO;

  return {
    inset,
    panelWidth: Math.min(horizontalSpace, Math.round(viewport.width * widthRatio)),
    panelHeight: verticalSpace
  };
}

export function useFloatingChatLayout(): FloatingChatLayout {
  const [layout, setLayout] = useState<FloatingChatLayout>(() => calculateLayout());

  useEffect(() => {
    const updateLayout = () => setLayout(calculateLayout());

    updateLayout();
    window.addEventListener("resize", updateLayout);
    window.visualViewport?.addEventListener("resize", updateLayout);
    window.visualViewport?.addEventListener("scroll", updateLayout);

    return () => {
      window.removeEventListener("resize", updateLayout);
      window.visualViewport?.removeEventListener("resize", updateLayout);
      window.visualViewport?.removeEventListener("scroll", updateLayout);
    };
  }, []);

  return layout;
}
