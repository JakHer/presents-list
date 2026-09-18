"use client";

import { useRef, useState } from "react";
import { type Gift } from "@/lib/gifts";
import { updateGifts, useGifts } from "@/lib/gift-store";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { GiftCard } from "./gift-card";
import { GiftForm } from "./gift-form";
import { Icon } from "./icon";
import { WishlistIntro } from "./wishlist-intro";

type Sort = "default" | "price-asc" | "price-desc";

export function Wishlist() {
  const gifts = useGifts();
  const [query, setQuery] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [sort, setSort] = useState<Sort>("default");
  const [editor, setEditor] = useState<{ gift: Gift | null } | null>(null);
  const [notice, setNotice] = useState("");
  const [deleted, setDeleted] = useState<{ gift: Gift; index: number } | null>(
    null,
  );
  const editorTriggerRef = useRef<HTMLButtonElement | null>(null);
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const favoriteCount = gifts.filter((gift) => gift.favorite).length;
  const search = query.trim().toLocaleLowerCase("pl-PL");
  const visibleGifts = gifts.filter(
    (gift) =>
      (!favoritesOnly || gift.favorite) &&
      `${gift.name} ${gift.description} ${gift.category}`
        .toLocaleLowerCase("pl-PL")
        .includes(search),
  );

  if (sort !== "default")
    visibleGifts.sort((a, b) => {
      if (a.price === null) return b.price === null ? 0 : 1;
      if (b.price === null) return -1;
      return sort === "price-asc" ? a.price - b.price : b.price - a.price;
    });

  function openEditor(gift: Gift | null, trigger: HTMLButtonElement) {
    editorTriggerRef.current = trigger;
    setEditor({ gift });
  }

  function restoreEditorFocus() {
    const trigger = editorTriggerRef.current;
    if (trigger?.isConnected) trigger.focus();
    else addButtonRef.current?.focus();
  }

  function report(saved: boolean, message: string) {
    setNotice(
      saved
        ? message
        : `${message} Przeglądarka nie pozwala zapisać zmian. Zostaną tylko do zamknięcia strony.`,
    );
  }

  function saveGift(gift: Gift) {
    const editing = editor?.gift != null;
    const saved = updateGifts((list) =>
      editing
        ? list.map((item) => (item.id === gift.id ? gift : item))
        : [gift, ...list],
    );
    setEditor(null);
    setQuery("");
    setFavoritesOnly(false);
    setDeleted(null);
    report(
      saved,
      editing
        ? "Zmiany zapisane. Podpowiedź gotowa!"
        : "Nowy pomysł jest już na Twojej liście.",
    );
  }

  function toggleFavorite(gift: Gift) {
    setDeleted(null);
    report(
      updateGifts((list) =>
        list.map((item) =>
          item.id === gift.id ? { ...item, favorite: !item.favorite } : item,
        ),
      ),
      gift.favorite
        ? "Usunięto wyróżnienie."
        : "Prezent dodany do najbardziej chcianych.",
    );
  }

  function removeGift(gift: Gift) {
    setDeleted({ gift, index: gifts.findIndex((item) => item.id === gift.id) });
    report(
      updateGifts((list) => list.filter((item) => item.id !== gift.id)),
      `Usunięto „${gift.name}”.`,
    );
  }

  function undoDelete() {
    if (!deleted) return;
    report(
      updateGifts((list) => {
        if (list.some((gift) => gift.id === deleted.gift.id)) return list;
        const restored = [...list];
        restored.splice(deleted.index, 0, deleted.gift);
        return restored;
      }),
      "Prezent wrócił na listę.",
    );
    setDeleted(null);
  }

  return (
    <div>
      <a
        className="fixed -top-20 left-5 z-100 rounded-lg bg-card px-5 py-3 focus:top-3"
        href="#moja-lista"
      >
        Przejdź do listy prezentów
      </a>
      <header className="border-b bg-popover">
        <div className="mx-auto flex h-[74px] max-w-[1216px] items-center gap-6 px-5 sm:h-[88px] sm:gap-20 sm:px-[25px] lg:px-8">
          <a
            href="#moja-lista"
            className="flex items-center text-[25px] font-[750] tracking-[-1.5px] sm:text-[28px]"
            aria-label="Podaruj — strona główna"
          >
            <span className="mr-2 grid h-[38px] w-6 -rotate-7 place-items-center text-primary sm:mr-2.5 sm:w-[35px]">
              <Icon name="gift" className="size-[25px] sm:size-[30px]" />
            </span>
            podaruj<span className="text-primary">.</span>
          </a>
          <nav
            aria-label="Nawigacja główna"
            className="ml-auto flex h-full items-stretch sm:ml-0"
          >
            <a
              className="flex items-center border-b-2 border-primary px-[5px] text-xs font-semibold sm:text-[13px]"
              href="#moja-lista"
              aria-current="page"
            >
              Moja lista
            </a>
          </nav>
          <Badge
            variant="outline"
            className="h-auto gap-[7px] border-sage-foreground/15 bg-sage px-2 py-1.5 text-[9px] font-normal text-sage-foreground max-[370px]:hidden sm:ml-auto sm:px-[11px] sm:py-[7px] sm:text-[11px]"
          >
            <span className="size-[5px] rounded-full bg-sage-foreground/70" />
            Wersja demo
          </Badge>
        </div>
      </header>
      <main
        className="mx-auto max-w-[1216px] px-5 sm:px-[25px] lg:px-8"
        id="moja-lista"
      >
        <WishlistIntro
          onAdd={(trigger) => openEditor(null, trigger)}
          addButtonRef={addButtonRef}
        />
        <div className="flex items-start gap-2.5 rounded-[10px] border border-sage-foreground/10 bg-sage p-3.5 text-[11px] text-sage-foreground sm:items-center sm:gap-[13px] sm:px-[21px] sm:py-[17px] sm:text-xs">
          <Icon name="sparkle" className="mt-0.5 size-5 shrink-0 sm:mt-0" />
          <p className="leading-[1.65]">
            <strong className="mb-0.5 block font-semibold sm:mr-1 sm:mb-0 sm:inline">
              Każda okazja jest dobra.
            </strong>{" "}
            Dodawaj pomysły, kiedy przyjdą Ci do głowy. Nawet bez okazji.
          </p>
          <span className="ml-auto hidden items-center gap-[9px] font-serif text-sm whitespace-nowrap italic lg:flex">
            Z myślą o Tobie <Icon name="heart" className="size-4" />
          </span>
        </div>

        <section
          className="mt-[29px] sm:mt-[42px]"
          aria-labelledby="list-title"
        >
          <div className="flex flex-col items-start justify-between gap-[11px] sm:flex-row sm:items-center sm:gap-5">
            <div>
              <h2
                id="list-title"
                className="flex flex-wrap items-center gap-1.5 text-lg leading-relaxed font-semibold tracking-[-0.6px] max-[370px]:text-base sm:gap-2.5 lg:text-xl"
              >
                Rzeczy, które sprawią mi radość{" "}
                <Badge
                  variant="secondary"
                  className="h-6 min-w-[25px] rounded-[7px] px-1.5 text-[11px] font-normal tracking-normal"
                >
                  {gifts.length}
                </Badge>
              </h2>
              <p className="mt-[5px] text-xs text-muted-foreground">
                Twoje podpowiedzi do trafionych prezentów.
              </p>
            </div>
            <span className="flex items-center gap-1.5 text-[10px] whitespace-nowrap text-muted-foreground">
              <Icon name="lock" className="size-[13px]" />
              Lista w tej przeglądarce
            </span>
          </div>
          <div className="mt-[18px] mb-5 flex flex-wrap items-center justify-between gap-3 sm:mt-[25px] sm:mb-6 sm:gap-4">
            <div className="flex gap-[5px]" aria-label="Filtruj prezenty">
              <Button
                variant="ghost"
                className={cn(
                  "h-10 gap-[7px] px-3 text-[11px] font-normal text-muted-foreground",
                  !favoritesOnly &&
                    "border-primary/15 bg-accent font-semibold text-accent-foreground hover:bg-accent hover:text-accent-foreground",
                )}
                aria-pressed={!favoritesOnly}
                onClick={() => setFavoritesOnly(false)}
              >
                Wszystkie{" "}
                <span className="ml-0.5 text-[10px] opacity-70">
                  {gifts.length}
                </span>
              </Button>
              <Button
                variant="ghost"
                className={cn(
                  "h-10 gap-[7px] px-3 text-[11px] font-normal text-muted-foreground",
                  favoritesOnly &&
                    "border-primary/15 bg-accent font-semibold text-accent-foreground hover:bg-accent hover:text-accent-foreground",
                )}
                aria-pressed={favoritesOnly}
                onClick={() => setFavoritesOnly(true)}
              >
                <Icon name="heart" className="size-[13px]" />
                Szczególnie chcę{" "}
                <span className="ml-0.5 text-[10px] opacity-70">
                  {favoriteCount}
                </span>
              </Button>
            </div>
            <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3 lg:ml-auto lg:w-auto">
              <div className="relative min-w-0 flex-1 lg:flex-none">
                <Icon
                  name="search"
                  className="pointer-events-none absolute top-1/2 left-3 size-[15px] -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  type="search"
                  aria-label="Szukaj prezentu"
                  placeholder="Znajdź coś na liście…"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="h-11 border-border bg-card pl-9 sm:h-10 sm:text-xs lg:w-[210px]"
                />
              </div>
              <NativeSelect
                aria-label="Sortuj prezenty"
                value={sort}
                onChange={(event) => setSort(event.target.value as Sort)}
                className="w-full sm:w-[175px] [&_select]:h-11 [&_select]:border-transparent [&_select]:text-base [&_select]:text-muted-foreground sm:[&_select]:h-10 sm:[&_select]:text-[11px]"
              >
                <NativeSelectOption value="default">
                  Kolejność na liście
                </NativeSelectOption>
                <NativeSelectOption value="price-asc">
                  Cena: od najniższej
                </NativeSelectOption>
                <NativeSelectOption value="price-desc">
                  Cena: od najwyższej
                </NativeSelectOption>
              </NativeSelect>
            </div>
          </div>

          {visibleGifts.length > 0 ? (
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[23px]">
              {visibleGifts.map((gift) => (
                <li key={gift.id} className="min-w-0">
                  <GiftCard
                    gift={gift}
                    onEdit={openEditor}
                    onDelete={removeGift}
                    onToggleFavorite={toggleFavorite}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-xl border border-dashed px-[22px] py-[60px] text-center">
              <span className="inline-grid size-[60px] place-items-center rounded-full bg-accent text-accent-foreground">
                <Icon
                  name={gifts.length ? "search" : "gift"}
                  className="size-7"
                />
              </span>
              <h3 className="mt-5 mb-2 text-xl font-semibold">
                {gifts.length
                  ? "Jeszcze nic tu nie pasuje"
                  : "Pierwszy pomysł? Wszystko zaczyna się od niego."}
              </h3>
              <p className="mb-5 text-[13px] leading-relaxed text-muted-foreground">
                {gifts.length
                  ? "Spróbuj innej nazwy albo wróć do wszystkich prezentów."
                  : "Dodaj coś małego, coś praktycznego albo coś, o czym od dawna marzysz."}
              </p>
              <Button
                variant="outline"
                onClick={(event) => {
                  if (gifts.length) {
                    setQuery("");
                    setFavoritesOnly(false);
                  } else openEditor(null, event.currentTarget);
                }}
              >
                {gifts.length
                  ? "Pokaż wszystkie prezenty"
                  : "Dodaj pierwszy prezent"}
              </Button>
            </div>
          )}

          {visibleGifts.length > 0 && (
            <Button
              variant="outline"
              onClick={(event) => openEditor(null, event.currentTarget)}
              className="mt-6 h-auto min-h-[83px] w-full justify-start gap-3 rounded-[10px] border-dashed border-input bg-transparent p-[17px_14px] text-left font-normal whitespace-normal text-secondary-foreground shadow-none hover:bg-muted/60 sm:gap-[15px] sm:p-5"
            >
              <span className="grid size-[33px] shrink-0 place-items-center rounded-full bg-muted">
                <Icon name="plus" className="size-5" />
              </span>
              <span className="text-[11px] leading-relaxed font-medium sm:text-xs">
                Jest jeszcze coś, co chodzi Ci po głowie?
              </span>
              <span className="ml-auto hidden items-center gap-2 text-[11px] text-accent-foreground sm:flex">
                <span className="hidden lg:inline">Dodaj kolejny pomysł</span>
                <Icon name="arrow" className="size-3.5" />
              </span>
            </Button>
          )}
        </section>
        <footer className="mt-[34px] flex items-start gap-6 border-t pt-[23px] pb-[17px] text-secondary-foreground sm:mt-14 sm:items-center sm:pt-[26px]">
          <span className="text-[19px] font-semibold tracking-[-1px]">
            podaruj.
          </span>
          <p className="max-w-[180px] text-[9px] leading-relaxed sm:max-w-none sm:text-[10px]">
            Dobre prezenty zaczynają się od małych podpowiedzi.
          </p>
          <span className="ml-auto hidden items-center gap-[7px] text-[10px] lg:flex">
            Stworzone z myślą o bliskich{" "}
            <Icon name="heart" className="size-3" />
          </span>
        </footer>
        <p className="mb-[30px] text-[9px] leading-relaxed text-muted-foreground sm:text-[10px]">
          Na start znajdziesz tu przykładowe prezenty. Możesz je dowolnie
          zmieniać. Lista zapisuje się tylko w tej przeglądarce — nie jest
          jeszcze udostępniana innym.
        </p>
      </main>
      {notice && (
        <div
          className="fixed bottom-[15px] left-1/2 z-40 flex w-max max-w-[min(640px,calc(100%-32px))] -translate-x-1/2 items-center gap-2 rounded-[10px] bg-[#343d30] py-2.5 pr-[13px] pl-[17px] text-[11px] text-[#fffef9] shadow-xl sm:bottom-6 sm:gap-3 sm:text-xs"
          role="status"
        >
          <Icon name="check" className="size-[17px] shrink-0" />
          <span>{notice}</span>
          {deleted && (
            <Button
              variant="link"
              onClick={undoDelete}
              className="h-9 px-0 text-xs text-[#f5d6af] underline underline-offset-4"
            >
              Cofnij
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Zamknij powiadomienie"
            onClick={() => {
              setNotice("");
              setDeleted(null);
            }}
            className="text-[#e7eadb] hover:bg-white/10 hover:text-white"
          >
            <Icon name="close" />
          </Button>
        </div>
      )}
      {editor && (
        <GiftForm
          gift={editor.gift}
          onSave={saveGift}
          onClose={() => setEditor(null)}
          onRestoreFocus={restoreEditorFocus}
        />
      )}
    </div>
  );
}
