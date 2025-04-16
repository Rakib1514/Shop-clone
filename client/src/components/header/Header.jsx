import { Badge } from "antd";
import { useState } from "react";
import { FaCartArrowDown, FaHeart, FaSearch } from "react-icons/fa";
import { GoArrowSwitch } from "react-icons/go";
import { IoMdMenu } from "react-icons/io";
import { MdAccountCircle, MdOutlineLogout } from "react-icons/md";
import brandLogo from "../../assets/brandLogo.svg";
import Search from "./Search";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router";
import PromoBarTop from "./PromoBarTop";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, userSignOut } from "../../redux/authSlice";
import AccountButton from "./AccountButton";

const Header = () => {
  const [searchToggle, setSearchToggle] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleSignOut = async () => {
    try {
      dispatch(setLoading(true));

      const result = await userSignOut();
      console.log(result);
    } catch (error) {
      console.log(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <div className="hidden lg:block">
        <PromoBarTop />
      </div>
      <header className="bg-secondary sticky top-0">
        <nav className="container mx-auto py-3 px-4 grid grid-cols-3 ">
          <button className="text-white text-4xl lg:hidden">
            <IoMdMenu />
          </button>
          <Link to={"/"}>
            <img
              src={brandLogo}
              alt="Ryans Brand Logo"
              className="h-6 mx-auto lg:mx-0"
            />
          </Link>

          <div className="hidden lg:block">
            <Search />
          </div>

          <div className="flex items-center gap-2 place-content-end">
            <div className="hidden lg:flex mr-6">
              <button className="text-yellow-500 font-semibold border-2 border-primary px-2 py-1 tracking-wide rounded-md hover:bg-gradient-to-r from-g1 via-g2 to-g1 hover:text-white uppercase">
                System Builder
              </button>
            </div>
            <button
              onClick={() => setSearchToggle(!searchToggle)}
              className="lg:hidden"
            >
              <Badge>
                <FaSearch className="text-xl text-white" />
              </Badge>
            </button>
            <button>
              <Badge count={5} offset={[0, -5]} size="small">
                <FaCartArrowDown className="text-xl text-white" />
              </Badge>
            </button>
            <button>
              <Badge count={0} offset={[0, -5]} size="small">
                <FaHeart className="text-xl text-white" />
              </Badge>
            </button>
            <button className="hidden lg:block">
              <Badge count={0} offset={[0, -5]} size="small">
                <GoArrowSwitch className="text-xl text-white" />
              </Badge>
            </button>
            <AccountButton user={user} handleSignOut={handleSignOut}/>
            {user && (
              <button
                onClick={handleSignOut}
                className="lg:hidden cursor-pointer"
              >
                <Badge count={0} offset={[0, -5]} size="small">
                  <MdOutlineLogout className="text-xl text-white" />
                </Badge>
              </button>
            )}
          </div>
        </nav>
        <AnimatePresence>
          {searchToggle && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.15 }}
              className="px-4 absolute w-full bg-secondary top-full z-10"
            >
              <div className="py-4">
                <Search />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <div>Category showing</div>
    </>
  );
};

export default Header;
