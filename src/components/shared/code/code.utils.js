import * as React from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/plugins/line-numbers/prism-line-numbers';

export function highlightCodeInRef(ref, deps = []) {
  React.useEffect(() => {
    if (ref && ref.current) {
      Prism.highlightAllUnder(ref.current);
    }
  }, [ref, ...deps]);
}
