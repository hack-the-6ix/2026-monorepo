import { ComponentPropsWithRef, ElementType } from 'react';

export type Merge<A, B> = Omit<A, keyof B> & B;
export type PolymorphicProps<Props, T extends ElementType> = Merge<
  ComponentPropsWithRef<T>,
  Merge<Props, { as?: T }>
>;

export * from './components/Button';
export * from './components/Checkbox';
export * from './components/Input';
export * from './components/InputArea';
export * from './components/InputGroup';
export * from './components/Modal';
export * from './components/Selector';
export * from './components/Selector';
export * from './components/Tooltip';
export * from './components/Typography';
export * from './components/UploadFile';
