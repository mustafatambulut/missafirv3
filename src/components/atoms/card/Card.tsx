"use client";
import { ICard } from "@/components/atoms/card/types";

const Card = ({ children, cardBodyClassName, ...props }: ICard) => {
  //todo: bunun kullanıldığı yerlerde /organisms/Card componenti kullanılmalı
  return (
    <div className="card" {...props}>
      <div className={`card-body p-0 cursor-default ${cardBodyClassName}`}>
        {children}
      </div>
    </div>
  );
};
export default Card;
