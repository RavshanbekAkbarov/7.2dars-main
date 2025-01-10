export const Button = ({
  type = "primary",
  size = "md",
  outline = false,
  loading = false,
  children,
  ...props
}) => {
  const baseClass = "btn";
  const sizeClass = `btn-${size}`;
  const typeClass = outline ? `btn-outline btn-${type}` : `btn-${type}`;
  return (
    <button
      disabled={loading}
      className={`${baseClass} ${sizeClass} ${typeClass} btn-block`}
      {...props}
    >
      {loading ? "Loding..." : children}
    </button>
  );
};
