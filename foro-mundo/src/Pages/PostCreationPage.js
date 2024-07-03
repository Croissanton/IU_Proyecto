import MainLayout from "../layout/MainLayout.js";
import React, { useState, useEffect } from "react";
import { Breadcrumb, Button } from "react-bootstrap";
import ConfirmationModal from "../Components/ConfirmationModal.js";
import { useToast } from "../Context/ToastContext.js";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import Cookies from "universal-cookie";

function PostCreationPage() {
  useEffect(() => {
    document.title = "Crear Post";
  }, []);

  const cookies = new Cookies();
  const cookiesUser = cookies.get("user");

  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'default',
    text: ''
  });

  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleClose = () => {
    setShowModal(false);
    showToast("El post no se ha creado.", "bg-danger");
  };

  const handleConfirm = () => {
    const postId = savePostData();
    setShowModal(false);
    showToast("El post se ha creado correctamente!", "bg-success");
    navigate(`/search/${postId}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    if (formData.category === "default") {
      alert("Por favor, selecciona una categoría antes de continuar.");
      return;
    }

    if (form.reportValidity()) {
      setShowModal(true);
    }
  };

  const savePostData = () => {
    const post = {
      id: uuidv4(),
      topicId: formData.category,
      title: formData.title,
      text: formData.text,
      author: cookiesUser.username,
      date: new Date().toLocaleString(),
      res_num: 0,
      view_num: 0,
      lm_author: "",
      lm_date: "",
      image: selectedFile ? URL.createObjectURL(selectedFile) : null,
    };

    // Guardar en localStorage
    const existingPosts = JSON.parse(localStorage.getItem("posts")) || [];
    existingPosts.push(post);
    localStorage.setItem("posts", JSON.stringify(existingPosts));

    // Actualizar el número de posts en el localStorage para el topic correspondiente
    const existingTopics = JSON.parse(localStorage.getItem("topics")) || [];
    const updatedTopics = existingTopics.map(topic => {
      if (topic.id === parseInt(post.topicId)) {
        return {
          ...topic,
          post_num: (topic.post_num || 0) + 1,
        };
      }
      return topic;
    });

    localStorage.setItem("topics", JSON.stringify(updatedTopics));

    return post.topicId; // Devolver el topicId del post creado
  };

  return (
    <MainLayout>
      <div className="container-xxl my-3">
        <h1>Crear Post</h1>
        <Breadcrumb className="custom-breadcrumb">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Inicio</Breadcrumb.Item>
          <Breadcrumb.Item active>Crear Post</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div style={{ display: "flex" }}>
        <div
          className="m-auto"
          style={{ width: "60%", display: "flex", justifyContent: "flex-end" }}
        >
          <form
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
            className="row col-12 g-3"
          >
            <div className="col-md-6">
              <label htmlFor="title" className="form-label">
                Título
              </label>
              <input
                type="text"
                required
                className="form-control"
                id="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="category" className="form-label">
                Categoría
              </label>
              <select
                name="category"
                id="category"
                required
                className="form-control"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="default" disabled>
                  Selecciona una categoría...
                </option>
                <option value='1'>General</option>
                <option value='2'>Off-topic</option>
                <option value='3'>Tecnología</option>
                <option value='4'>Deportes</option>
                <option value='5'>Cine</option>
              </select>
            </div>
            <div className="col-12">
              <label htmlFor="text" className="form-label">
                Texto
              </label>
              <textarea
                type="text"
                className="form-control input-group-lg"
                required
                rows={7}
                id="text"
                value={formData.text}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="col-12">
              <label htmlFor="image" className="form-label">
                Imagen
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <Button type="submit" className="btn btn-primary">
              Crear
            </Button>
          </form>
        </div>
      </div>
      <ConfirmationModal
        message="¿Estás seguro de que quieres crear este post?"
        show={showModal}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      ></ConfirmationModal>
    </MainLayout>
  );
}

export default PostCreationPage;
