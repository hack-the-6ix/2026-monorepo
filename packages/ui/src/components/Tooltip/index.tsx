import { ComponentPropsWithRef, ElementType, ReactNode } from 'react';
import { Info } from 'lucide-react';

import { PolymorphicProps } from '../..';
import { Typography } from '../Typography';

import './index.css';

export type TooltipProps<T extends ElementType> = PolymorphicProps<
  {
    description: ReactNode;
    icon?: ReactNode;
    bgColor?: string;
    textColor?: string;
    children?: never;
  },
  T
>;

export function Tooltip<T extends ElementType = 'div'>({
  as,
  description,
  bgColor,
  textColor,
  icon = <Info />,
  ...props
}: TooltipProps<T>) {
  const Component = as ?? 'div';
  return (
    <Component
      {...(props as ComponentPropsWithRef<T>)}
      className="tooltip"
      style={
        {
          '--tooltip-bg': bgColor,
          '--tooltip-text-color': textColor,
        } as React.CSSProperties
      }
    >
      <span className="tooltip__icon">{icon}</span>

      <Typography as="span" textSize="label" className="tooltiptext">
        {description}
      </Typography>
    </Component>
  );
}
