import Image from 'next/image';

const sizes = {
  small: 40,
  medium: 50,
  large: 60,
};

interface UserImageProps {
  image: string;
  size?: 'small' | 'medium' | 'large';
  borderColor?: string;
}
export const UserImage = ({
  image,
  size = 'small',
  borderColor = 'border',
}: UserImageProps) => {
  return (
    <Image
      src={image}
      alt="User Avatar"
      width={sizes[size]}
      height={sizes[size]}
      className={`border-${borderColor} aspect-square rounded-full border-2`}
    />
  );
};
