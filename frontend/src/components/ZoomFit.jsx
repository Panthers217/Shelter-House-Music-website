import { useLayoutEffect, useRef, useState } from "react";

export default function ZoomFit({ children, scale = 0.8 }) {
  const innerRef = useRef(null);
  const [height, setHeight] = useState("auto");

  useLayoutEffect(() => {
    const updateHeight = () => {
      if (!innerRef.current) return;
      const unscaledHeight = innerRef.current.scrollHeight;
      setHeight(unscaledHeight * scale);
    };

    updateHeight();

    const ro = new ResizeObserver(updateHeight);
    ro.observe(innerRef.current);
    window.addEventListener("resize", updateHeight);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, [scale]);

  return (
    <div style={{ height, overflow: "hidden" }}>
      <div
        ref={innerRef}
        className="scale-[0.8] origin-top-left w-[125%]"
      >
        {children}
      </div>
    </div>
  );
}
