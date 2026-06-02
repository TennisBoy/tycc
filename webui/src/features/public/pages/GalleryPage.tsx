import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { gallery } from "@/shared/tycc/content";
import type { GalleryItem } from "@/shared/tycc/types";

const GalleryPage = () => {
  const [active, setActive] = useState<GalleryItem | null>(null);

  return (
    <main className="pb-20 pt-10 sm:pt-14">
      <Container size="xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Gallery</p>
          <h1 className="mt-3 text-5xl font-bold sm:text-7xl">Out on the road.</h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Moments from TYCC rides across Toronto and the GTA. More photos land here as the season
            rolls on.
          </p>
        </div>

        {/* Photo grid */}
        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {gallery.map((item) => (
            <button
              className="block w-full overflow-hidden rounded-[1.25rem] border border-border transition-transform hover:-translate-y-1"
              key={item.id}
              onClick={() => setActive(item)}
              type="button"
            >
              <img alt={item.alt} className="w-full object-cover" loading="lazy" src={item.src} />
            </button>
          ))}
        </div>
      </Container>

      <Dialog onOpenChange={(open) => !open && setActive(null)} open={active !== null}>
        <DialogContent className="overflow-hidden p-0 sm:max-w-[60rem]">
          {active ? (
            <>
              <DialogTitle className="sr-only">{active.alt}</DialogTitle>
              <img
                alt={active.alt}
                className="max-h-[85vh] w-full object-contain"
                src={active.src}
              />
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default GalleryPage;
