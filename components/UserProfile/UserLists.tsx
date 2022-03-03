import React from 'react';
import Image from 'next/image';

type UserListsProps = {
  user: User;
};

type UserLists = (props: UserListsProps) => React.ReactElement<UserListsProps>;

/**
 * Composant pour les informations d'un utilisateur pour une liste d'utilisateurs.
 *
 * @author Bly Grâce Schephatia
 */
const UserLists: UserLists = ({ user }) => (
  <li className="flex flex-row">
    <div className="select-none cursor-pointer hover:bg-gray-50 flex flex-1 items-center p-4">
      <div className="flex flex-col w-10 h-10 justify-center items-center mr-4">
        <a href="#" className="block relative">
          <Image
            alt="profil"
            src={user.picture}
            className="mx-auto object-cover rounded-full h-10 w-10"
          />
        </a>
      </div>
      <div className="flex-1 pl-1 mr-16">
        <div className="font-medium dark:text-white">{user.username} </div>
        <div className="text-gray-600 dark:text-gray-200 text-sm">
          {user.email}
        </div>
      </div>
    </div>
  </li>
);

export default UserLists;
