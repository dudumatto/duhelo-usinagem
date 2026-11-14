export type PhotoSource = { name: string; alt: string; position?: string };

export function Photo({
  name,
  alt,
  sizes,
  priority = false,
  position,
  className,
}: PhotoSource & { sizes: string; priority?: boolean; className?: string }) {
  const base = `/images/opt/${name}`;
  return (
    <picture className={className}>
      <source type="image/webp" srcSet={`${base}-480.webp 480w, ${base}-800.webp 800w, ${base}-1200.webp 1200w`} sizes={sizes} />
      <img
        src={`/images/${name}.jpg`}
        alt={alt}
        width={1200}
        height={799}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        {...(priority ? { fetchpriority: "high" } : {})}
        style={position ? { objectPosition: position } : undefined}
      />
    </picture>
  );
}
