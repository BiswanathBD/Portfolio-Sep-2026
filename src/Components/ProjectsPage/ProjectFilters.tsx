"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, RotateCcw, ChevronDown, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { MotionWrapper } from "../Shared/MotionWrapper";

interface ProjectFiltersProps {
  categories: string[];
  selectedCategory: string;
  searchQuery: string;
}

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  categories,
  selectedCategory,
  searchQuery,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const updateQueryParams = (category: string, query: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category && category !== "All") {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }

    const queryString = params.toString();

    router.push(queryString ? `/projects?${queryString}` : "/projects", {
      scroll: false,
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isFilterActive = selectedCategory !== "All" || searchQuery !== "";

  const resetFilters = () => {
    setIsDropdownOpen(false);
    router.push("/projects", { scroll: false });
  };

  return (
    <div className="relative flex flex-col rounded-xl border-b border-border-color/40 bg-linear-to-bl p-3.5 sm:p-4 md:h-full md:rounded-none md:border-b-0 md:border-r md:p-5">
      <div className="pointer-events-none absolute right-0 top-0 z-0 aspect-square w-1/3 rounded-full bg-primary/40 blur-[80px]" />
      <div className="relative z-10 flex flex-col gap-3 md:flex-1 md:min-h-0 md:gap-5">
        {/* Mobile / Tablet Filter Controls */}
        <div className="relative flex w-full items-center gap-2 sm:gap-2.5 md:flex-col md:items-stretch md:gap-0">
          {/* Search */}
          <MotionWrapper
            animationType="fadeUp"
            delay={0.4}
            className="min-w-0 flex-1 md:w-full"
          >
            <div className="w-full">
              <label className="mb-2 hidden px-1 text-xs font-bold tracking-wider text-foreground md:block">
                Search Projects
              </label>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 z-10 size-3.5 -translate-y-1/2 text-primary md:size-4" />

                <input
                  type="text"
                  placeholder="Name or tech..."
                  defaultValue={searchQuery}
                  onChange={(e) =>
                    updateQueryParams(selectedCategory, e.target.value)
                  }
                  className="w-full rounded-lg border border-border-color/80 bg-background/60 py-2 pl-8 pr-3 text-xs text-foreground transition-all placeholder:text-foreground/40 focus:border-primary/60 focus:outline-none md:pl-9 md:pr-4"
                />
              </div>
            </div>
          </MotionWrapper>

          {/* Mobile Category Dropdown */}
          <div ref={dropdownRef} className="relative shrink-0 md:hidden">
            <MotionWrapper animationType="fadeUp" delay={0.5}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="relative flex w-36 items-center justify-between gap-2 rounded-lg border border-border-color/80 bg-background/60 px-3 py-2 text-left text-xs font-medium text-foreground transition-all hover:border-primary/60 sm:w-44"
              >
                <span className="truncate">
                  {selectedCategory === "All"
                    ? "All Categories"
                    : selectedCategory}
                </span>

                <ChevronDown
                  className={`size-3.5 shrink-0 text-primary transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -8,
                      scale: 0.96,
                    }}
                    animate={{
                      opacity: 1,
                      y: 4,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -8,
                      scale: 0.96,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                    className="absolute right-0 top-full w-52 overflow-hidden rounded-xl border border-border-color/80 bg-background/98 py-1.5 shadow-2xl backdrop-blur-xl sm:w-56"
                  >
                    <div className="max-h-64 space-y-0.5 overflow-y-auto px-1 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                      {categories.map((cat) => {
                        const isActive = selectedCategory === cat;

                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => {
                              updateQueryParams(cat, searchQuery);
                              setIsDropdownOpen(false);
                            }}
                            className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors ${
                              isActive
                                ? "bg-accent/15 font-bold text-accent"
                                : "text-foreground hover:bg-card-bg/80 hover:text-primary"
                            }`}
                          >
                            <span className="truncate">
                              {cat === "All" ? "All Categories" : cat}
                            </span>

                            {isActive && (
                              <Check className="ml-2 size-3.5 shrink-0 text-accent" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </MotionWrapper>
          </div>

          {/* Mobile Reset Icon */}
          <AnimatePresence initial={false}>
            {isFilterActive && (
              <motion.button
                type="button"
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  width: 0,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  width: 32,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                  width: 0,
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
                onClick={resetFilters}
                aria-label="Reset filters"
                title="Reset filters"
                className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-accent/25 bg-accent/5 text-accent/70 transition-colors hover:border-accent/50 hover:bg-accent/10 hover:text-accent md:hidden"
              >
                <RotateCcw className="size-3.5" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Sidebar Category List */}
        <MotionWrapper
          animationType="fadeUp"
          delay={0.5}
          className="hidden min-h-0 flex-1 flex-col md:flex"
        >
          <div className="flex min-h-0 flex-1 flex-col">
            <label className="mb-2 block shrink-0 px-1 text-xs font-bold tracking-wider text-foreground">
              Categories
            </label>

            <div className="flex min-h-0 flex-1 flex-col space-y-1.5 overflow-y-auto pr-1 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {categories.map((cat, idx) => {
                const isActive = selectedCategory === cat;

                return (
                  <MotionWrapper
                    key={cat}
                    animationType="fadeUp"
                    delay={0.6 + idx * 0.05}
                  >
                    <button
                      type="button"
                      onClick={() => updateQueryParams(cat, searchQuery)}
                      className={`flex w-full items-center justify-between bg-linear-to-r from-card-bg px-3 py-2 text-left text-xs font-medium transition-all duration-300 ${
                        isActive
                          ? "border-l-4 border-accent font-bold text-accent"
                          : "border-l-0 border-transparent text-foreground hover:text-primary"
                      }`}
                    >
                      <span>{cat}</span>
                    </button>
                  </MotionWrapper>
                );
              })}
            </div>
          </div>
        </MotionWrapper>
      </div>
      {/* Desktop Reset Button */}
      <AnimatePresence>
        {isFilterActive && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
              marginTop: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
              marginTop: 12,
            }}
            exit={{
              opacity: 0,
              height: 0,
              marginTop: 0,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="hidden shrink-0 overflow-hidden border-t border-primary/15 pt-4 md:block"
          >
            <MotionWrapper animationType="fadeUp" delay={0.3}>
              <button
                type="button"
                onClick={resetFilters}
                className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-accent/30 py-2 text-xs text-accent/70 transition-colors hover:text-accent"
              >
                <RotateCcw className="size-3.5" />
                <span>Reset Filters</span>
              </button>
            </MotionWrapper>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
