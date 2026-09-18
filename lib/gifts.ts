export const categories = [
  "Dom i kawa",
  "Technologia",
  "Książki",
  "Doświadczenia",
  "Hobby",
] as const;
export type Category = (typeof categories)[number];

export type Gift = {
  id: string;
  name: string;
  description: string;
  price: number | null;
  url: string;
  category: Category;
  favorite: boolean;
};

export const sampleGifts: Gift[] = [
  {
    id: "coffee",
    name: "Zestaw do parzenia kawy",
    description:
      "Na powolne poranki. Dripper i dzbanek, najchętniej w kolorze bursztynowym.",
    price: 160,
    url: "",
    category: "Dom i kawa",
    favorite: true,
  },
  {
    id: "headphones",
    name: "Słuchawki bezprzewodowe",
    description:
      "Trochę muzyki, trochę ciszy. Wygodne, nauszne i z redukcją hałasu.",
    price: 450,
    url: "",
    category: "Technologia",
    favorite: false,
  },
  {
    id: "book",
    name: "Książka na wolny wieczór",
    description:
      "Dobry reportaż albo coś o designie. Z dedykacją będzie jeszcze milej.",
    price: 65,
    url: "",
    category: "Książki",
    favorite: false,
  },
  {
    id: "workshop",
    name: "Warsztaty ceramiczne",
    description:
      "Chcę ulepić swój pierwszy, pewnie trochę krzywy kubek. Możemy pójść razem!",
    price: 220,
    url: "",
    category: "Doświadczenia",
    favorite: true,
  },
  {
    id: "cup",
    name: "Kubek z małej pracowni",
    description:
      "Ręcznie robiony, z dużym uchem. Taki, po który sięga się codziennie.",
    price: 95,
    url: "",
    category: "Dom i kawa",
    favorite: false,
  },
  {
    id: "plant",
    name: "Jeszcze jedna roślina",
    description:
      "Na parapecie znajdzie się miejsce. Najlepiej coś łatwego w pielęgnacji.",
    price: 55,
    url: "",
    category: "Hobby",
    favorite: false,
  },
];

export function normalizeGiftUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  const hasProtocol = /^[a-z][a-z\d+.-]*:/i.test(trimmed);
  const url = new URL(hasProtocol ? trimmed : `https://${trimmed}`);
  if (
    !["https:", "http:"].includes(url.protocol) ||
    !url.hostname ||
    url.username ||
    url.password ||
    url.href.length > 2048
  ) {
    throw new Error(
      "Podaj poprawny link zaczynający się od https:// lub http://.",
    );
  }
  return url.href;
}

export function isGift(value: unknown): value is Gift {
  if (!value || typeof value !== "object") return false;
  const gift = value as Record<string, unknown>;
  if (!(
    typeof gift.id === "string" &&
    gift.id.length > 0 &&
    typeof gift.name === "string" &&
    gift.name.trim().length > 0 &&
    gift.name.length <= 100 &&
    typeof gift.description === "string" &&
    gift.description.length <= 500 &&
    (gift.price === null ||
      (typeof gift.price === "number" &&
        Number.isFinite(gift.price) &&
        gift.price >= 0 &&
        gift.price <= 1_000_000)) &&
    typeof gift.url === "string" &&
    gift.url.length <= 2048 &&
    categories.includes(gift.category as Category) &&
    typeof gift.favorite === "boolean"
  ))
    return false;
  try {
    return gift.url === "" || normalizeGiftUrl(gift.url as string) === gift.url;
  } catch {
    return false;
  }
}

export function formatPrice(price: number | null): string {
  return price === null
    ? "Cena do ustalenia"
    : new Intl.NumberFormat("pl-PL", {
        style: "currency",
        currency: "PLN",
        maximumFractionDigits: 2,
        minimumFractionDigits: Number.isInteger(price) ? 0 : 2,
      }).format(price);
}
