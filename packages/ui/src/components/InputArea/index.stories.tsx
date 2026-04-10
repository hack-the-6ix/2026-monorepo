import preview from '#/preview';
import { InputGroupStatus, inputGroupStatuses } from '../InputGroup';
import { InputArea as component } from '.';

interface InputStoryArgs {
  infoType?: InputGroupStatus;
  infoText?: string;
  disabled?: boolean;
  value?: string;
  showCounter?: boolean;
  maxLength?: number;
}

const meta = preview.type<{ args: InputStoryArgs }>().meta({
  title: 'Modules/Inputs/InputArea',
  component,
});

export const InputArea = meta.story({
  argTypes: {
    input: { table: { disable: true } },
    controlled: { table: { disable: true } },
    name: { table: { disable: true } },
    id: { table: { disable: true } },
    infoText: { control: 'text' },
    infoType: {
      control: 'select',
      options: inputGroupStatuses,
    },
    showCounter: { control: 'boolean' },
    maxLength: { control: 'number' },
  },
  render: ({ infoType, infoText, ...args }) => {
    const Component = component;
    return (
      <Component
        {...args}
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
    hideLabel: false,
    required: false,
    disabled: false,
    name: 'owo-name',
    id: 'owo-id',
    showCounter: true,
    maxLength: 500,
  },
});

export default meta;
