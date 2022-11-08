import { useEffect, useState } from "react";
import * as Styled from "./styles";
type Props = { message: { text: string } };

export const SnackBar = ({ message }: Props) => {
  const [showMessage, setShow] = useState(false);

  useEffect(() => {
    if (message.text != "") {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  }, [message]);

  return (
    <Styled.Wrapper>
      {message && (
        <div id="snackbar" className={showMessage ? "show" : ""}>
          {message.text}
        </div>
      )}
    </Styled.Wrapper>
  );
};
