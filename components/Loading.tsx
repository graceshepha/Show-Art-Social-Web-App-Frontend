/**
 * Composant pour afficher un spinner pour les loading.
 *
 * @author Roger Montero
 */
const Loading = () => (
  <div className="w-full flex justify-center my-4">
    <div className="animate-spin ease-linear border-2 rounded-full border-y-base-content border-transparent w-8 h-8" />
  </div>
);

export default Loading;
