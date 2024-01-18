import React, { useEffect, useState } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from "react-icons/fi";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoIosSave } from "react-icons/io";
import { GiShadowFollower } from "react-icons/gi";
import { TiMessages } from "react-icons/ti";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Button } from "react-bootstrap";
import { useLogoutMutation } from "../../slices/userApiSlice";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import axios from "axios";
import { useSocket } from "../../context/Context.jsx";



const SidebarContent = ({ onClose, ...rest }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useSocket();
  const { userInfo } = useSelector((state) => state.auth);
  const [notificationCount, setNotificationCount] = useState("");
  const [requestCount, setRequestCount] = useState("");
  const [messageCount, setMessageCount] = useState("");

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/users/getNumbers?_id=${userInfo._id}`);
      console.log(res.data);
      setNotificationCount(res.data.length);
      setRequestCount(res.data.requestLength);
      setMessageCount(res.data.unReadCount);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.emit("join notification", userInfo._id);
      socket.on("get notification", () => {   
        fetchData();
      });      
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.emit("join notification", userInfo._id);
      socket.on("get request", (get) => {   
        console.log(get);
        fetchData();
      });
      
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.emit("join notification", userInfo._id);
      socket.on("get messageCount", () => {  
        
        fetchData();
      });
      
    }
  }, [socket]);

useEffect(()=>{
  fetchData()
 
},[])

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  
  const handleCreate = () => {
    navigate(`/room/${Date.now()}`);
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
        <NavItem key={link.name} icon={link.icon}>
          <Link as={Link} to={link.url}>
            {link.name}
          </Link>
        </NavItem>
      ))}
      <Box>
        <NavItem icon={TiMessages}>
          <Link as={Link} to="/messages/6571e0186f0928fc40e4b926#!">
            Messages
          </Link>
          {messageCount ? (
            <div className="pt-1">
              <span className="badge bg-danger rounded-pill float-end">
                {messageCount}
              </span>
            </div>
          ) : null}
        </NavItem>
      </Box>
      <Box>
        <NavItem icon={IoIosNotificationsOutline}>
          <Link as={Link} to="/request">
            Friend Requests
          </Link>
          {requestCount ? (
            <div className="pt-1">
              <span className="badge bg-danger rounded-pill float-end">
                {requestCount}
              </span>
            </div>
          ) : null}
        </NavItem>
      </Box>
      <Box>
        <NavItem icon={IoIosNotificationsOutline}>
          <Link as={Link} to="/notification">
            Notification
          </Link>
          {notificationCount ? (
            <div className="pt-1">
              <span className="badge bg-danger rounded-pill float-end">
                {notificationCount}
              </span>
            </div>
          ) : null}
        </NavItem>
      </Box>
      <Box>
        <NavItem icon={RiLogoutCircleRLine} onClick={handleCreate}>
          <Link>Video Call</Link>
        </NavItem>
      </Box>
      <Box>
        <NavItem icon={RiLogoutCircleRLine} onClick={logoutHandler}>
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

export default function UserSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userInfo } = useSelector((state) => state.auth);
  
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
const LinkItems = [
  { name: "Home", icon: FiHome, url: "/" },
  { name: "Profile", icon: CgProfile, url: "/fullProfile" },
  { name: "Saved post", icon: IoIosSave, url: "/savedPost" },

 
];
