import cn from 'classnames';

import { Typography } from '../Typography';

import './index.css';

export const workshopColors = ['pink', 'mint', 'lavender', 'cyan'] as const;
export type WorkshopColor = (typeof workshopColors)[number];

export const workshopCardStates = ['active', 'disabled', 'upcoming'] as const;
export type WorkshopCardState = (typeof workshopCardStates)[number];

const colorClassMap: Record<WorkshopColor, string> = {
  pink: 'workshop-card--pink',
  mint: 'workshop-card--mint',
  lavender: 'workshop-card--lavender',
  cyan: 'workshop-card--cyan',
};

export type WorkshopCardProps = {
  title: string;
  startTime: string;
  endTime: string;
  location?: string;
  color?: WorkshopColor;
  state?: WorkshopCardState;
  variant?: 'default' | 'compact';
  className?: string;
};

export function WorkshopCard({
  title,
  startTime,
  endTime,
  location,
  color = 'pink',
  state = 'upcoming',
  variant = 'default',
  className,
}: WorkshopCardProps) {
  const timeRange = `${startTime} - ${endTime}`;
  const separator = variant === 'compact' ? '|' : '@';
  const details =
    location ? `${timeRange} ${separator} ${location}` : timeRange;

  const cardClassName = cn(
    'workshop-card',
    colorClassMap[color],
    state === 'disabled' && 'workshop-card--disabled',
    state === 'active' && 'workshop-card--active',
    variant === 'compact' && 'workshop-card--compact',
    className,
  );

  return (
    <div className={cardClassName}>
      {variant === 'default' ?
        <div aria-hidden className="workshop-card__bar" />
      : <div aria-hidden className="workshop-card__swatch" />}

      <div className="workshop-card__content">
        {variant === 'default' && (
          <Typography
            as="p"
            textSize="subtitle-sm"
            textWeight="bold"
            className="workshop-card__title m-0"
          >
            {title}
          </Typography>
        )}
        <Typography
          as="p"
          textSize={variant === 'compact' ? 'label' : 'paragraph-lg'}
          textWeight="regular"
          className="workshop-card__details m-0"
        >
          {details}
        </Typography>
      </div>
    </div>
  );
}
