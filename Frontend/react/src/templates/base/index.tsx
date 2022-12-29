/* eslint-disable react-hooks/exhaustive-deps */
import * as Styled from "./styles";
import { Menu } from "components/common/menu";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

type Props = {
  children: React.ReactNode;
};

export const Base = ({ children }: Props) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status]);
  return (
    <Styled.Wrapper>
      <Menu />
      <Styled.Container>{children}</Styled.Container>
    </Styled.Wrapper>
  );
};
