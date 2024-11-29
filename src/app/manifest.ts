import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'WST Clock',
    short_name: 'WST',
    description: 'showwing the current time in WST',
    start_url: '/',
    display: 'standalone',
    theme_color: '#00caaf',
    background_color: '#feffff',
    icons: [
      {
        src: '../../public/192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '../../public/512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
