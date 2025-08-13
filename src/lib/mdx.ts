import * as React from "react";
import * as runtime from "react/jsx-runtime";

export function useMDXComponent(code: string) {
  return React.useMemo(() => {
    const fn = new Function("React", ...Object.keys(runtime), `${code}; return MDXContent;`);
    return fn(React, ...Object.values(runtime));
  }, [code]);
}
