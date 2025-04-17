import { useState, useRef, useEffect } from "react";
import { MdAccountCircle } from "react-icons/md";
import { Badge } from "antd";
import { Link } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const dropdownVariants = {
  hidden: {
    scaleY: 0,
    opacity: 0,
    transformOrigin: "top"
  },
  visible: {
    scaleY: 1,
    opacity: 1,
    transformOrigin: "top",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: {
    scaleY: 0,
    opacity: 0,
    transformOrigin: "top",
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

const AccountButton = ({ user, handleSignOut }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const containerRef = useRef(null);

  // Toggle dropdown state
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    // Cleanup on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <>
      {user ? (
        // If the user is logged in: show a dropdown menu
        <div ref={containerRef} className="relative inline-block">
          <button
            className="hidden lg:block cursor-pointer focus:outline-none"
            onClick={toggleDropdown}
          >
            <Badge count={0} offset={[0, -5]} size="small">
              <MdAccountCircle className="text-xl text-white" />
            </Badge>
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                className="absolute right-0 mt-2 w-48 rounded-xs shadow-lg z-20 overflow-hidden bg-base-300"
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-base-400 hover:text-white"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/cart"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-base-400 hover:text-white"
                  onClick={() => setDropdownOpen(false)}
                >
                  Cart
                </Link>
                <Link
                  to="/wishlist"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-base-400 hover:text-white"
                  onClick={() => setDropdownOpen(false)}
                >
                  Wishlist
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-base-400 hover:text-white"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        // If the user is not logged in: show a link to the sign in page
        <Link to="/auth/sign-in">
          <button className="hidden lg:block cursor-pointer">
            <Badge count={0} offset={[0, -5]} size="small">
              <MdAccountCircle className="text-xl text-white" />
            </Badge>
          </button>
        </Link>
      )}
    </>
  );
};

export default AccountButton;
