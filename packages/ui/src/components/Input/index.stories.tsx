import { Banana } from 'lucide-react';

import preview from '#/preview';
import { InputGroupStatus, inputGroupStatuses } from '../InputGroup';
import { Input as component } from '.';

interface InputStoryArgs {
  leftAddon?: boolean;
  rightAddon?: boolean;
  infoType?: InputGroupStatus;
  infoText?: string;
  disabled?: boolean;
  value?: string;
}

const meta = preview.type<{ args: InputStoryArgs }>().meta({
  title: 'Modules/Inputs/Input',
  component,
});

export const Input = meta.story({
  argTypes: {
    leftAddon: { control: 'boolean' },
    rightAddon: { control: 'boolean' },
    input: { table: { disable: true } },
    controlled: { table: { disable: true } },
    name: { table: { disable: true } },
    id: { table: { disable: true } },
    infoText: { control: 'text' },
    infoType: {
      control: 'select',
      options: inputGroupStatuses,
    },
  },
  render: ({ infoType, infoText, leftAddon, rightAddon, ...args }) => {
    const Component = component;
    return (
      <Component
        {...args}
        leftAddon={
          leftAddon ? <Banana size="100%" className="size-2.5" /> : undefined
        }
        rightAddon={
          rightAddon ? <Banana size="100%" className="size-2.5" /> : undefined
        }
        info={
          infoType || infoText ?
            { type: infoType, message: infoText }
          : undefined
        }
        input={{
          placeholder: 'owo placeholder',
        }}
      />
    );
  },
  args: {
    label: 'owo label',
    leftAddon: false,
    rightAddon: false,
    hideLabel: false,
    required: false,
    disabled: false,
    name: 'owo-name',
    id: 'owo-id',
  },
});

export default meta;
