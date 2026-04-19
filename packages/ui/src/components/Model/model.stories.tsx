import preview from '#/preview';
import { Typography } from '../Typography';
import { Model as component, ModelProps } from '.';

const meta = preview.type<{ args: ModelProps<'div'> }>().meta({
  title: 'Modules/Model',
  component,
  argTypes: {
    backgroundColor: { control: 'color' },
    destructive: { control: 'boolean' },
  },
});

export const Default = meta.story({
  render: (args) => {
    const Component = component;
    return (
      <Component {...args} className="bg-slate-800">
        <Typography
          textSize="paragraph-sm"
          textColor="text-white"
          className="text-center"
        >
          She wanted to tell him. She wanted to tell him what those bastards of
          Constellations did in this place, but…. <br /> “I know, Hui-Won-ssi.”
          <br />
          <span className="text-warning-400">
            [Demon King, ‘Demon King of Salvation’, has joined the great
            battlefield.]
          </span>
        </Typography>
      </Component>
    );
  },
  args: {
    label: 'ORV Ch398',
    actionButtonMessage: 'Delete',
    destructive: true,
    backgroundColor:
      'linear-gradient(to bottom, rgba(10, 7, 51, 0.85), rgba(23, 21, 51, 0.85))',
  },
});

export default meta;
