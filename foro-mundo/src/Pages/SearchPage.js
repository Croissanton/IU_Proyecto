import React from "react";
import MainLayout from "../layout/MainLayout.js";
import PostCard from "../Components/PostCard.js";
import IndexSelector from "../Components/IndexSelector.js";
import { Breadcrumb } from "react-bootstrap";
import BackButton from "../Components/BackButton.js";


function SearchPage() {
  return (
    <MainLayout>
        <div className="container-xxl my-3">
        
          <Breadcrumb>
          <Breadcrumb.Item href="../#">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item active>Foro</Breadcrumb.Item> {/* Aquí debería ir el nombre del topico */}
          </Breadcrumb>
        </div>
        <BackButton />
        <div className="container-xxl my-3">
            <PostCard
                titulo={"buen foro :D"}
                text={"Este es un foro muy bueno"}
                author={"Juan Jaun"}
                date={"18.10.1992"}
                lm_author={"Jose Jose"}
                lm_date={"19.04.2024"}
                res_num={100}
                view_num={1000}
            />
            <PostCard
                titulo={"Por que me ha explotado el radiador??"}
                text={"El radiador de mi casa ha explotado y no se que hacer"}
                author={"Ignacio19291"}
                date={"05.02.2023"}
                res_num={69}
                view_num={552}
                lm_author={"Mikixd"}
                lm_date={"15.04.2024"}
            />
            <PostCard
                titulo={"Mi gato se ha comido a mi abuela :( que hago"}
                text={"Mi gato se ha comido a mi abuela y no se que hacer :("}
                author={"Ignacio19291"}
                date={"10.04.2024"}
                res_num={32}
                view_num={543}
                lm_author={"usuarionumeritos1234235345i"}
                lm_date={"11.04.2024"}
            />
            <PostCard
                titulo={"Mi abuela se ha comido a mi gato.........!!"}
                text={"Mi abuela se ha comido a mi gato y no se que hacer :'("}
                author={"percebe43"}
                date={"01.04.2024"}
                res_num={63}
                view_num={764}
                lm_author={"wawawaaaa"}
                lm_date={"03.04.2024"}
            />
            <PostCard
                titulo={"La gasolina casi a 2€"}
                text={"La gasolina esta a punto de llegar a los 2€, que opinan?"}
                author={"Ignacio19291"}
                date={"12.03.2024"}
                res_num={52}
                view_num={430}
                lm_author={"Mikixd"}
                lm_date={"02.04.2024"}
            />
            <PostCard
                titulo={"no se que poner aqui"}
                text={"no se que poner aqui"}
                author={"percebe43"}
                date={"01.04.2024"}
                res_num={63}
                view_num={764}
                lm_author={"lentejas55"}
                lm_date={"01.04.2024"}
            />
    </div>
      <IndexSelector />
    </MainLayout>
  );
}

export default SearchPage;