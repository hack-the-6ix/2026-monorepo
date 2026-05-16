import { useState } from 'react';

import preview from '#/preview';
import { InputGroupStatus, inputGroupStatuses } from '../InputGroup';
import { Checkbox as component } from '.';

interface InputStoryArgs {
  infoType?: InputGroupStatus;
  infoText?: string;
  disabled?: boolean;
  value?: boolean;
}

const meta = preview.type<{ args: InputStoryArgs }>().meta({
  title: 'Modules/Inputs/Checkbox',
  component,
});

export const Input = meta.story({
  argTypes: {
    option: { control: 'object' },
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
  render: ({ infoType, infoText, ...args }) => {
    const Component = component;
    const [val, setVal] = useState(false);
    return (
      <div className="flex flex-col gap-4">
        <Component
          {...args}
          controlled={{
            value: val,
            onValueChange: setVal,
          }}
          info={
            infoType || infoText ?
              { type: infoType, message: infoText }
            : undefined
          }
        />
        <div className="p-2 dark:text-neutral-100  rounded text-[10px] font-mono">
          State Value: {val ? 'true' : 'false'}
        </div>
      </div>
    );
  },
  args: {
    label: 'owo label',
    hideLabel: false,
    required: false,
    disabled: false,
    name: 'owo-name',
    id: 'owo-id',
    option: { label: 'React', value: 'react' },
  },
});

export default meta;
