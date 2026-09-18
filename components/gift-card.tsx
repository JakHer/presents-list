import { formatPrice, type Gift } from "@/lib/gifts";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { GiftArtwork, categoryStyles } from "./gift-artwork";
import { Icon } from "./icon";

export function GiftCard({
  gift,
  onEdit,
  onDelete,
  onToggleFavorite,
}: {
  gift: Gift;
  onEdit: (gift: Gift, trigger: HTMLButtonElement) => void;
  onDelete: (gift: Gift) => void;
  onToggleFavorite: (gift: Gift) => void;
}) {
  const style = categoryStyles[gift.category];

  return (
    <article aria-label={gift.name} className="h-full">
      <Card className="h-full gap-0 border py-0 ring-0 transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-foreground/5">
        <div
          className={cn(
            "relative flex h-[215px] shrink-0 flex-col items-center overflow-hidden sm:h-[205px]",
            style.className,
          )}
        >
          <Badge
            variant="outline"
            className="absolute top-[13px] left-3.5 z-10 h-auto rounded-[5px] border-0 bg-card/65 px-[9px] py-[5px] text-[9px] font-normal text-secondary-foreground"
          >
            {gift.category}
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute top-[9px] right-[9px] z-10 rounded-full bg-card/80 text-muted-foreground hover:scale-105 hover:bg-card sm:top-[11px] sm:right-[11px] sm:size-[34px]",
              gift.favorite && "text-primary hover:text-primary",
            )}
            aria-label={`${gift.favorite ? "Usuń wyróżnienie" : "Wyróżnij"}: ${gift.name}`}
            aria-pressed={gift.favorite}
            onClick={() => onToggleFavorite(gift)}
          >
            <Icon
              name="heart"
              className={cn("size-4", gift.favorite && "fill-current")}
            />
          </Button>
          <GiftArtwork category={gift.category} />
          <span className="absolute bottom-[13px] text-[8px] font-semibold tracking-[1.9px]">
            {style.caption}
          </span>
        </div>
        <CardContent className="flex flex-1 flex-col p-5 pb-0">
          <h3 className="text-[17px] leading-[1.45] font-semibold tracking-[-0.35px] wrap-anywhere sm:text-[15px]">
            {gift.name}
          </h3>
          <p className="mt-2 mb-4 text-xs leading-[1.85] whitespace-pre-line text-muted-foreground wrap-anywhere sm:text-[11px]">
            {gift.description || "Ten pomysł czeka jeszcze na małą podpowiedź."}
          </p>
          <div className="mt-auto mb-4 flex flex-wrap items-center justify-between gap-2">
            <span className="text-lg font-semibold tracking-[-0.4px] sm:text-base">
              {formatPrice(gift.price)}
            </span>
            {gift.favorite && (
              <span className="flex items-center gap-[5px] text-[9px] text-accent-foreground">
                <Icon name="heart" className="size-3" />
                Bardzo chcę
              </span>
            )}
          </div>
          <CardFooter className="min-h-[57px] justify-between gap-2 rounded-none bg-transparent p-0 sm:min-h-[51px]">
            {gift.url ? (
              <Button
                asChild
                variant="link"
                className="h-10 gap-1.5 px-0 text-[10px] font-medium text-accent-foreground"
              >
                <a href={gift.url} target="_blank" rel="noopener noreferrer">
                  Zobacz w sklepie
                  <Icon name="arrow" className="size-3" />
                </a>
              </Button>
            ) : (
              <span className="text-[10px] text-muted-foreground">
                Pomysł bez linku
              </span>
            )}
            <div className="flex gap-0.5">
              <Button
                variant="ghost"
                size="icon"
                aria-label={`Edytuj: ${gift.name}`}
                onClick={(event) => onEdit(gift, event.currentTarget)}
                className="text-muted-foreground"
              >
                <Icon name="pencil" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label={`Usuń: ${gift.name}`}
                onClick={() => onDelete(gift)}
                className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              >
                <Icon name="trash" />
              </Button>
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </article>
  );
}
