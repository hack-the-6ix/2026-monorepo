import { ElementType, ReactNode } from 'react';
import cn from 'classnames';

import { PolymorphicProps } from '../..';
import { Button } from '../Button';
import { Typography } from '../Typography';

import './index.css';

export type ModelProps<T extends ElementType> = PolymorphicProps<
  {
    label: ReactNode;
    actionButtonMessage: ReactNode;
    destructive?: boolean;
    backgroundColor?: string;
  },
  T
>;

export function Model<T extends ElementType = 'div'>({
  label,
  actionButtonMessage,
  destructive = false,
  backgroundColor,
  as,
  children,
  ...props
}: ModelProps<T>) {
  const Component = as ?? 'div';
  return (
    <div className="fixed inset-0 flex dark:bg-white/20 bg-black/20 items-center justify-center">
      <Component
        {...props}
        className={cn('model', props.className)}
        style={
          {
            '--model-bg': backgroundColor,
          } as React.CSSProperties
        }
      >
        <Typography
          textColor="text-white"
          textSize="subtitle-lg"
          textWeight="extra-bold"
        >
          {label}
        </Typography>
        {children}
        <div className="button_position">
          <Button kind="secondary" destructive={destructive}>
            Cancel
          </Button>
          <Button kind="primary" destructive={destructive}>
            {actionButtonMessage}
          </Button>
        </div>
      </Component>
    </div>
  );
}
