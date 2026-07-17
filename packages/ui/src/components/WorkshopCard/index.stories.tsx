import preview from '#/preview';
import {
  WorkshopCard,
  type WorkshopCardProps,
  workshopCardStates,
  workshopColors,
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
    state: {
      control: 'select',
      options: workshopCardStates,
    },
    variant: {
      control: 'select',
      options: ['default', 'compact'],
    },
  },
  args: {
    title: 'Workshop Name',
    startTime: '8:00 AM',
    endTime: '9:00 AM',
    location: 'Hopin',
    color: 'pink',
    state: 'upcoming',
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

export const Disabled = meta.story({
  render: () => (
    <div className="flex flex-col gap-4 bg-black p-6">
      <WorkshopCard
        title="Workshop Name"
        startTime="8:00 AM"
        endTime="9:00 AM"
        location="Hopin"
        color="pink"
        state="disabled"
      />
      <WorkshopCard
        title="Workshop Name"
        startTime="8:00 AM"
        endTime="9:00 AM"
        location="Hopin"
        color="mint"
        state="upcoming"
      />
    </div>
  ),
});

export const Active = meta.story({
  render: () => (
    <div className="bg-black p-6">
      <WorkshopCard
        title="Workshop Name"
        startTime="8:00 AM"
        endTime="9:00 AM"
        location="Hopin"
        color="cyan"
        state="active"
      />
    </div>
  ),
});

export default meta;
