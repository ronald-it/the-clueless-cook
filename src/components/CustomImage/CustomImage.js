import Image from 'next/image';

export default function CustomImage({ src, alt, ...props }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const fullPath = `${basePath}${src.startsWith('/') ? '' : '/'}${src}`;
  return <Image {...props} src={fullPath} alt={alt} />;
}
