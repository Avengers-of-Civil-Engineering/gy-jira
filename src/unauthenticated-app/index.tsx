import styled from "@emotion/styled";
import { Button, Card, Divider } from "antd";
import { Login } from "./login";
import { Register } from "./register";
import logo from "assets/logo.svg";
import left from "assets/left.svg";
import right from "assets/right.svg";
import { useDocumentTitle } from "utils";
import { useState } from "react";
import { ErrorBox } from "components/lib";

export default function UnauthenticatedApp() {
  useDocumentTitle("请登陆注册以继续");

  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const title = isRegister ? "请注册" : "请登陆";

  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        <Title>{title}</Title>
        {error ? <ErrorBox error={error} /> : null}
        {isRegister ? (
          <Register onSuccess={setIsRegister} onError={setError} />
        ) : (
          <Login onError={setError} />
        )}
        <Divider />
        <Button type={"link"} onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "已经有账号了？直接登录" : "没有账号？注册新账号"}
        </Button>
      </ShadowCard>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-image: url(${left}), url(${right});
  background-position: left bottom, right bottom;
`;
