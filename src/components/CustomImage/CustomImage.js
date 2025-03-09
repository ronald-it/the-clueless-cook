import Image from 'next/image';

export default function CustomImage({ src, alt, ...props }) {
  return <Image {...props} src={src} alt={alt} />;
}
