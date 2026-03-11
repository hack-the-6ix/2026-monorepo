import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import preview from '#/preview';
import '#/index.css';

import { Merge } from '../..';
import { buttonKinds, IconButton as component, IconButtonProps } from '.';

type IconButtonStoryArgs = Merge<
  IconButtonProps<'button'>,
  {
    icon: string;
  }
>;

const meta = preview
  .type<{ args: IconButtonStoryArgs }>()
  .meta({ title: 'Modules/Buttons/Icon Button', component });

export const IconButton = meta.story({
  argTypes: {
    kind: {
      control: 'select',
      options: buttonKinds,
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
  },
  render: (args) => {
    const Component = component;
    return (
      <Component
        {...args}
        icon={<DynamicIcon className="size-full" name={args.icon as IconName} />}
      />
    );
  },
  args: {
    destructive: false,
    disabled: false,
    kind: 'primary',
    icon: 'banana',
  },
});

export default meta;
