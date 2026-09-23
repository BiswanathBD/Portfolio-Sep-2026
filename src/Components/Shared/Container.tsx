import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Container = ({
  children,
  className,
  ...props
}: ContainerProps) => {
  return (
    <div
      className={`max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
