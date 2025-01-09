import React from "react";

function Avatar({ user }) {
  return (
    <div className="flex flex-col items-center p-10">
      <img className="w-32 h-32 rounded-full " src={user.photoURL} alt="" />
      <p className=" font-bold text-xl">Hello, {user.displayName} </p>
    </div>
  );
}

export default Avatar;
