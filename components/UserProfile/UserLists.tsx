import React from "react";
import Image from "next/image";

type UserListsProps = {
    user: User;
};

type UserLists = (
    props: UserListsProps
) => React.ReactElement<UserListsProps>;

const UserLists: UserLists = ({ user }) => (
    <>
        <div className="flex flex-col container max-w-md mt-10 mx-auto w-full items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow">
            <ul className="flex flex-col divide-y w-full">
                <li className="flex flex-row">
                    <div className="select-none cursor-pointer hover:bg-gray-50 flex flex-1 items-center p-4">
                        <div className="flex flex-col w-10 h-10 justify-center items-center mr-4">
                            <a href="#" className="block relative">
                                <Image alt="profil" src={user.picture} className="mx-auto object-cover rounded-full h-10 w-10" />
                            </a>
                        </div>
                        <div className="flex-1 pl-1 mr-16">
                            <div className="font-medium dark:text-white">{user.username} </div>
                            <div className="text-gray-600 dark:text-gray-200 text-sm">{user.email}</div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

    </>
);

export default UserLists;