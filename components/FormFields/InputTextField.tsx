import React from 'react';
import classNames from 'classnames';

type GetClasses = (v: {
  className?: string;
  error?: string | string[] | boolean;
}) => string;

/** @ignore */
const getClasses: GetClasses = ({ className, error }) => {
  const c = className || '';
  return classNames({
    input: !c.match(/input(\s|$)/),
    [c]: true,
    'input-error': !!error,
  });
};

type InputTextFieldProps = Omit<
  React.ComponentPropsWithoutRef<'input'>,
  'children'
> & {
  name: string;
  placeholder?: string;
  helper?: string;
  error?: string | string[];
  children?: React.ReactElement | string;
};

type InputTextField = (props: InputTextFieldProps) => React.ReactElement<'div'>;

/**
 * Composant input d'un formulaire
 *
 * @author Roger Montero
 */
const InputTextField: InputTextField = ({ children, ...props }) => {
  const isElem = !!children && typeof children !== 'string';

  // child classes
  const childClasses = `label-text-alt ${(isElem && children.props?.className
    ? children.props.className
    : ''
  ).trim()}`;

  return (
    <div className="form-control">
      <label className="label" htmlFor={`input-${props.name}`}>
        {isElem ? (
          React.cloneElement(children, { className: childClasses })
        ) : (
          <span className={childClasses}>{children}</span>
        )}
      </label>
      {React.createElement<InputTextFieldProps>('input', {
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
