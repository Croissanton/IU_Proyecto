import React from "react";
import PostCard from "./PostCard";

const Forums = () => {
  return (
    <div className="container-xxl my-3">
      <h2>Foros</h2>
      <PostCard
        topic={"Foro coche es una mierda"}
        author={"Juan Jaun"}
        date={"18.10.1992"}
        lm_author={"Jose Jose"}
        lm_date={"19.11.2002"}
        res_num={100}
        view_num={1000}
      />
      <PostCard
        topic={"Por que me ha explotado el radiador??"}
        author={"Ignacio19291"}
        date={"10.04.2024"}
        res_num={69}
        view_num={569}
        lm_author={"Mikixd"}
        lm_date={"10.04.2024"}
      />
      <PostCard
        topic={"Mi gato se ha comido a mi abuela :( que hago"}
        author={"Ignacio19291"}
        date={"10.04.2024"}
        res_num={69}
        view_num={569}
        lm_author={"usuarionumeritos1234235345i"}
        lm_date={"10.04.2024"}
      />
      <PostCard
        topic={"Mi abuela se ha comido a mi gato.........!!"}
        author={"percebe43"}
        date={"10.04.2024"}
        res_num={69}
        view_num={569}
        lm_author={"Mikixd"}
        lm_date={"10.04.2024"}
      />
      <PostCard
        topic={"La gasolina casi a 2€"}
        author={"Ignacio19291"}
        date={"10.04.2024"}
        res_num={69}
        view_num={569}
        lm_author={"Mikixd"}
        lm_date={"10.04.2024"}
      />
    </div>
  );
};

export default Forums;
