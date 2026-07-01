'use client';

import { FaXmark } from 'react-icons/fa6';

import {
  callbackToneClasses,
  DiscordCallbackMessage,
} from '@/context/DiscordContext';

interface DiscordToastProps {
  message: DiscordCallbackMessage;
  onDismiss: () => void;
}

export default function DiscordToast({ message, onDismiss }: DiscordToastProps) {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[200] flex justify-center px-4"
      role="status"
      aria-live="polite"
    >
      <div
        className={`pointer-events-auto flex max-w-sm items-start gap-3 rounded-2xl border px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.35)] animate-[discord-toast-in_0.3s_ease-out_forwards] ${callbackToneClasses[message.tone]}`}
      >
        <p className="min-w-0 flex-1 text-sm font-semibold">{message.text}</p>
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 opacity-70 transition-opacity hover:opacity-100"
          aria-label="Dismiss notification"
        >
          <FaXmark size={14} />
        </button>
      </div>
    </div>
  );
}
