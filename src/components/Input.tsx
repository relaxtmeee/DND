import React, { FC, useState } from "react";

const Input:FC = ():JSX.Element => {

    const [selectedImage, setSelectedImage] = useState<File | null>();

    const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0])
            URL.createObjectURL(e.target.files[0])
        }
    }

    return (
        <>
            <input 
                type="file"
                name="input-file"
                accept="image/*"
                onChange={imageChange}
            />
            {selectedImage ? null : <span>Выберите фото</span>}
            {selectedImage  && (
                <img src={URL.createObjectURL(selectedImage)} alt="selected image" />
            )}
        </>
    );
};

export default Input;