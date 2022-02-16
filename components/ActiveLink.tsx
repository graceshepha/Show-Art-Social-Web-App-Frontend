import { useRouter } from 'next/router';
import Link, { LinkProps } from 'next/link';
import React, { Children } from 'react';
import { NextPage } from 'next';

/**
 * NavBar ActiveLink attribute set up
 *
 * @author Bly, Grâce Schephatia
 * @
 */

interface ActiveLinkProps extends React.PropsWithChildren<LinkProps> {
  activeClassName: string;
  children: React.ReactElement<HTMLElement>;
}

const ActiveLink: NextPage<ActiveLinkProps> = ({
  children,
  activeClassName,
  ...props
}) => {
  const { asPath } = useRouter();
  const child = Children.only(children);
  const childClassName = child.props.className || '';

  const className =
    asPath === props.href || asPath === props.as
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName;

  return (
    <Link {...props}>
      {React.isValidElement<HTMLElement>(child) &&
        React.cloneElement(child, {
          className: className || null,
        })}
    </Link>
  );
};

export default ActiveLink;
