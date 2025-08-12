import * as React from "react";
import { cn } from "@/lib/utils";

function H1({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", className)}
      {...props}
    />
  );
}

function H2({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0", className)}
      {...props}
    />
  );
}

function H3({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)} {...props} />
  );
}

function H4({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4 className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)} {...props} />
  );
}

function P({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)} {...props} />
  );
}

function Blockquote({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic text-muted-foreground", className)}
      {...props}
    />
  );
}

function Lead({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-xl text-muted-foreground", className)} {...props} />
  );
}

function Large({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-lg font-semibold", className)} {...props} />
  );
}

function Small({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <small className={cn("text-sm font-medium leading-none", className)} {...props} />
  );
}

function Muted({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  );
}

export { H1, H2, H3, H4, P, Blockquote, Lead, Large, Small, Muted };
