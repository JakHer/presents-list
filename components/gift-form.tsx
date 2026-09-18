"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import {
  categories,
  normalizeGiftUrl,
  type Category,
  type Gift,
} from "@/lib/gifts";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { Icon } from "./icon";

type FormError = { field: "name" | "price" | "url"; message: string };

export function GiftForm({
  gift,
  onSave,
  onClose,
  onRestoreFocus,
}: {
  gift: Gift | null;
  onSave: (gift: Gift) => void;
  onClose: () => void;
  onRestoreFocus: () => void;
}) {
  const id = useId();
  const nameRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<FormError | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const rawPrice = String(data.get("price") ?? "")
      .trim()
      .replace(",", ".");
    const price = rawPrice === "" ? null : Number(rawPrice);

    function showError(field: FormError["field"], message: string) {
      setError({ field, message });
      const input = form.elements.namedItem(field);
      if (input instanceof HTMLElement) input.focus();
    }

    if (!name) {
      showError("name", "Wpisz nazwę prezentu.");
      return;
    }
    if (
      price !== null &&
      (!/^\d+(\.\d{1,2})?$/.test(rawPrice) ||
        !Number.isFinite(price) ||
        price > 1_000_000)
    ) {
      showError(
        "price",
        "Podaj cenę od 0 do 1 000 000 zł, z maksymalnie dwoma miejscami po przecinku.",
      );
      return;
    }
    let url: string;
    try {
      url = normalizeGiftUrl(String(data.get("url") ?? ""));
    } catch {
      showError(
        "url",
        "Sprawdź link do sklepu. Użyj adresu http:// lub https://, np. https://sklep.pl/prezent.",
      );
      return;
    }
    onSave({
      id: gift?.id ?? crypto.randomUUID(),
      name,
      price,
      url,
      description: String(data.get("description") ?? "").trim(),
      category: data.get("category") as Category,
      favorite: data.get("favorite") === "on",
    });
  }

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="max-h-[calc(100dvh-40px)] w-[calc(100%-2rem)] max-w-[540px] gap-0 overflow-y-auto rounded-2xl border border-input p-0 shadow-2xl ring-0 sm:max-w-[540px]"
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          nameRef.current?.focus();
        }}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          onRestoreFocus();
        }}
      >
        <form onSubmit={handleSubmit} className="p-[22px_18px] sm:p-[29px]">
          <DialogHeader className="gap-0">
            <div className="flex items-center justify-between gap-2.5">
              <div>
                <span className="text-[8px] font-semibold tracking-[1.5px] text-accent-foreground">
                  MIEJSCE NA MAŁE MARZENIA
                </span>
                <DialogTitle className="mt-1.5 text-[23px] leading-normal font-semibold tracking-[-0.6px] sm:text-[25px]">
                  {gift ? "Edytuj prezent" : "Co sprawi Ci radość?"}
                </DialogTitle>
              </div>
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  aria-label="Zamknij formularz"
                  className="text-muted-foreground"
                >
                  <Icon name="close" />
                </Button>
              </DialogClose>
            </div>
            <DialogDescription className="mt-2 mb-6 text-xs leading-relaxed">
              Dodaj kilka szczegółów, które ułatwią wybór prezentu.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-[17px]">
            <div className="space-y-[7px]">
              <Label
                htmlFor={`${id}-name`}
                className="gap-1.5 text-[11px] font-semibold"
              >
                Nazwa prezentu{" "}
                <span className="text-[9px] font-normal text-muted-foreground">
                  wymagane
                </span>
              </Label>
              <Input
                ref={nameRef}
                id={`${id}-name`}
                name="name"
                defaultValue={gift?.name}
                placeholder="np. Kubek na długie poranki"
                required
                maxLength={100}
                className="h-11 bg-card px-3 md:text-[13px]"
                aria-invalid={error?.field === "name"}
                aria-describedby={
                  error?.field === "name" ? `${id}-error` : undefined
                }
              />
            </div>
            <div className="grid gap-4 min-[370px]:grid-cols-2">
              <div className="space-y-[7px]">
                <Label
                  htmlFor={`${id}-price`}
                  className="text-[11px] font-semibold"
                >
                  Orientacyjna cena (zł)
                </Label>
                <Input
                  id={`${id}-price`}
                  name="price"
                  inputMode="decimal"
                  defaultValue={gift?.price ?? ""}
                  placeholder="np. 99,90"
                  maxLength={12}
                  className="h-11 bg-card px-3 md:text-[13px]"
                  aria-invalid={error?.field === "price"}
                  aria-describedby={
                    error?.field === "price" ? `${id}-error` : undefined
                  }
                />
              </div>
              <div className="space-y-[7px]">
                <Label
                  htmlFor={`${id}-category`}
                  className="text-[11px] font-semibold"
                >
                  Kategoria
                </Label>
                <NativeSelect
                  id={`${id}-category`}
                  name="category"
                  defaultValue={gift?.category ?? categories[0]}
                  className="w-full [&_select]:h-11 [&_select]:bg-card [&_select]:pl-3 [&_select]:text-base md:[&_select]:text-[13px]"
                >
                  {categories.map((category) => (
                    <NativeSelectOption key={category}>
                      {category}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </div>
            </div>
            <div className="space-y-[7px]">
              <Label
                htmlFor={`${id}-url`}
                className="text-[11px] font-semibold"
              >
                Link do sklepu
              </Label>
              <Input
                id={`${id}-url`}
                name="url"
                inputMode="url"
                defaultValue={gift?.url}
                placeholder="https://sklep.pl/twoj-prezent"
                maxLength={2048}
                className="h-11 bg-card px-3 md:text-[13px]"
                aria-invalid={error?.field === "url"}
                aria-describedby={
                  error?.field === "url" ? `${id}-error` : undefined
                }
              />
            </div>
            <div className="space-y-[7px]">
              <Label
                htmlFor={`${id}-description`}
                className="text-[11px] font-semibold"
              >
                Mała podpowiedź
              </Label>
              <Textarea
                id={`${id}-description`}
                name="description"
                defaultValue={gift?.description}
                placeholder="Kolor, rozmiar, ulubiony autor… wszystko, co pomoże."
                maxLength={500}
                rows={3}
                className="field-sizing-fixed min-h-24 resize-y bg-card px-3 py-2.5 md:text-[13px]"
              />
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-accent/70 p-3.5">
              <Checkbox
                id={`${id}-favorite`}
                name="favorite"
                value="on"
                defaultChecked={gift?.favorite}
                className="size-[17px]"
              />
              <Label
                htmlFor={`${id}-favorite`}
                className="flex-1 gap-3 leading-normal"
              >
                <span>
                  <span className="block text-[11px] font-medium">
                    Szczególnie o tym marzę
                  </span>
                  <span className="mt-0.5 block text-[10px] font-normal text-muted-foreground">
                    Wyróżnij ten prezent na swojej liście.
                  </span>
                </span>
                <Icon
                  name="heart"
                  className="ml-auto size-[18px] text-accent-foreground"
                />
              </Label>
            </div>
          </div>
          {error && (
            <p
              id={`${id}-error`}
              className="mt-[17px] rounded-md bg-destructive/10 p-3 text-xs leading-relaxed text-destructive"
              role="alert"
            >
              {error.message}
            </p>
          )}
          <DialogFooter className="mx-0 mb-0 flex-row justify-end gap-2.5 rounded-none border-0 bg-transparent p-0 pt-6">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="flex-1 sm:flex-none"
              >
                Anuluj
              </Button>
            </DialogClose>
            <Button type="submit" className="flex-1 sm:flex-none">
              <Icon name={gift ? "check" : "plus"} />
              {gift ? "Zapisz zmiany" : "Dodaj do listy"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
