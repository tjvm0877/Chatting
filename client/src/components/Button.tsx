import './Button.css';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className={'Button'}>
      {text}
    </button>
  );
};

export default Button;
