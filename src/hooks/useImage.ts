import { useEffect, useState } from 'react';

export enum Status {
  loading,
  success,
  failed,
}

const defaultState: {
  src: undefined | string;
  status: Status;
} = { src: undefined, status: Status.loading };

export default function useImage(url: string, crossOrigin?: string): [undefined | string, Status] {
  const [image, setImage] = useState<typeof defaultState>(defaultState);

  useEffect(() => {
    if (!url) return;
    const img = document.createElement('img');
    const onLoad = () => setImage({ src: img.src, status: Status.success });
    const onError = () => setImage({ src: undefined, status: Status.failed });

    img.addEventListener('load', onLoad);
    img.addEventListener('error', onError);

    if (crossOrigin) img.crossOrigin = crossOrigin;
    img.src = url;

    return () => {
      img.removeEventListener('load', onLoad);
      img.removeEventListener('error', onError);
      setImage(defaultState);
    };
  }, [url, crossOrigin]);

  return [image.src, image.status];
}
