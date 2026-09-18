import { Button } from "@/components/ui/button";
import { Icon } from "./icon";

export function WishlistIntro({
  onAdd,
  addButtonRef,
}: {
  onAdd: (trigger: HTMLButtonElement) => void;
  addButtonRef: React.Ref<HTMLButtonElement>;
}) {
  return (
    <section
      className="flex items-center justify-between gap-0 pt-[38px] pb-[29px] sm:gap-[30px] sm:pt-[63px] sm:pb-[49px]"
      aria-labelledby="page-title"
    >
      <div className="w-full sm:w-auto">
        <span className="inline-flex items-center gap-[9px] text-[8px] font-semibold tracking-[1.3px] text-accent-foreground sm:text-[10px] sm:tracking-[1.7px]">
          <span className="h-px w-[23px] bg-accent-foreground/70" />
          MNIEJ ZGADYWANIA, WIĘCEJ RADOŚCI
        </span>
        <h1
          id="page-title"
          className="mt-[15px] mb-[17px] text-[43px] leading-[1.12] font-[560] tracking-[-2px] max-[370px]:text-[37px] sm:text-[clamp(38px,4.5vw,55px)] sm:tracking-[-2.7px]"
        >
          Moja lista{" "}
          <span className="font-serif font-normal text-primary italic">
            życzeń.
          </span>
        </h1>
        <p className="mb-[25px] max-w-[360px] text-[13px] leading-[1.85] text-muted-foreground sm:max-w-none sm:text-sm">
          Małe zachcianki i wielkie marzenia. Zbierz je w jednym miejscu,
          <br className="hidden sm:block" /> żeby dobry pomysł na prezent był
          zawsze pod ręką.
        </p>
        <Button
          ref={addButtonRef}
          onClick={(event) => onAdd(event.currentTarget)}
        >
          <Icon name="plus" />
          Dodaj prezent
        </Button>
      </div>
      <GiftIllustration />
    </section>
  );
}

function GiftIllustration() {
  return (
    <div
      className="relative mr-9 hidden h-[225px] w-[290px] shrink-0 sm:block max-lg:mr-0 max-lg:w-[210px] max-lg:origin-right max-lg:scale-80"
      aria-hidden="true"
    >
      <span className="absolute top-[5px] left-2 z-10 -rotate-9 font-serif text-base leading-[1.4] text-[#8e7d6b] italic">
        odrobina inspiracji
        <br />
        dla kogoś bliskiego
      </span>
      <span className="absolute top-6 left-[47px] size-[198px] rounded-full bg-[#f3eae0]" />
      <span className="absolute top-[105px] left-[93px] h-[100px] w-[115px] -rotate-12 rounded-t-[3px] rounded-b-lg bg-[#c86750] shadow-[8px_9px_0_#d9c6b552]">
        <span className="absolute -top-3.5 -left-2 h-[27px] w-[131px] rounded bg-[#df8970] shadow-[0_5px_0_#95473724]" />
        <span className="absolute -top-3.5 left-[45px] h-[114px] w-[23px] bg-[#f5dfb0]" />
        <span className="absolute -top-[43px] left-2.5 h-[31px] w-[51px] rotate-18 rounded-[50%_50%_0_50%] border-[9px] border-[#eaca94]" />
        <span className="absolute -top-[43px] left-[58px] h-[31px] w-[51px] -rotate-18 rounded-[50%_50%_50%_0] border-[9px] border-[#eaca94]" />
        <span className="absolute top-[21px] left-[74px] grid h-[37px] w-7 rotate-22 place-items-center rounded-[2px] bg-[#ffefdc] text-[#bb6450] shadow-[2px_2px_3px_#86442318]">
          <Icon name="heart" className="size-[15px]" />
        </span>
      </span>
      <Icon
        name="sparkle"
        className="absolute top-[62px] right-[3px] size-[29px] text-[#b57f4b]"
      />
      <Icon
        name="sparkle"
        className="absolute bottom-[22px] left-[41px] size-5 text-[#b57f4b]"
      />
      <span className="absolute right-[21px] bottom-[30px] size-1.5 rounded-full bg-[#c68e72]" />
    </div>
  );
}
