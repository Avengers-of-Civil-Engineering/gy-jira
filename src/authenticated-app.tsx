// import { useAuth } from "context/auth-context"
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { ProjectListScreen } from "screens/project-list";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";
import { ProjectPopover } from "components/project-popover";

export const AuthenticatedApp = () => {
  // const {logout} = useAuth()

  return (
    <Container>
      <PageHeader />
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
        <ProjectPopover />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button type={"link"}>登出</Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={"link"}>hi, 用户名</Button>
    </Dropdown>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100%;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const Main = styled.main`
  display: flex;
  overflow: hidden;
`;
