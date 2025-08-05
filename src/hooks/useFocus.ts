import { useState, useCallback } from "react";

export function useFocus() {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const onFocus = useCallback(() => setIsFocused(true), []);
  const onBlur = useCallback(() => setIsFocused(false), []);

  return { isFocused, onFocus, onBlur };
}
