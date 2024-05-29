// src/components/Icon.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const IconWrapper = styled.div<{ color?: string; size?: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg {
    width: ${(props) => props.size || '24px'};
    height: ${(props) => props.size || '24px'};
    fill: ${(props) => props.color || 'currentColor'};
    transition: 0.15s linear fill;
  }
`;

interface IconProps {
  name: string;
  color?: string;
  size?: string;
}

const Icon: React.FC<IconProps> = ({ name, color, size }) => {
  const [SvgIcon, setSvgIcon] = useState<React.FC<
    React.SVGProps<SVGSVGElement>
  > | null>(null);

  useEffect(() => {
    console.log(name);
    const loadIcon = async () => {
      try {
        const icon = (await import(`../assets/${name}.svg`)).default;
        setSvgIcon(icon);
      } catch (error) {
        console.error(`Error loading icon: ${name}`, error);
      }
    };
    loadIcon();
  }, [name]);

  if (!SvgIcon) {
    return null;
  }

  return (
    <IconWrapper color={color} size={size}>
      <SvgIcon />
    </IconWrapper>
  );
};

export default Icon;
