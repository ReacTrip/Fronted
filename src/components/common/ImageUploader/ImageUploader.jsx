import React, { useState } from "react";
import { storage } from "@/firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Button, Box, Typography } from "@mui/material";

const ImageUploader = ({ onImageUploaded }) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // 이미지 선택 핸들러
  const handleImageChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  // 이미지 업로드 핸들러
  const handleUpload = async () => {
    if (!image) return alert("이미지를 선택하세요.");
    setUploading(true);

    try {
      // Firebase Storage 경로 설정
      const storageRef = ref(storage, `images/${image.name}`);
      // 이미지 업로드
      await uploadBytes(storageRef, image);
      // 업로드된 이미지의 URL 가져오기
      const downloadURL = await getDownloadURL(storageRef);

      alert("이미지 업로드 성공!");
      onImageUploaded(downloadURL); // 부모 컴포넌트로 URL 전달
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      alert("이미지 업로드 중 오류가 발생했습니다.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        이미지 업로드
      </Typography>
      <input type="file" onChange={handleImageChange} accept="image/*" />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={uploading}
        sx={{ mt: 2 }}
      >
        {uploading ? "업로드 중..." : "업로드"}
      </Button>
    </Box>
  );
};

export default ImageUploader;
