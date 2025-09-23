import { useState } from "react";
import { Camera } from "lucide-react";
import styles from "./ImageUpload.module.css";

const ImageUpload = ({ onFileSelect }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onFileSelect(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        id="avatar"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
     <label htmlFor="avatar" className={styles.avatar_label}>
        <div className={styles.upload_btn}>
          {preview ? (
            <img
              src={preview}
              alt="avatar preview"
              className={styles.preview_img}
            />
          ) : (
            <Camera size={20} />
          )}
        </div>
        <span className={styles.upload_text}>Upload image</span>
      </label>
    </div>
  );
};

export default ImageUpload;
