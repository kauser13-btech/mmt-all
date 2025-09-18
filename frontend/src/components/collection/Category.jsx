

export default function Category() {
  return (
    <div className="flex items-center gap-5 md:hidden mt-2">
      {/* TODO: set active category btn */}
      <button
        className="btn min-h-[fit-content] px-10 h-12 text-sm text-sub-work-card border border-black rounded-md border-none
lg:shadow-lg hover:bg-yellow-primary/70 font-medium shadow-lg"
      >
        T-Shirts
      </button>

      <button
        className="btn min-h-[fit-content] px-10 h-12 text-sm text-sub-work-card border border-black rounded-md border-none
lg:shadow-lg bg-yellow-primary font-medium shadow-lg"
      >
        Hoodies
      </button>
    </div>
  );
};

