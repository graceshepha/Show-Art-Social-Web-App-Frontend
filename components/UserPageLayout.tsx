import React from 'react';

type UserPageLayoutProps = {
  path: string;
  user: User;
};

type UserPageLayout = (
  props: UserPageLayoutProps
) => React.ReactElement<UserPageLayoutProps>;

const UserPageLayout: UserPageLayout = ({ path, user }) => {
  return (
    <>
      <p>Page for all posts</p>
    </>
  );
};

export default UserPageLayout;
