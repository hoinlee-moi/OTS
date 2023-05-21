import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type props = {
  type: string;
  placeholder: string;
  name: string;
  maxLength?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void | Promise<void>;
  checkState: boolean;
};

export default function InputWithIcon({
  type,
  placeholder,
  name,
  onChange,
  onBlur,
  checkState,
  maxLength,
}: props) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        maxLength={maxLength}
        autoComplete="off"
        onChange={onChange}
        onBlur={onBlur}
      />
      {checkState && (
        <span>
          <FontAwesomeIcon icon={faCircleXmark} />
        </span>
      )}
    </div>
  );
}
