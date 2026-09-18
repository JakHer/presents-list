import type { Category } from "@/lib/gifts";

export const categoryStyles: Record<
  Category,
  { className: string; caption: string }
> = {
  "Dom i kawa": {
    className: "bg-[#f1e6da] text-[#9d7757]",
    caption: "MAŁE CODZIENNE RYTUAŁY",
  },
  Technologia: {
    className: "bg-[#eae8ef] text-[#807b97]",
    caption: "W SWOIM WŁASNYM ŚWIECIE",
  },
  Książki: {
    className: "bg-[#f5edda] text-[#ac8c57]",
    caption: "JESZCZE JEDEN ROZDZIAŁ",
  },
  Doświadczenia: {
    className: "bg-[#f3e3e2] text-[#b17a7d]",
    caption: "WSPOMNIENIA ZOSTAJĄ",
  },
  Hobby: {
    className: "bg-[#e6ebdf] text-[#708369]",
    caption: "WIĘCEJ TEGO, CO LUBISZ",
  },
};

export function GiftArtwork({ category }: { category: Category }) {
  return (
    <svg
      className="mt-[19px] h-[180px] w-[254px] max-w-[85%] shrink-0 sm:mt-[23px] sm:h-[163px] sm:w-[232px]"
      viewBox="0 0 240 170"
      fill="none"
      aria-hidden="true"
    >
      <ellipse
        cx="120"
        cy="148"
        rx="62"
        ry="8"
        fill="currentColor"
        opacity=".08"
      />
      {category === "Dom i kawa" && (
        <>
          <path
            d="M154 71h14c34 0 34 47 0 47h-15"
            stroke="#935a3d"
            strokeWidth="12"
          />
          <path
            d="M73 61h88v61c0 19-20 27-44 27s-44-8-44-27V61Z"
            fill="#c8835b"
          />
          <ellipse cx="117" cy="61" rx="44" ry="12" fill="#e2ae83" />
          <ellipse cx="117" cy="61" rx="34" ry="7" fill="#614633" />
          <path
            d="M87 80v35c0 11 5 16 11 19"
            stroke="#edbc97"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M103 40c-12-14 11-15 0-29M126 37c-10-11 10-14 1-25"
            stroke="#ad7653"
            strokeWidth="3"
            strokeLinecap="round"
            opacity=".6"
          />
        </>
      )}
      {category === "Technologia" && (
        <>
          <path
            d="M69 104V72a51 51 0 0 1 102 0v32"
            stroke="#484756"
            strokeWidth="18"
          />
          <path d="M70 76a50 50 0 0 1 100 0" stroke="#a7a5b6" strokeWidth="6" />
          <rect x="56" y="85" width="37" height="61" rx="17" fill="#656374" />
          <rect x="147" y="85" width="37" height="61" rx="17" fill="#656374" />
          <rect x="79" y="89" width="14" height="53" rx="7" fill="#35343f" />
          <rect x="147" y="89" width="14" height="53" rx="7" fill="#35343f" />
          <path
            d="M65 101v23M175 101v23"
            stroke="#9e9aaa"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </>
      )}
      {category === "Książki" && (
        <g transform="rotate(-9 120 90)">
          <path
            d="M73 28h94v118H79a9 9 0 0 1-9-9V38a10 10 0 0 1 3-10Z"
            fill="#b45535"
          />
          <path d="M79 137h88v9H79c-9 0-9-9 0-9Z" fill="#fff8e7" />
          <path d="M82 29v106" stroke="#e89d67" strokeWidth="2" />
          <path d="M97 48h54M97 55h36" stroke="#f8deb1" strokeWidth="3" />
          <circle cx="123" cy="96" r="23" fill="#f0b66e" />
          <path d="M100 119 123 73l23 46" fill="#f8e3b9" />
          <circle cx="137" cy="84" r="6" fill="#b45535" />
        </g>
      )}
      {category === "Doświadczenia" && (
        <g transform="rotate(-8 120 85)">
          <path
            d="M42 44h156v29a13 13 0 0 0 0 26v29H42V99a13 13 0 0 0 0-26V44Z"
            fill="#c76876"
          />
          <path
            d="M153 45v82"
            stroke="#f2b7b8"
            strokeWidth="2"
            strokeDasharray="5 5"
          />
          <path
            d="m99 59 7 17 19 2-14 13 4 19-16-10-16 10 4-19-14-13 19-2 7-17Z"
            fill="#ffe6ca"
          />
          <path d="M169 64v44M177 64v44" stroke="#f7c8c9" strokeWidth="3" />
        </g>
      )}
      {category === "Hobby" && (
        <>
          <path
            d="M120 113V43M120 83 95 65M120 98l28-30"
            stroke="#557754"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M118 77C79 85 72 57 76 43c28-4 44 10 42 34Z"
            fill="#76936d"
          />
          <path d="M123 90c-7-33 12-51 41-48 5 25-8 48-41 48Z" fill="#476e50" />
          <path
            d="M119 59c-25-14-22-42-3-51 19 12 26 35 3 51Z"
            fill="#91a77a"
          />
          <path d="M89 107h64l-8 39H97l-8-39Z" fill="#cf9973" />
          <rect x="85" y="101" width="72" height="13" rx="4" fill="#dfb08d" />
          <path
            d="m102 120 3 17"
            stroke="#ecc4a3"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </>
      )}
      <path
        d="m192 29 2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6Z"
        fill="currentColor"
        opacity=".4"
      />
      <circle cx="47" cy="118" r="3" fill="currentColor" opacity=".25" />
    </svg>
  );
}
