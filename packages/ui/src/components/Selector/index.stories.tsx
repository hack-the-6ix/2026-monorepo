import { useState } from 'react';

import preview from '#/preview';
import { InputGroupStatus, inputGroupStatuses } from '../InputGroup';
import { Selector as component } from '.';

interface SelectorStoryArgs {
  infoType?: InputGroupStatus;
  infoText?: string;
  disabled?: boolean;
  value?: string;
  allowOther?: boolean;
}

const meta = preview.type<{ args: SelectorStoryArgs }>().meta({
  title: 'Modules/Inputs/Selector',
  component,
});

export const Selector = meta.story({
  argTypes: {
    options: { control: 'object' },
    input: { table: { disable: true } },
    controlled: { table: { disable: true } },
    name: { table: { disable: true } },
    id: { table: { disable: true } },
    infoText: { control: 'text' },
    infoType: {
      control: 'select',
      options: inputGroupStatuses,
    },
    allowOther: { control: 'boolean' },
  },
  render: ({ infoType, infoText, ...args }) => {
    const Component = component;
    const [val, setVal] = useState('');

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
          input={{
            placeholder: 'Search or select...',
          }}
        />
        <div className="p-2 dark:text-neutral-100  rounded text-[10px] font-mono">
          State Value: {val || '""'}
        </div>
      </div>
    );
  },
  args: {
    label: 'Selection',
    hideLabel: false,
    required: false,
    disabled: false,
    name: 'tech-selector',
    id: 'tech-id',
    allowOther: true,
    options: [
      { label: 'React', value: 'react' },
      { label: 'Next.js', value: 'nextjs' },
      { label: 'TypeScript', value: 'typescript' },
      { label: 'Tailwind CSS', value: 'tailwind' },
      { label: 'Styled Component', value: 'styled_component' },
      { label: 'JavaScript', value: 'javascript' },
    ],
  },
});

export default meta;
