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
    d: [6, 1, 10, 9],
    e: [7, 8, 0, 8],
    f: [8, 9, 7, 9],
    g: [10, 11, 1, 0],
  };
  return (
    <div>
      {order
        ? imgArr[props].map((v, idx) => {
            return <img src={`/assets/main/main_food_${v}.jpeg`} key={idx} />;
          })
        : imgArr[props].map((v, idx) => {
            return (
              <img
                src={`/assets/main/main_info/main_info_${v}.jpg`}
                key={idx}
              />
            );
          })}
    </div>
  );
}
