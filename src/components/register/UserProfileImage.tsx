import { styled } from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';

export const UserProfileImage = ({ onImageSelect }: { onImageSelect: (file: File | null) => void }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedImage(file);
    onImageSelect(file);
  };

  return (
    <UserImage>
      {selectedImage ? (
        <img src={URL.createObjectURL(selectedImage)} alt="profile-image" className="profile-image" />
      ) : (
        <UserIcon />
      )}
      <label htmlFor="fileInput">
        <AiFillPlusCircle />
      </label>
      <input
        id="fileInput"
        className="test"
        type="file"
        accept="image/jpg,image/png,image/jpeg"
        name="profileImage"
        onChange={handleImageChange}
      />
    </UserImage>
  );
};

const UserImage = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  margin-bottom: 12px;

  input {
    display: none;
  }

  .profile-image {
    border: 1px solid ${(props) => props.theme.color.GRAY};
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: contain;
  }

  label {
    font-size: 40px;
    color: ${(props) => props.theme.color.YELLOW};
    cursor: pointer;
    transition: all 0.2s;

    position: absolute;
    bottom: 0px;
    right: 239px;

    &:hover {
      color: #ffc800;
    }
  }
`;

const UserIcon = styled(FaUserCircle)`
  width: 150px;
  height: 150px;
  color: #c0c0c0;
`;
