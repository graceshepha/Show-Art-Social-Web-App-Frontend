import React from 'react';
import { NextPage } from 'next';
import classNames from 'classnames';

interface TextFieldProps extends React.HTMLAttributes<HTMLInputElement> {
  size?: 'lg' | 'md' | 'sm' | 'xs';
  variant?: 'bordered' | 'ghost';
  accent?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';
  placeholder?: string;
  helper?: string;
  rounded?: boolean;
}

const classes = ({ size, variant, accent, rounded }: TextFieldProps) => {
  return classNames({
    input: true,
    [`input-${size}`]: !!size && size !== 'md',
    [`input-${variant}`]: !!variant,
    [`input-${accent}`]: !!accent,
    'rounded-full': !!rounded,
  });
};

type ChildProps = React.HTMLAttributes<HTMLElement>;

const TextField: NextPage<TextFieldProps> = ({ children, ...props }) => {
  // child
  const child = children
    ? children instanceof String
      ? React.Children.only(children)
      : children
    : '';

  // child classes
  const strClasses = React.isValidElement<ChildProps>(child)
    ? child.props.className || ''
    : '';
  const childClassNames = strClasses.split(/\s+/);
  childClassNames.push('label-text-alt');

  return (
    <div className="form-control">
      <label className="label">
        {React.isValidElement<ChildProps>(child) ? (
          React.cloneElement(child, { className: childClassNames.join(' ') })
        ) : (
          <span className="label-text-alt">{child}</span>
        )}
      </label>
      <input
        type="text"
        placeholder={props.placeholder}
        className={classes(props)}
      />
      {props.helper && (
        <label className="label">
          <span className="label-text-alt">{props.helper}</span>
        </label>
      )}
    </div>
  );
};

export default TextField;
