import { FlangeDrawing, ShaftRecoveryDrawing } from "./Drawings";
import { Photo, type PhotoSource } from "./Photo";

export type CoverSource = PhotoSource | { path: string; alt: string; width: number; height: number } | "flange" | "shaft";

export const CARD_COVER_SIZES = "(min-width: 1280px) 400px, (min-width: 1024px) 30vw, (min-width: 620px) 46vw, 92vw";
export const HERO_COVER_SIZES = "(min-width: 1280px) 580px, (min-width: 850px) 46vw, 92vw";

export const flangePhoto: PhotoSource = {
  name: "card-usinagem-customizada",
  alt: "Flange de aço usinado com bucha de bronze",
  position: "50% 60%",
};

export function Cover({ source, sizes, priority = false }: {
  source: CoverSource;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div className={typeof source === "string" ? "cover cover-drawing" : "cover"}>
      {source === "flange" ? <FlangeDrawing animated={false} /> :
        source === "shaft" ? <ShaftRecoveryDrawing /> :
          "path" in source ? (
            <img src={source.path} alt={source.alt} width={source.width} height={source.height} loading={priority ? "eager" : "lazy"} decoding="async" />
          ) :
          <Photo {...source} sizes={sizes} priority={priority} />}
    </div>
  );
}
