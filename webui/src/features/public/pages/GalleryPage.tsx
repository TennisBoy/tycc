import { useState } from "react";
import { Play } from "lucide-react";
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
            Moments from TYCC rides across Toronto and the GTA. More photos and ride films land here
            as the season rolls on.
          </p>
        </div>

        {/* Video slot — ready for footage from the club's drive */}
        <div className="relative mt-10 flex aspect-video items-center justify-center overflow-hidden rounded-[1.75rem] border border-border bg-muted">
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <div className="flex size-16 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <Play className="size-7" />
            </div>
            <p className="text-base font-medium">Ride film coming soon</p>
          </div>
        </div>

        {/* Photo grid */}
        <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
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
        <DialogContent className="max-w-3xl overflow-hidden p-0">
          {active ? (
            <>
              <DialogTitle className="sr-only">{active.alt}</DialogTitle>
              <img alt={active.alt} className="w-full object-contain" src={active.src} />
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default GalleryPage;
