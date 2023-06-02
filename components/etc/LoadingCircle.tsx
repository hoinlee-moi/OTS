export default function LoadingCircle() {
  return (
    <svg>
      <circle cx="50%" cy="50%" r="25"></circle>
      <defs>
        <linearGradient id="myGradient">
          <stop offset="0%" stopColor="#b8cbb8" />
          <stop offset="33%" stopColor="#cf6cc9" />
          <stop offset="66%" stopColor="#ee609c" />
          <stop offset="100%" stopColor="#ee609c" />
        </linearGradient>
      </defs>
    </svg>
  );
}
