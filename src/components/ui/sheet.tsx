import * as React from "react";
import { cn } from "@/lib/utils";

interface SheetContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SheetContext = React.createContext<SheetContextValue | undefined>(undefined);

interface SheetProps {
  children: React.ReactNode;
}

function Sheet({ children }: SheetProps) {
  const [open, setOpen] = React.useState(false);
  return <SheetContext.Provider value={{ open, setOpen }}>{children}</SheetContext.Provider>;
}

function SheetTrigger({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(SheetContext);
  if (!context) throw new Error("SheetTrigger must be used within Sheet");
  return (
    <button className={className} onClick={() => context.setOpen(true)} {...props} />
  );
}

function SheetClose({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(SheetContext);
  if (!context) throw new Error("SheetClose must be used within Sheet");
  return (
    <button className={className} onClick={() => context.setOpen(false)} {...props} />
  );
}

function SheetContent({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(SheetContext);
  if (!context) throw new Error("SheetContent must be used within Sheet");
  return (
    <div
      className={cn("fixed inset-0 z-50 flex", context.open ? "" : "pointer-events-none")}
    >
      <div
        className={cn(
          "absolute inset-0 bg-black/50 transition-opacity",
          context.open ? "opacity-100" : "opacity-0"
        )}
        onClick={() => context.setOpen(false)}
      />
      <div
        className={cn(
          "relative ml-auto h-full w-3/4 max-w-xs bg-background p-4 transition-transform",
          context.open ? "translate-x-0" : "translate-x-full",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

export { Sheet, SheetTrigger, SheetContent, SheetClose };
