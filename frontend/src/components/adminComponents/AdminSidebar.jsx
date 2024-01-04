import React from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";
import { FiSettings, FiMenu } from "react-icons/fi";
import { FaUsers, FaRegComment } from "react-icons/fa";
import { SiSocialblade } from "react-icons/si";
import { CiSignpostDuo1 } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAdminLogoutMutation } from "../../slices/adminApiSlice";
import { adminLogout } from "../../slices/adminAuthSlice";
import { Link } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";

const LinkItems = [
  
  { name: "User Management", icon: FaUsers, url: "/admin/" },
  { name: "Post management", icon: CiSignpostDuo1, url: "/admin/postManagement" },
  { name: "Comment Management", icon: FaRegComment, url: "/admin/commentManagement" },
  // { name: "Settings", icon: FiSettings, url: "/admin/" },
];

export default function AdminSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose()}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApiCall] = useAdminLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(adminLogout());
      navigate("/admin/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <img
          src="../../../images/Moments.png"
          alt=""
          style={{ backgroundColor: "black", height: "70px" }}
        />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          onClick={() => {
            navigate(link.url);
          }}
          icon={link.icon}
        >
          <Link as={Link} to={link.url}>
            {link.name}
          </Link>
        </NavItem>
      ))}
      <Box>
        <NavItem onClick={logoutHandler} icon={RiLogoutCircleRLine}>
          <Link as={Link} to="/logout">
            Logout
          </Link>
        </NavItem>
      </Box>
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-center"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <img
        src="../../../images/Moments.png"
        alt=""
        style={{ height: "70px" }}
      />
    </Flex>
  );
};