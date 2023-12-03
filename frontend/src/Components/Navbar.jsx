
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Spacer,
  Avatar,
  Image,
  Link,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerHeader,
  VStack,
} from "@chakra-ui/react";

import { HamburgerIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import logo from "../images/Designer.png";
import { logout } from "../Redux/AuthReducer/action";

const Navbar = () => {
  const { isAuth, role, profile } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Flex
      align="center"
      justify="space-between"
      py={4}
      px={{ base: 4, md: 8 }}
      bg="teal.500"
      color="white"
    >
      <Flex align="center">
        <Image src={logo} alt="Apex Recruit Logo" boxSize="50px" m={1} />
        <Heading as="h1" size="md" fontWeight="bold">
          Apex Recruit
        </Heading>
      </Flex>
      <Spacer />

      {/* Desktop Navigation */}
      <Box display={{ base: "none", md: "block" }} mr={10}>
        <Flex align="center">
          <NavLink to="/">
            <Link mx={2}>HOME</Link>
          </NavLink>
          {role && role === "Job Seeker" && (
            <NavLink to="/job">
              <Link mx={2}>JOBS</Link>
            </NavLink>
          )}
          {role && role === "Hiring Manager" && (
            <>
              <NavLink to="/jobpost">
                <Link mx={2}>CREATE</Link>
              </NavLink>
              <NavLink to="/postedjobs">
                <Link mx={2}>POSTS</Link>
              </NavLink>
            </>
          )}
          {role && role === "Job Seeker" && (
            <NavLink to="/applied">
              <Link mx={2}>APPLIED</Link>
            </NavLink>
          )}
          <NavLink to="/about">
            <Link mx={2}>ABOUT</Link>
          </NavLink>
          <Box>
            {!isAuth ? (
              <NavLink to="/login">
                <Button colorScheme="wheat" variant="outline" mx={2}>
                  SIGNUP/LOGIN
                </Button>
              </NavLink>
            ) : (
              <>
                <Button
                  onClick={handleLogout}
                  colorScheme="teal"
                  variant="solid"
                  mx={2}
                >
                  LOGOUT
                </Button>
              </>
            )}
          </Box>
        </Flex>
      </Box>

      {role && (
        <Avatar
          name={role === "Hiring Manager" ? profile.name : profile.username}
          ml={2}
          mr={10}
        />
      )}

      {/* Mobile Navigation */}
      <Box display={{ base: "block", md: "none" }}>
        <IconButton
          aria-label="Open Navigation"
          icon={<HamburgerIcon />}
          onClick={toggleDrawer}
          variant="ghost"
        />
        <Drawer placement="right" onClose={toggleDrawer} isOpen={isDrawerOpen}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Menu</DrawerHeader>
              <DrawerBody>
                <VStack align="start" spacing={4}>
                  <NavLink to="/" onClick={toggleDrawer}>
                    <Link>HOME</Link>
                  </NavLink>
                  {role && role === "Job Seeker" && (
                    <NavLink to="/job" onClick={toggleDrawer}>
                      <Link>JOBS</Link>
                    </NavLink>
                  )}
                  {role && role === "Hiring Manager" && (
                    <>
                      <NavLink to="/jobpost" onClick={toggleDrawer}>
                        <Link>CREATE</Link>
                      </NavLink>
                      <NavLink to="/postedjobs" onClick={toggleDrawer}>
                        <Link>POSTS</Link>
                      </NavLink>
                    </>
                  )}
                  {role && role === "Job Seeker" && (
                    <NavLink to="/applied" onClick={toggleDrawer}>
                      <Link>APPLIED</Link>
                    </NavLink>
                  )}
                  <NavLink to="/about" onClick={toggleDrawer}>
                    <Link>ABOUT</Link>
                  </NavLink>
                  <Box>
                    {!isAuth ? (
                      <NavLink to="/login">
                        <Button colorScheme="teal" variant="solid" mx={2}>
                          SIGNUP/LOGIN
                        </Button>
                      </NavLink>
                    ) : (
                      <>
                        <Button
                          onClick={handleLogout}
                          colorScheme="teal"
                          variant="solid"
                          mx={2}
                        >
                          LOGOUT
                        </Button>
                      </>
                    )}
                  </Box>
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </Box>
    </Flex>
  );
};

export default Navbar;
