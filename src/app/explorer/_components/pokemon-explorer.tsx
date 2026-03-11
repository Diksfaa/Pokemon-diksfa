"use client";

import { useState } from "react";
import { usePokemonList } from "@/src/hooks/use-pokemon-list";
import PokemonCardMini from "./pokemon-card-mini";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

export default function PokemonExplorer() {
  const [page, setPage] = useState(0);
  const limit = 20;

  const { data, isLoading } = usePokemonList(page, limit);

  const totalItems = data?.count || 0;
  const totalPages = Math.ceil(totalItems / limit);

  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(0, page - 2);
    const end = Math.min(totalPages - 1, page + 2);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">
            Global Registry
          </h2>
          <p className="text-xs font-medium text-slate-400">
            Showing {page * limit + 1} -{" "}
            {Math.min((page + 1) * limit, totalItems)} of {totalItems} Pokemon
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black uppercase text-slate-400">
            Filter By Gen:
          </span>
          <Select
            onValueChange={(val) => {
              // Logic: Offset for Gen 1 is 0, Gen 2 is 151, etc.
              if (val === "gen1") setPage(0);
              if (val === "gen2") setPage(Math.floor(151 / limit));
            }}
          >
            <SelectTrigger className="w-[140px] bg-white border-none shadow-sm font-bold text-xs uppercase">
              <SelectValue placeholder="All Regions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="gen1">Kanto (Gen 1)</SelectItem>
              <SelectItem value="gen2">Johto (Gen 2)</SelectItem>
              <SelectItem value="gen3">Hoenn (Gen 3)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 min-h-[600px]">
        {data?.results.map((p: any) => (
          <PokemonCardMini key={p.name} name={p.name} url={p.url} />
        ))}
      </div>

      {/* Modern shadcn Pagination */}
      <Pagination className="mt-8">
        <PaginationContent className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPage((p) => Math.max(0, p - 1));
              }}
              className={
                page === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"
              }
            />
          </PaginationItem>

          {page > 2 && (
            <>
              <PaginationItem>
                <PaginationLink onClick={() => setPage(0)}>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </>
          )}

          {getPageNumbers().map((pNum) => (
            <PaginationItem key={pNum}>
              <PaginationLink
                href="#"
                isActive={page === pNum}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(pNum);
                }}
                className="cursor-pointer font-bold"
              >
                {pNum + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          {page < totalPages - 3 && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink onClick={() => setPage(totalPages - 1)}>
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPage((p) => Math.min(totalPages - 1, p + 1));
              }}
              className={
                page === totalPages - 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
