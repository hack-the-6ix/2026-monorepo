import { ElementType } from 'react';
import cn from 'classnames';

import type { PolymorphicProps } from '../index.d';
import { ButtonColor, theme } from './theme';

export type ButtonProps<T extends ElementType = 'button'> = PolymorphicProps<
  {
    buttonColor?: ButtonColor;
  },
  T
>;
export function Button<T extends ElementType = 'button'>({
  buttonColor = 'owo',
  as,
  ...props
}: ButtonProps<T>) {
  const Component = as ?? 'button';
  const styles = theme[buttonColor];
  return (
    <Component
      {...props}
      className={cn('p-2 rounded-sm', styles, props.className)}
    />
  );
}
