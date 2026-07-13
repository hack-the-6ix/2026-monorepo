export function NoAccess() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-center">
      <h1 className="text-page-title font-bold text-brand">Hardware Portal</h1>
      <p className="text-body text-ink">
        You don&apos;t have access to the hardware portal.
      </p>
      <p className="max-w-md text-sm text-ink-mute">
        Hardware checkout is available to checked-in hackers, volunteers,
        sponsors, and organizers. If you think this is a mistake, check in at
        the event first or contact an organizer.
      </p>
    </div>
  );
}
