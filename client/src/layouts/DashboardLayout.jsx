import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router";

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth);

  console.log(user);

  return (
    <div className="bg-base-200">
      <div className="container mx-auto px-4 lg:grid grid-cols-12 gap-4 space-y-4 lg:space-y-0 my-4">
        <div className="col-span-3">
          <div className="flex items-center p-4 bg-base-100 gap-4 rounded-sm">
            <img
              src={
                user?.photoURL ||
                "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
              }
              alt=""
              className="w-16 h-12 object-cover"
            />
            <div>
              <p className="text-xl font-bold">
                {user?.displayName || "Rakibul Islam"}
              </p>
              <p className="text-gray-400">{user?.email}</p>
            </div>
          </div>
          <div className="flex flex-col p-4 bg-base-100 mt-4 rounded-sm">
            <NavLink to={'/profile'} className={'active:bg-amber-400 px-2 py-1 rounded-xs'}>Profile</NavLink>
            <NavLink to={'/order'} className={'active:bg-amber-400 px-2 py-1 rounded-xs'}>Order</NavLink>
            <NavLink to={'/cart'} className={'active:bg-amber-400 px-2 py-1 rounded-xs'}>Shopping Cart</NavLink>
            <NavLink to={'/favorite'} className={'active:bg-amber-400 px-2 py-1 rounded-xs'}>Favorite</NavLink>
          </div>
        </div>
        <div className="border border-black h-96 col-span-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
