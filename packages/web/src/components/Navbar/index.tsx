import {
  AppShell,
  Avatar,
  Burger,
  Group,
  Image,
  Menu,
  Title,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, type ReactNode } from "react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { type IconType } from "react-icons";
import { FaArrowRightFromBracket, FaCamera } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";

import classes from "./Navbar.module.css";
import logo from "@/assets/watchtower-logo-white.svg";

interface MenuItem {
  title: string;
  icon: IconType;
  isActive: boolean;
  action: () => void;
}

export default function Navbar({ children }: { children: ReactNode }) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
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

  useEffect(() => {
    if (!isAuthenticated && mobileOpened) toggleMobile();
    if (!isAuthenticated && desktopOpened) toggleDesktop();
  }, [isAuthenticated]);

  const renderMenuItem = (item: MenuItem) => (
    <div key={item.title}>
      <Tooltip label={item.title} color="gray" withArrow position="right">
        <UnstyledButton
          className={
            item.isActive
              ? `${classes.control} ${classes.active}`
              : classes.control
          }
          onClick={() => {
            mobileOpened && toggleMobile();
            item.action();
          }}
        >
          <item.icon className={classes.icon} />
        </UnstyledButton>
      </Tooltip>
    </div>
  );

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 80,
        breakpoint: "sm",
        collapsed: {
          mobile: !mobileOpened,
          desktop: !desktopOpened,
        },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          {isAuthenticated && (
            <>
              <Burger
                opened={mobileOpened}
                onClick={toggleMobile}
                hiddenFrom="sm"
                size="sm"
              />
              <Burger
                opened={desktopOpened}
                onClick={toggleDesktop}
                visibleFrom="sm"
                size="sm"
              />
            </>
          )}
          <Group
            w="100%"
            justify="start"
            style={{ flex: 2, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <Image src={logo} w={35} />
            <Title order={2}>Watchtower</Title>
          </Group>

          <Group justify="end" style={{ flex: 1 }}>
            {isAuthenticated && (
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
