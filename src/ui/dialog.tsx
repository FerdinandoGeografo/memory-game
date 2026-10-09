import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogContent({
  open,
  className,
  children,
  ...props
}: DialogPrimitive.Popup.Props & { open: boolean }) {
  return (
    <AnimatePresence>
      {open && (
        <DialogPrimitive.Portal data-slot="dialog-portal" keepMounted>
          <DialogPrimitive.Backdrop
            data-slot="dialog-overlay"
            className="fixed inset-0 isolate z-50 bg-black/50"
            render={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            }
          />

          {/* Grid centering keeps a tall popup scrollable from its top edge */}
          <DialogPrimitive.Viewport className="fixed inset-0 z-50 grid place-items-center overflow-y-auto p-6">
            <DialogPrimitive.Popup
              data-slot="dialog-content"
              className={cn(
                "grid w-full gap-6 rounded-xl bg-neutral-200 px-6 pt-8 pb-6 text-lg outline-none sm:max-w-2xl sm:gap-10 sm:px-14 sm:pt-12.75 sm:pb-17.25",
                className,
              )}
              render={
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              }
              {...props}
            >
              {children}
            </DialogPrimitive.Popup>
          </DialogPrimitive.Viewport>
        </DialogPrimitive.Portal>
      )}
    </AnimatePresence>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col items-center gap-2.25 sm:gap-4", className)}
      {...props}
    />
  );
}

function DialogFooter({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-3.5",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "text-xl leading-7.5 text-blue-800 sm:text-6xl sm:leading-15",
        className,
      )}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-[14px] leading-4.25 text-blue-600 sm:text-lg sm:leading-5.5",
        className,
      )}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
};
