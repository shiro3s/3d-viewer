import {useRef} from "react";

export const useViewer = () => {
  const viewerRef = useRef<HTMLDivElement>(null);

  return {
    viewerRef
  }
}
