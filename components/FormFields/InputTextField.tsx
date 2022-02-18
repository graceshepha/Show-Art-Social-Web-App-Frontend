import React from 'react';
import { NextPage } from 'next';
import classNames from 'classnames';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

type HtmlProps = React.HTMLAttributes<HTMLElement>;

interface Props extends InputProps {
  placeholder?: string;
  helper?: string;
  error?: string | string[];
  name: string;
}

type GetClasses = (v: {
  className?: string;
  error?: string | string[] | boolean;
}) => string;

const getClasses: GetClasses = ({ className, error }) => {
  const c = className || '';
  return classNames({
    input: !c.match(/input(\s|$)/),
    [c]: true,
    'input-error': !!error,
  });
};

/**
 * Composant input d'un formulaire
 *
 * @author Roger Montero
 */
const InputTextField: NextPage<Props> = ({ children, ...props }) => {
  // child
  const child = children
    ? children instanceof String
      ? React.Children.only(children)
      : children
    : '';

  // child classes
  const childClasses = React.isValidElement<HtmlProps>(child)
    ? `label-text-alt ${(child.props.className || '').trim()}`
    : 'label-text-alt';

  return (
    <div className="form-control">
      <label className="label" htmlFor={`input-${props.name}`}>
        {React.isValidElement<HtmlProps>(child) ? (
          React.cloneElement(child, { className: childClasses })
        ) : (
          <span className={childClasses}>{child}</span>
        )}
      </label>
      {React.createElement<InputProps>('input', {
        ...props,
        id: `input-${props.name}`,
        className: getClasses(props),
      })}
      <label className="label">
        {props.helper && <span className="label-text-alt">{props.helper}</span>}
        {props.error && (
          <span className="label-text-alt text-error">{props.error}</span>
        )}
      </label>
    </div>
  );
};

export default InputTextField;
