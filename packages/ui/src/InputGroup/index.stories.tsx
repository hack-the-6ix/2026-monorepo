import preview from '#/preview';
import { Merge } from '..';
import {
  InputGroup as component,
  InputGroupProps,
  InputGroupStatus,
  inputGroupStatuses,
} from '.';

type InputGroupStoryArgs = Merge<
  InputGroupProps<'div'>,
  {
    status: InputGroupStatus;
    statusText: string;
  }
>;
const meta = preview
  .type<{ args: InputGroupStoryArgs }>()
  .meta({ title: 'Modules/Inputs/InputGroup', component });

export const InputGroup = meta.story({
  argTypes: {
    status: {
      control: 'select',
      options: inputGroupStatuses,
    },
    statusText: {
      control: 'text',
      if: { arg: 'status' },
    },
  },
  render: ({ status, statusText, ...args }) => {
    const Component = component;
    return (
      <Component
        {...args}
        status={status ? { type: status, message: statusText } : undefined}
      >
        <div
          style={{
            display: 'inline-block',
            borderRadius: '0.5rem',
            padding: '0.25rem 0.5rem',
            border: '2px solid #D1D5DB',
            color: '#6A7282',
          }}
        >
          "insert owo input here"
        </div>
      </Component>
    );
  },
  args: {
    description:
      'Wowwem ipsum dowow sit amwet, conswectwetuw adipiscing wewit.',
    label: 'owo wats dis?',
    hideLabel: false,
    required: false,
    name: 'owo',
  },
});

export default meta;
