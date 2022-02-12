import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import Link, { LinkProps } from 'next/link'
import React, { Children}  from 'react'

/**
 * NavBar ActiveLink attribute set up
 * 
 * @author Bly, Grâce Schephatia
 * @
 */

interface ActiveLinkProps extends React.PropsWithChildren<LinkProps>{
    activeClassName: string,
    children: JSX.Element[] | JSX.Element
}

const ActiveLink = ({children, activeClassName, ...props} : ActiveLinkProps) => {
  const { asPath } = useRouter();
  const child = Children.only(children);
  const childClassName = child.props.className || '';

  const className =
    asPath === props.href || asPath === props.as
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName;

  return (
    <Link {...props}>
      {React.cloneElement(child as React.ReactElement<any>, {
        className: className || null,
      })}
    </Link>
  )
}

ActiveLink.propTypes = {
  activeClassName: PropTypes.string.isRequired,
}

export default ActiveLink