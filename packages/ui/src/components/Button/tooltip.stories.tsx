import preview from '#/preview';
import { Merge } from '../..';
import { IconButtonProps, TooltipButton as component } from '.';

type TooltipStoryArgs = Merge<
  IconButtonProps<'button'>,
  {
    showIcon: boolean;
  }
>;

const meta = preview
  .type<{ args: TooltipStoryArgs }>()
  .meta({ title: 'Modules/Buttons/Tooltip', component });

export const TooltipButton = meta.story({
  argTypes: {
    kind: { table: { disable: true } },
    disabled: { control: 'boolean' },
    bgColor: { control: 'color' },
  },
  render: ({ description, bgColor, ...args }) => {
    const Component = component;
    return (
      <div className="flex items-center gap-2 px-10">
        <Component {...args} bgColor={bgColor} description={description} />
      </div>
    );
  },
  args: {
    disabled: false,
    description:
      'Tooltip description and more. whats gna happen to us mommy im scared - random kid',
    bgColor: '#F9FAFB',
  },
});

export default meta;
