import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import FiverrLogo from "./FiverrLogo";
import { IoSearchOutline, IoMenuOutline } from "react-icons/io5";
import { useCookies } from "react-cookie";
import axios from "axios";
import ContextMenu from "./ContextMenu";
import { useStateProvider } from "../context/StateContext";
import { reducerCases } from "../context/constants";
import { GET_USER_INFO, SWITCH_ROLE, LOGOUT } from "../Common/utils/constants"
import logo from '../../logo.png'
import { toast } from "react-toastify";
import LoadingIndicator from "../loadingIndicator";


function Navbar() {
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const router = useLocation();
  const [navFixed, setNavFixed] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [{ showLoginModal, showSignupModal, isSeller, userInfo, authData }, dispatch] =
    useStateProvider();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleLogin = () => {
    navigate("/login")
  };

  const handleSignup = () => {
    navigate("/register")
  };

  const links = [
    { linkName: "Services", handler: "/services", type: "link" },
    { linkName: "Sign in", handler: handleLogin, type: "button" },
    { linkName: "Join", handler: handleSignup, type: "button2" },
  ];


  const handleOrdersNavigate = () => {
    // if (isSeller) navigate("/seller/orders");
    // navigate("/buyer/orders");
    navigate("/orders")
  };

  const switchRole = async () => {
    try {
      setLoading(true)
      const response = await axios.patch(SWITCH_ROLE, null, {
        headers: {
          Authorization: `Bearer ${authData}`,
        }
      });
      setLoading(false)
      toast.success("Role switched")
    } catch (error) {
      setLoading(false)
      toast.error("Error while switching the role")
      console.error("Error changing role:", error);
    }
  }
  const handleModeSwitch = () => {
    switchRole()
    if (isSeller) {
      dispatch({ type: reducerCases.SWITCH_MODE, isSeller: false });
    } else {
      dispatch({ type: reducerCases.SWITCH_MODE, isSeller: true });
    }
  };
  useEffect(() => {
    if (router.pathname === "/") {
      const positionNavbar = () => {
        window.pageYOffset > 0 ? setNavFixed(true) : setNavFixed(false);
      };
      window.addEventListener("scroll", positionNavbar);
      return () => window.removeEventListener("scroll", positionNavbar);
    }
    else {
      setNavFixed(true);
    }
  }, [router.pathname]);

  useEffect(() => {
    if (authData !== null && !userInfo) {
      const getUserInfo = async () => {
        await axios.get(
          GET_USER_INFO,
          {
            headers: {
              Authorization: `Bearer ${authData}`,
            },
          }
        )
          .then((response) => {

            let projectedUserInfo = response.data.data[0];
            if (projectedUserInfo.users.profile_picture) {
              const filePath = projectedUserInfo.users.profile_picture;
              const serverBaseUrl = "http://localhost:4000"; // Update with your server's base URL
              const relativePath = filePath.replace(/\\/g, "/").replace(/^public\//, "");
              const imageUrl = `${serverBaseUrl}/${relativePath}`;
              projectedUserInfo.users.profile_picture = imageUrl
            }
            console.log("projectedUserInfo", projectedUserInfo)
            dispatch({
              type: reducerCases.SET_USER,
              userInfo: projectedUserInfo,
            });
            if (projectedUserInfo.roles.title === 'service_provider') {
              dispatch({
                type: reducerCases.SWITCH_MODE,
                isSeller: true,
              });
            }
            else {
              dispatch({
                type: reducerCases.SWITCH_MODE,
                isSeller: false,
              });
            }
            setIsLoaded(true);
            if (response.data.is_complete === false) {
              navigate("/profile");
            }
          }).catch((error) => {
            if (error.response.status == 401) {
              localStorage.removeItem("token")
            }
          })

      };
      getUserInfo();
    } else {
      setIsLoaded(true);
    }
  }, [userInfo, dispatch, authData, isLoaded, isSeller, searchData]);

  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  useEffect(() => {
    const clickListener = (e) => {
      e.stopPropagation();

      if (isContextMenuVisible) setIsContextMenuVisible(false);
    };
    if (isContextMenuVisible) {
      window.addEventListener("click", clickListener);
    }
    return () => {
      window.removeEventListener("click", clickListener);
    };
  }, [isContextMenuVisible]);

  const ContextMenuData = [
    isSeller &&
    {
      name: "Create Service",
      callback: (e) => {
        isSeller &&
          e.stopPropagation();
        setIsContextMenuVisible(false);
        navigate("/seller/services/create");
      },
    },
    {
      name: "Profile",
      callback: (e) => {
        e.stopPropagation();

        setIsContextMenuVisible(false);
        navigate("/profile");
      },

    },
    {
      name: "Logout",
      callback: (e) => {
        e.stopPropagation();

        setIsContextMenuVisible(false);
        navigate("/logout");
      },
    },
  ];

  return (
    <>
      {loading && <LoadingIndicator/>}
      {isLoaded && (
        <>
          <nav
            className={`w-full px-10 lg:px-20 flex justify-between  items-center py-6  top-0 z-30 transition-all duration-300 ${navFixed
              ? "fixed bg-white border-b border-gray-200"
              : "absolute bg-transparent border-transparent"
              }`}
          >
            <div onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="cursor-pointer">
              <IoMenuOutline className={`block lg:hidden text-4xl ${navFixed ? "text-black" : "text-white"
                } font-medium`} />
            </div>
            <div>
              <Link href="/">
                <img className="w-40 h-12 object-cover" src={logo}></img>
                {/* <FiverrLogo
                  fillColor={!navFixed ? "#ffffff" : "#404145"}
                /> */}
              </Link>
            </div>
            <div
              className={`md:block hidden lg:flex  ${navFixed ? "opacity-100" : "opacity-0"
                }`}
            >
              <input
                type="text"
                placeholder="Search for service by passing category title..."
                className="lg:block py-2.5 px-4 border w-full max-lg:[5rem] max-lg:[10rem] max-xl:w-[20rem] lg:w-[15rem] xl:w-[25rem]"
                value={searchData}
                onChange={(e) => setSearchData(e.target.value)}
              />
              <button
                className="max-lg:hidden bg-gray-900 py-1.5 text-white w-16 lg:flex justify-center items-center"
                onClick={() => {
                  setSearchData("");
                  navigate(`/search?category=${searchData}`);
                }}
              >
                <IoSearchOutline className="fill-white text-white h-6 w-6" />
              </button>
            </div>
            <div className="block lg:hidden">
              {!userInfo ? (
                <ul className="flex gap-10 items-center">
                  <li
                    className={`${navFixed ? "text-black" : "text-white"
                      } md:block hidden font-medium`}
                  ><Link to="/login">Sign In</Link>
                  </li>
                  <li
                    className={`${navFixed ? "text-black" : "text-white"
                      }  font-medium`}
                  >
                    <button
                      className={`border   text-md font-semibold py-1 px-3 rounded-sm ${navFixed
                        ? "border-[#1DBF73] text-[#1DBF73]"
                        : "border-white text-white"
                        } hover:bg-[#1DBF73] hover:text-white hover:border-[#1DBF73] transition-all duration-500`}
                      onClick={() => { navigate("/register") }}
                    >
                      Join
                    </button>
                  </li>
                </ul>
              ) : (
                <ul className="flex gap-10 items-center">
                  <li
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsContextMenuVisible(true);
                    }}
                    title="Profile"
                  >
                    {userInfo?.users.profile_picture ? (
                      <img
                        src={userInfo.users.profile_picture}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="h-12 w-12 flex items-center justify-center rounded-full"
                      />
                    ) : (
                      <div className="bg-purple-500 h-10 w-10 flex items-center justify-center rounded-full relative">
                        <span className="text-xl text-white">
                          {userInfo &&
                            userInfo?.users.email &&
                            userInfo?.users.email.split("")[0].toUpperCase()}
                        </span>
                      </div>
                    )}
                  </li>
                </ul>
              )}
            </div>
            <div className="lg:block hidden">
              {!userInfo ? (
                <ul className="flex gap-10 items-center">
                  {links.map(({ linkName, handler, type }) => {
                    return (
                      <li
                        key={linkName}
                        className={`${navFixed ? "text-black" : "text-white"
                          } font-medium`}
                      >
                        {type === "link" && <Link to={handler}>{linkName}</Link>}
                        {type === "button" && (
                          <button onClick={handler}>{linkName}</button>
                        )}
                        {type === "button2" && (
                          <button
                            onClick={handler}
                            className={`border   text-md font-semibold py-1 px-3 rounded-sm ${navFixed
                              ? "border-[#1DBF73] text-[#1DBF73]"
                              : "border-white text-white"
                              } hover:bg-[#1DBF73] hover:text-white hover:border-[#1DBF73] transition-all duration-500`}
                          >
                            {linkName}
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <ul className="flex gap-10 items-center">
                  <li
                    className={`${navFixed ? "text-black" : "text-white"
                      } md:block hidden font-medium`}
                  >
                    <Link to="/chat">Chat</Link>
                  </li>
                  {isSeller &&
                    <>
                      <li
                        className={`${navFixed ? "text-black" : "text-white"
                          } md:block hidden font-medium`}
                      >
                        <Link to="/myservices"> My Service</Link>
                      </li>
                    </>
                  }
                  {!isSeller &&
                    <li
                      className={`${navFixed ? "text-black" : "text-white"
                        } md:block hidden font-medium`}
                    ><Link to="/services">Services</Link>
                    </li>
                  }
                  <li
                    className="cursor-pointer text-[#1DBF73] font-medium"
                    onClick={handleOrdersNavigate}
                  >
                    Orders
                  </li>

                  {isSeller ? (
                    <li
                      className={`cursor-pointer font-medium ${navFixed ? "text-black" : "text-white"}`}
                      onClick={handleModeSwitch}
                    >
                      Switch To Buyer
                    </li>

                  ) : (
                    <li
                      className={`cursor-pointer font-medium ${navFixed ? "text-black" : "text-white"}`}
                      onClick={handleModeSwitch}
                    >
                      Switch To Seller
                    </li>
                  )}
                  <li
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsContextMenuVisible(true);
                    }}
                    title="Profile"
                  >
                    {userInfo?.users.profile_picture ? (
                      <img
                        src={userInfo.users.profile_picture}
                        alt="Profile"
                        // width={40}
                        // height={40}
                        className="h-12 w-12 flex items-center justify-center rounded-full"
                      />
                    ) : (
                      <div className="bg-purple-500 h-10 w-10 flex items-center justify-center rounded-full relative">
                        <span className="text-xl text-white">
                          {userInfo &&
                            userInfo?.users.email &&
                            userInfo?.users.email.split("")[0].toUpperCase()}
                        </span>
                      </div>
                    )}
                  </li>
                </ul>
              )}
              {isContextMenuVisible && <ContextMenu data={ContextMenuData} />}
            </div>
          </nav>
          {/* Sidebar */}
          {/* {isSidebarOpen ? (
            <div
              className={`block h-full w-[311px] top-0 z-30 transition-all duration-300 ${navFixed || userInfo
                ? "fixed bg-white border-b border-gray-200"
                : "absolute bg-transparent border-transparent"
                }`}>
              <ul className="mt-3 ">
                <li className=""></li>
              </ul>
            </div>) : (
            ""
          )} */}
        </>
      )}
    </>
  );
}

export default Navbar;

