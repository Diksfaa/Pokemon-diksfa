"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/store/store";
import { setSearch } from "@/src/store/slices/pokemon-slices";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Search } from "lucide-react";

export default function SearchHeader() {
  const dispatch = useAppDispatch();
  const currentSearch = useAppSelector((state) => state.pokemon.currentSearch);
  const [localInput, setLocalInput] = useState(currentSearch);

  const handleSearch = () => {
    if (localInput.trim()) {
      dispatch(setSearch(localInput.toLowerCase()));
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border">
      <h1 className="text-xl font-bold tracking-tight uppercase flex items-center gap-2">
        <div className="w-fit p-2 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
          Pokemon
        </div>
        Dashboard
      </h1>
      <div className="flex w-full md:w-96 items-center space-x-2">
        <Input
          placeholder="Search Pokemon..."
          value={localInput}
          onChange={(e) => setLocalInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button onClick={handleSearch} size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
