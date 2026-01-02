import "./EnterButton.css";

interface EnterButtonProps {
  onClick?: () => void;
}

const EnterButton: React.FC<EnterButtonProps> = ({ onClick }) => {
  return (
    <button className="enter-button" onClick={onClick}>
      ENTER
    </button>
  );
};

export default EnterButton;
