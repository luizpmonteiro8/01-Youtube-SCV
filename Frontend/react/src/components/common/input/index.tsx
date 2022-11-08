import * as Styled from "./styles";
type Props = {
  label: string;
  id: string;
  type?: string;
  name: string;
  placeholder: string;
  width: string;
  disabled?: boolean;
  value: string | number | undefined;
  onChange?: (e: any) => void;
  error?: string;
};

export const Input = ({
  label,
  id,
  type = "text",
  name,
  placeholder,
  width,
  disabled = false,
  value,
  onChange,
  error,
}: Props) => {
  return (
    <Styled.Wrapper>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        style={error ? { width, border: "2px solid red" } : { width }}
        onChange={onChange}
      ></input>
      <small>{error}</small>
    </Styled.Wrapper>
  );
};
