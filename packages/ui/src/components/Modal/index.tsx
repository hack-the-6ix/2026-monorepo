import { ElementType, ReactNode, useEffect, useRef } from 'react';
import cn from 'classnames';

import { PolymorphicProps } from '../..';
import { Typography } from '../Typography';

import './index.css';

export type ModalProps<T extends ElementType> = PolymorphicProps<
  {
    label: ReactNode;
    actions: ReactNode;
    backgroundColor?: `bg-${string}` | null;
    isOpen: boolean;
    onClose: () => void;
  },
  T
>;

export function Modal<T extends ElementType = 'dialog'>({
  label,
  actions,
  backgroundColor,
  isOpen,
  onClose,
  as,
  children,
  ...props
}: ModalProps<T>) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const Component = as ?? 'dialog';

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen]);

  return (
    <Component
      {...props}
      ref={dialogRef}
      onClose={onClose}
      className={cn('modal', props.className, backgroundColor)}
    >
      <Typography
        textColor="text-white"
        textSize="subtitle-lg"
        textWeight="extra-bold"
        className="modal-content"
      >
        {label}
      </Typography>
      {children}
      <div className="modal-content">{actions}</div>
    </Component>
  );
}
