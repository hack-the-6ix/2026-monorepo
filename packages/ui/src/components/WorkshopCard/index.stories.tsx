import preview from '#/preview';

import {
  WorkshopCard,
  workshopColors,
  type WorkshopCardProps,
} from '.';

const meta = preview
  .type<{ args: WorkshopCardProps }>()
  .meta({ title: 'Modules/WorkshopCard', component: WorkshopCard });

export const Default = meta.story({
  argTypes: {
    color: {
      control: 'select',
      options: workshopColors,
    },
    variant: {
      control: 'select',
      options: ['default', 'compact'],
    },
    active: {
      control: 'boolean',
    },
  },
  args: {
    title: 'Workshop Name',
    startTime: '8:00 AM',
    endTime: '9:00 AM',
    location: 'Hopin',
    color: 'pink',
    active: true,
    variant: 'default',
  },
});

export const AllColors = meta.story({
  render: () => (
    <div className="flex flex-col gap-4 bg-black p-6">
      {workshopColors.map((color) => (
        <WorkshopCard
          key={color}
          title="Workshop Name"
          startTime="8:00 AM"
          endTime="9:00 AM"
          location="Hopin"
          color={color}
        />
      ))}
    </div>
  ),
});

export const Compact = meta.story({
  render: () => (
    <div className="flex flex-col gap-3 bg-black p-6">
      {workshopColors.map((color) => (
        <WorkshopCard
          key={color}
          title="Workshop Name"
          startTime="8:00 AM"
          endTime="9:00 AM"
          location="Hopin"
          color={color}
          variant="compact"
        />
      ))}
    </div>
  ),
});

export const Inactive = meta.story({
  render: () => (
    <div className="flex flex-col gap-4 bg-black p-6">
      <WorkshopCard
        title="Workshop Name"
        startTime="8:00 AM"
        endTime="9:00 AM"
        location="Hopin"
        color="pink"
        active={false}
      />
      <WorkshopCard
        title="Workshop Name"
        startTime="8:00 AM"
        endTime="9:00 AM"
        location="Hopin"
        color="mint"
        active
      />
    </div>
  ),
});

export default meta;
