import { Merge } from '@/index';
import preview from '#/preview';
import type { InputGroupStatus } from '../InputGroup';
import { TextInput as component, TextInputProps } from '.';

import '#/index.css';

type TextInputArgs = Merge<TextInputProps, { status: InputGroupStatus }>;

const meta = preview.type<TextInputArgs>().meta({
  title: 'Modules/Inputs/TextInput',
  component,
});

export const TextInput = meta.story({
  argTypes: {
    controlled: {
      table: { disable: true },
    },
    inputGroup: {
      table: { disable: true },
    },
  },
  args: {
    placeholder: 'owo wats dis?',
    inputGroup: {
      label: 'owo label',
      info: {
        message: 'owo info',
      },
    },
  },
});

export default meta;
