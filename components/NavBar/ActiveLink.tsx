import React, { Children } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link, { LinkProps } from 'next/link';

type ActiveLinkProps = LinkProps & {
  activeClassName: string;
  children: React.ReactElement<HTMLElement>;
};

/**
 * Composant {@link Link} qui donne une classe à l'enfant lorsqu'il est actif.
 *
 * @author Bly, Grâce Schephatia
 */
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
