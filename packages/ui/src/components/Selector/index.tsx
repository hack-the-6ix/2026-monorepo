'use client';

import {
  ComponentPropsWithRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { ChevronDown } from 'lucide-react';

import { Button } from '../Button';
import { InputGroup, InputGroupProps } from '../InputGroup';
import { Typography } from '../Typography';

import './index.css';

export interface Option {
  label: string;
  value: string;
}

export interface SelectorProps extends InputGroupProps<'div'> {
  options: Option[];
  input?: Omit<ComponentPropsWithRef<'input'>, 'required' | 'disabled'>;
  controlled?: {
    onValueChange: (value: string) => void;
    value: string;
  };
  hasOther?: boolean;
}

export function Selector({
  options,
  input,
  controlled,
  hasOther = true,
  ...props
}: SelectorProps) {
  const ref = useRef<HTMLDivElement>(null);
  useImperativeHandle(props.ref, () => ref.current!);

  const [isOpen, setIsOpen] = useState(false);
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const allOptions = useMemo(() => {
    if (hasOther)
      return [...options, { label: 'Other...', value: 'OTHER_OPTION' }];
    return options;
  }, [options, hasOther]);

  const filteredOptions = useMemo(() => {
    return allOptions.filter((opt) =>
      opt.label.toLowerCase().includes(searchInput.toLowerCase()),
    );
  }, [allOptions, searchInput]);

  const handleSelect = (option: Option) => {
    if (option.value === 'OTHER_OPTION') {
      setIsOtherSelected(true);
      setSearchInput('');
      controlled?.onValueChange?.('');
    } else {
      setIsOtherSelected(false);
      setSearchInput(option.label);
      controlled?.onValueChange?.(option.value);
    }
    setIsOpen(false);
  };

  return (
    <InputGroup {...props} ref={ref} className="relative">
      <Typography
        className={cn(
          'input__box dark:text-white dark:font-normal',
          isOtherSelected && 'border-indigo-300',
        )}
        textColor="text-indigo-700"
        textSize="paragraph-sm"
        textWeight="medium"
        as="div"
      >
        {isOtherSelected && (
          <Typography
            textColor="text-indigo-700"
            textSize="paragraph-sm"
            className="dark:text-white"
          >
            Other:{' '}
          </Typography>
        )}
        <input
          {...input}
          className={cn('input__el', input?.className)}
          onFocus={() => !isOtherSelected && setIsOpen(true)}
          onChange={(e) => {
            const val = e.target.value;
            if (isOtherSelected) {
              controlled?.onValueChange?.(val);
              input?.onChange?.(e);
            } else {
              setSearchInput(val);
              setIsOpen(true);
            }
          }}
          placeholder={
            isOtherSelected ?
              'Please specify "other"...'
            : 'Select or search...'
          }
          aria-describedby={`${props.id}--${props.name}--status`}
          aria-invalid={props.info?.type === 'error'}
          value={
            isOtherSelected ? (controlled?.value ?? input?.value) : searchInput
          }
          required={props.required}
          disabled={props.disabled}
          id={`${props.id}--input`}
          name={props.name}
        />

        {isOtherSelected ?
          <Button
            kind="tertiary"
            onClick={() => setIsOtherSelected(false)}
            className="reset_button"
          >
            Reset
          </Button>
        : <Typography
            textColor="text-indigo-700"
            textSize="paragraph-sm"
            className={cn('dark:text-white', isOpen && 'tansform rotate-180')}
          >
            <ChevronDown />
          </Typography>
        }
      </Typography>

      {/* dropdown menu */}
      {isOpen && !isOtherSelected && !props.disabled && (
        <div className="dropdown_menu">
          {filteredOptions.map((option) => (
            <div
              key={option.value}
              className={'options'}
              onClick={() => handleSelect(option)}
            >
              <Typography
                textSize="paragraph-sm"
                textColor="text-indigo-700"
                className="dark:text-white"
              >
                {option.label}
              </Typography>
            </div>
          ))}
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => {
            setIsOpen(false);
            setSearchInput('');
          }}
        />
      )}
    </InputGroup>
  );
}
