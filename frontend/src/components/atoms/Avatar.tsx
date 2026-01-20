export const Avatar = ({
  initials,
  size = 32,
  bg = 'var(--bs-primary)',
}: {
  initials: string;
  size?: number;
  bg?: string;
}) => {
  return (
    <div
      style={{
        backgroundColor: bg,
        color: 'white',
        minWidth: size,
        minHeight: size,
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
      }}
    >
      {initials}
    </div>
  );
};
