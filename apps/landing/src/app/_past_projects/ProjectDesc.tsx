import { Typography } from '@hackthe6ix/ui';

const projects = [
  {
    title: 'TurretGuard',
    subtitle: '1ST PLACE',
    description:
      '"TurretGuard is an Al-powered turret that detects drowning in real time and launches an inflatable buoy using physics-based targeting, saving lives in seconds where lifeguards may be too late." - the TurretGuard team',
  },
  {
    title: 'IntelliDrive',
    subtitle: '2nd PLACE',
    description:
      '“Control hardware with an LLM through natural language. All autonomous - no CV or pre-processing” — the IntelliDrive team',
  },
  {
    title: 'hermes',
    subtitle: '3rd PLACE',
    description:
      '“your generalist phone calling agent, never waste time on the phone ever again, book reservations, haircuts, find out information and more all with one prompt” — the hermes team',
  },
];

export default function ProjectDesc({ index }: { index: number }) {
  return (
    <div className="flex flex-col gap-4 md:w-2/5 w-2/3">
      <div className="flex flex-col gap-2">
        <Typography
          textSize="subtitle-lg"
          textColor="text-white"
          textWeight="bold"
          className="text-left"
        >
          {projects[index].title}
        </Typography>
        <Typography
          textSize="paragraph-lg"
          textColor="text-white"
          textWeight="medium"
          className="text-left"
        >
          {projects[index].subtitle}
        </Typography>
      </div>
      <Typography
        textSize="paragraph-sm"
        textColor="text-white"
        textWeight="medium"
        className="text-left italic"
      >
        {projects[index].description}
      </Typography>
    </div>
  );
}
