import useImage, { Status } from '../../hooks/useImage';
import defaultImg from '../../assets/error.png';
import styled from 'styled-components';

interface ImageProps {
  imageKey: string;
  alt: string;
  imageUrl: string;
  crossOrigin?: 'anonymous' | 'use-credentials' | '';
}

const Img = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const Spinner = styled.img`
  object-fit: cover;
  width: 80%;
  height: 80%;
`;

const ErrorImg = styled.img`
  object-fit: cover;
  width: 60%;
  height: 60%;
`;

const Image = ({ imageKey, alt, imageUrl, crossOrigin }: ImageProps) => {
  const [src, status] = useImage(imageUrl, crossOrigin);

  if (imageUrl !== null && status === Status.loading) {
    return <Spinner src="src/assets/spinner.gif" />;
  }

  return (status === Status.failed || imageUrl === null) ? (
    <ErrorImg src={defaultImg} />
  ) : (
    <Img src={src} crossOrigin={crossOrigin} key={imageKey} alt={alt} />
  );
};

export default Image;
