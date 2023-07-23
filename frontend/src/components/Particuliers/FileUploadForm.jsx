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

  /* 
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("avatar", inputRef.current.files[0]);

    instance
      .post("/ma route pour envoyer mon image/", formData)
      .then((res) => {
        if (res.status === 200) {
          notifySuccess("Votre image à bien été enregistrée");
        } else {
          notifyFail();
        }
      })
      .catch((err) => console.error(err));
    setOpenModalUpload(false);
  }; */
  return (
    <form>
      <input type="file" onChange={handleImageUpload} />
    </form>
  );
}
