"use client";

import { Card, CardContent } from "@/src/components/ui/card";
import { useAppDispatch } from "@/src/store/store";
import { setSearch } from "@/src/store/slices/pokemon-slices";
import { useRouter } from "next/navigation";

export default function PokemonCardMini({
  name,
  url,
}: {
  name: string;
  url: string;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const id = url.split("/").filter(Boolean).pop();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  const handleSelect = () => {
    dispatch(setSearch(name));
    router.push("/");
  };

  return (
    <Card
      onClick={handleSelect}
      className="group cursor-pointer overflow-hidden border-slate-100 hover:border-red-200 hover:shadow-md transition-all duration-300 bg-white"
    >
      <CardContent className="p-3 flex flex-col items-center justify-center relative">
        <span className="absolute top-2 right-2 text-[10px] font-mono font-black text-slate-400 group-hover:text-slate-700 transition-colors">
          #{id?.padStart(3, "0")}
        </span>

        <div className="relative w-24 h-24 mb-2">
          <div className="absolute inset-0 bg-red-500/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-contain relative  drop-shadow-sm group-hover:drop-shadow-xl group-hover:-translate-y-1 transition-all duration-300"
            loading="lazy"
          />
        </div>

        <div className="w-full text-center">
          <p className="text-xs font-bold uppercase tracking-tight text-slate-500 group-hover:text-red-600 transition-colors truncate">
            {name.replace("-", " ")}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-100 group-hover:bg-red-500 transition-colors" />
      </CardContent>
    </Card>
  );
}
