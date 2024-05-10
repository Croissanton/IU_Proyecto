import MainLayout from "../layout/MainLayout.js";
import React from 'react';
import { useEffect } from "react";

function PostCreationPage() {
  useEffect(() => {
    document.title = "Crear Post";
  }, []);

  return (
    <MainLayout>
      <h1>Crear Post</h1>
      <div style={{ display: "flex"}}>
      <div className="m-auto" style={{ width: "60%", display:"flex", justifyContent:"flex-end"}}>
        <form class="row col-12 g-3">
          <div class="col-md-6">
            <label for="inputTitulo" class="form-label">Título</label>
            <input type="text" required class="form-control" id="inputTitulo"></input>
          </div>
          <div class="col-md-6">
            <label for="inputCategoria" class="form-label">Categoría</label>
            <select name="categoria" id="categoria" required class="form-control">
                <option value ="" disabled selected>Selecciona una categoría...</option>
                <option value="general">General</option>
                <option value="coches">Coches</option>
                <option value="musica">Música</option>
                <option value="plantas">Plantas</option>
            </select>
          </div>
          <div class="col-12">
            <label for="inputTexto" class="form-label">Texto</label>
            <textarea type="text" class="form-control input-group-lg" required placeholder="Escriba acerca del tema..." rows={7} id="inputTexto" ></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Crear</button>
          </form>
      </div>
      </div>

    </MainLayout>
  );
}

export default PostCreationPage;