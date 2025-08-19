type ButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  label: string;
  className?: string;
};

export default function Button(props: ButtonProps) {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={`text-gray-800 bg-gray-300 rounded-xl cursor-pointer ${props.className ?? ''}`}
    >
      {props.label}
    </button>
  );
}
