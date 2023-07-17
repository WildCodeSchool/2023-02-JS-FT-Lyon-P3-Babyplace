import { useUserContext } from "../../contexts/UserContext";
import instance from "../../services/APIService";

export default function FileUploadForm() {
  const { user } = useUserContext();

  const handleImageUpload = async (event) => {
    const imageFile = event.target.files[0];

    const formData = new FormData();
    formData.append("image_url", imageFile);
    formData.append("pro_id", `${user.id}`);

    try {
      const response = await instance.post(`/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const imageUrl = response.data;

      console.info(imageUrl);
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };
  return (
    <form>
      <input type="file" onChange={handleImageUpload} />
    </form>
  );
}
