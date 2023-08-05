'use client'
import Image from "next/image";

type props = {
  props: string;
  order: boolean;
};
type imgArr = {
  [key: string]: number[];
};
export default function ImageArray({ props, order }: props) {
  const imgArr: imgArr = {
    a: [0, 1, 2, 0],
    b: [3, 4, 10, 4],
    c: [5, 6, 9, 6],
    d: [1, 1, 10, 9],
    e: [2, 8, 0, 8],
    f: [4, 9, 7, 9],
    g: [5, 11, 1, 0],
  };
  return (
    <div>
      {order
        ? imgArr[props].map((v, idx) => {
            return (
              <Image
                src={`/assets/main/main_food_${v}.jpeg`}
                alt="food"
                key={idx}
                width={255}
                height={435}
                priority
                placeholder="blur"
                blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8fPl8PQAH7AL2dy8SSgAAAABJRU5ErkJggg=="
              />
            );
          })
        : imgArr[props].map((v, idx) => {
            return (
              <Image
                src={`/assets/main/main_info/main_info_${v}.jpg`}
                alt="food-information"
                key={idx}
                width={255}
                height={435}
                priority
                placeholder="blur"
                blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8fPl8PQAH7AL2dy8SSgAAAABJRU5ErkJggg=="
              />
            );
          })}
    </div>
  );
}
