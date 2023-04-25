import { useEffect, useRef, useState } from "react";

type DropdownProps = {
  open: boolean;
  children: React.ReactNode | React.ReactNode[];
  className?: string;
};

const Dropdown = ({ open, children, className }: DropdownProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (wrapperRef.current !== null) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [wrapperRef]);

  return (
    <div
      className="overflow-hidden duration-200"
      style={open ? { height: `${height}px` } : { height: "0px" }}
    >
      <div ref={wrapperRef} className={className}>
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
