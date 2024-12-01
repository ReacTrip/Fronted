import { useState, useRef } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/firebaseConfig";


export const useModal = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return { open, handleOpen, handleClose };
};


export const useImageUpload = (initialImages = [], onChangeImages) => {
    const [images, setImages] = useState(initialImages);
    const [isLoading, setIsLoading] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = async (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            setIsLoading(true);
            try {
                const urls = [];
                for (const file of files) {
                    const storageRef = ref(storage, `images/${file.name}`);
                    await uploadBytes(storageRef, file);
                    const url = await getDownloadURL(storageRef);
                    urls.push(url);
                }
                const newImages = images.concat(urls);
                setImages(newImages); // 내부 상태 업데이트
                if (onChangeImages) {
                    onChangeImages(newImages); // 상위 컴포넌트에 전달
                }
            } catch (error) {
                console.error("파일 업로드 중 오류 발생:", error);
            } finally {
                setIsLoading(false);
                setIsComplete(true);
                setTimeout(() => setIsComplete(false), 2500);
            }
        }
    };

    const handleDeleteImage = (index) => {
        const newImages = images.filter((_, idx) => idx !== index);
        setImages(newImages); // 내부 상태 업데이트
        if (onChangeImages) {
            onChangeImages(newImages); // 상위 컴포넌트에 전달
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return {
        isLoading,
        isComplete,
        fileInputRef,
        handleFileChange,
        triggerFileInput,
    };
};


export const useCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleIndexChange = (index) => setCurrentIndex(index);

    const resetIndex = () => setCurrentIndex(0);

    return { currentIndex, handleIndexChange, resetIndex };
};
