import {
  AppShell,
  Avatar,
  Burger,
  Center,
  Group,
  Image,
  Menu,
  Text,
  Title,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { type ReactNode } from "react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { type IconType } from "react-icons";
import { FaArrowRightFromBracket, FaCamera } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";

import logo from "@/assets/watchtower-logo-white.svg";
import classes from "./Navbar.module.css";

interface MenuItem {
  title: string;
  icon: IconType;
  isActive: boolean;
  action: () => void;
}

export default function Navbar({ children }: { children: ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();
  const location = useLocation();
  const navigate = useNavigate();

  const isCurrentRoute = (route: string) => location.pathname.includes(route);

  const menuItems: MenuItem[] = [
    {
      title: "Cameras",
      icon: FaCamera,
      isActive: isCurrentRoute("cameras"),
      action: () => navigate("/cameras"),
    },
  ];

  const renderMenuItem = (item: MenuItem) => (
    <UnstyledButton
      key={item.title}
      className={
        item.isActive ? `${classes.control} ${classes.active}` : classes.control
      }
      onClick={() => {
        opened && toggle();
        item.action();
      }}
    >
      <Center>
        <item.icon className={classes.icon} />
        <Text ml={10} size="md">
          {item.title}
        </Text>
      </Center>
    </UnstyledButton>
  );

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 180,
        breakpoint: "sm",
        collapsed: {
          desktop: true,
          mobile: !opened,
        },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          {isAuthenticated && (
            <>
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
              />
            </>
          )}
          <Group w="100%" justify="space-between" style={{ flex: 3 }}>
            <Group
              style={{ flex: 1, cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              <Image src={logo} w={35} />
              <Title order={2}>Watchtower</Title>
            </Group>
          </Group>

          <Group justify="end" style={{ flex: 1 }}>
            {isAuthenticated && (
              <>
                <Group mr="lg" gap={0} visibleFrom="sm">
                  {menuItems.map(renderMenuItem)}
                </Group>

                <Menu trigger="hover">
                  <Menu.Target>
                    <Avatar
                      style={{ cursor: "pointer" }}
                      alt="User profile image"
                    />
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item
                      leftSection={<FaArrowRightFromBracket />}
                      onClick={() => {
                        signOut();
                        navigate("/");
                      }}
                    >
                      Logout
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </>
            )}
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        {isAuthenticated && menuItems.map(renderMenuItem)}
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
