type EmptyStateProps = {
  message: string;
  className?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageClassName?: string;
  textClassName?: string;
};

const joinClasses = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const EmptyState = ({ message, className, imageSrc = "/assets/images/order/empty.png", imageAlt = "No content available", imageClassName = "mx-auto mb-3 w-40 opacity-80", textClassName,}: EmptyStateProps) => {
  return (
    <div className={joinClasses("delvoura-product-empty-state", className)}>
      <div className={joinClasses( "flex flex-col items-center justify-center gap-2 text-center text-sm text-[color:var(--color-text-muted)]",textClassName )} >
        {imageSrc ? (
          <img src={imageSrc} alt={imageAlt} className={imageClassName} />
        ) : null}
        <div>{message}</div>
      </div>
    </div>
  );
};

export default EmptyState;
