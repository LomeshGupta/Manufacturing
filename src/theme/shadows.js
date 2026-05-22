export const shadows = (mode) => {
  const isLight = mode === 'light';
  return [
    'none',
    isLight
      ? '0px 1px 4px rgba(15, 23, 42, 0.06)'
      : '0px 1px 4px rgba(0, 0, 0, 0.3)',
    isLight
      ? '0px 2px 8px rgba(15, 23, 42, 0.08)'
      : '0px 2px 8px rgba(0, 0, 0, 0.35)',
    isLight
      ? '0px 4px 16px rgba(15, 23, 42, 0.08)'
      : '0px 4px 16px rgba(0, 0, 0, 0.4)',
    isLight
      ? '0px 8px 24px rgba(15, 23, 42, 0.1)'
      : '0px 8px 24px rgba(0, 0, 0, 0.45)',
    isLight
      ? '0px 12px 32px rgba(15, 23, 42, 0.1)'
      : '0px 12px 32px rgba(0, 0, 0, 0.5)',
    isLight
      ? '0px 16px 48px rgba(15, 23, 42, 0.12)'
      : '0px 16px 48px rgba(0, 0, 0, 0.55)',
    ...Array(18).fill('none'),
  ];
};
