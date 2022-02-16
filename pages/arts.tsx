import { NextPage } from 'next';

// Declaring type of props - see "Typing Component Props" for more examples
type ArtsProps = {
  message: string;
}; /* use `interface` if exporting so that consumers can extend */

// Easiest way to declare a Function Component; return type is inferred.

const Arts: NextPage<ArtsProps> = ({ message }) => <div>{message} Bonjour</div>;

export default Arts;
