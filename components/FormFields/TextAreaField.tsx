import React from 'react';
import { NextPage } from 'next';
import classNames from 'classnames';

type TextAreaProps = React.InputHTMLAttributes<HTMLTextAreaElement>;

interface Props extends TextAreaProps {
  placeholder?: string;
  helper?: string;
  error?: string | string[];
  name: string;
}

type HtmlProps = React.HTMLAttributes<HTMLElement>;

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

/**
 * Composant textarea d'un formulaire
 *
 * @author Roger Montero
 */
const TextAreaField: NextPage<Props> = ({ children, ...props }) => {
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
      <label className="label" htmlFor={`textarea-${props.name}`}>
        {React.isValidElement<HtmlProps>(child) ? (
          React.cloneElement(child, { className: childClasses })
        ) : (
          <span className="label-text-alt">{child}</span>
        )}
      </label>
      {React.createElement<TextAreaProps>('textarea', {
        ...props,
        id: `textarea-${props.name}`,
        className: getClasses(props),
      })}
      <label className="label">
        {props.helper && <span className="label-text-alt">{props.helper}</span>}
        <span className="label-text-alt text-error">{props.error}</span>
      </label>
    </div>
  );
};

export default TextAreaField;
