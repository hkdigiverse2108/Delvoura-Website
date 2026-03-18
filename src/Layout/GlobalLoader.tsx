type GlobalLoaderProps = {
  visible?: boolean;
};

const GlobalLoader = ({ visible = true }: GlobalLoaderProps) => {
  if (!visible) return null;

  return (
    <div className="global-loader" role="status" aria-live="polite">
      <div className="loader" aria-hidden="true" />
    </div>
  );
};

export default GlobalLoader;
