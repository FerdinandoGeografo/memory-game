import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { fade } from "@/lib/motion/transitions";
import { popIn } from "@/lib/motion/variants";

const popupVariants = popIn({ step: 0.06, startDelay: 0.1 });
const DialogOpenContext = React.createContext(false);

function Dialog({
  open,
  ...props
}: DialogPrimitive.Root.Props & { open: boolean }) {
  return (
    <DialogOpenContext.Provider value={open}>
      <DialogPrimitive.Root data-slot="dialog" open={open} {...props} />
    </DialogOpenContext.Provider>
  );
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogContent({
  className,
  children,
  ...props
}: DialogPrimitive.Popup.Props) {
  const open = React.useContext(DialogOpenContext);

  return (
    <AnimatePresence>
      {open && (
        <DialogPrimitive.Portal data-slot="dialog-portal" keepMounted>
          <DialogPrimitive.Backdrop
            data-slot="dialog-overlay"
            className="fixed inset-0 z-50 bg-black/50"
            render={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={fade}
              />
            }
          />

          <DialogPrimitive.Viewport className="fixed inset-0 z-50 grid place-items-center overflow-y-auto p-6">
            <DialogPrimitive.Popup
              data-slot="dialog-content"
              className={cn(
                "grid w-full gap-6 rounded-xl bg-neutral-200 px-6 pt-8 pb-6 outline-none sm:max-w-2xl sm:gap-10 sm:px-14 sm:pt-12.75 sm:pb-17.25",
                className,
              )}
              render={
                <motion.div
                  variants={popupVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
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

function DialogHeader({
  className,
  ...props
}: React.ComponentProps<typeof motion.div>) {
  return (
    <motion.div
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
}: React.ComponentProps<typeof motion.div>) {
  return (
    <motion.div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-3.5",
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-2xl text-blue-800 sm:text-7xl", className)}
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
      className={cn("text-[14px]/4.25 text-blue-600 sm:text-lg", className)}
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
