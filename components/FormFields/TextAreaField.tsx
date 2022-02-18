import React from 'react';
import classNames from 'classnames';

type GetClasses = (v: {
  className?: string;
  error?: string | string[] | boolean;
}) => string;

const getClasses: GetClasses = ({ className, error }) => {
  const c = className || '';
  return classNames({
    textarea: !className?.match(/textarea(\s|$)/),
    [c]: true,
    'input-error': !!error,
  });
};

type TextAreaFieldProps = Omit<
  React.ComponentPropsWithoutRef<'textarea'>,
  'children'
> & {
  name: string;
  placeholder?: string;
  helper?: string;
  error?: string | string[];
  children?: React.ReactElement | string;
};

type TextAreaField = (props: TextAreaFieldProps) => React.ReactElement<'div'>;

/**
 * Composant textarea d'un formulaire
 *
 * @author Roger Montero
 */
const TextAreaField: TextAreaField = ({ children, ...props }) => {
  const isElem = !!children && typeof children !== 'string';

  // child classes
  const childClasses = `label-text-alt ${(isElem && children.props?.className
    ? children.props.className
    : ''
  ).trim()}`;

  return (
    <div className="form-control">
      <label className="label" htmlFor={`textarea-${props.name}`}>
        {isElem ? (
          React.cloneElement(children, { className: childClasses })
        ) : (
          <span className={childClasses}>{children}</span>
        )}
      </label>
      {React.createElement<TextAreaFieldProps>('textarea', {
        rows: 5,
        ...props,
        id: `textarea-${props.name}`,
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

export default TextAreaField;
