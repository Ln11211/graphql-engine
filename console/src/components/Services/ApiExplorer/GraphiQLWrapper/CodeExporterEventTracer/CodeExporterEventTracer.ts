import { programmaticallyTraceError } from '@/features/Analytics';
import { useEffect } from 'react';
import { onGraphiQlContainerClick } from './onGraphiQlContainerClick';

/**
 * A fake component that spies over clicks on the GraphiQL Code Exporter and track events.
 * The Code Exporter view is not in the DOM at the beginning, that's why we need to track clicks
 * on the container and then check if the click has been generated by one of the Code Exporter
 * buttons/checkboxes.
 *
 * Please note: it's a component and not a custom hook because the parent consuming it is a
 * class-based component, not a functional one.
 */
export function CodeExporterEventTracer() {
  useEffect(() => {
    const graphiQlContainer = document.querySelector('.graphiql-container');
    if (!graphiQlContainer) {
      const error = new Error(
        'No GraphiQL container (.graphiql-container) found'
      );
      console.warn(error);
      programmaticallyTraceError(error);
      return;
    }

    graphiQlContainer.addEventListener('click', onGraphiQlContainerClick);

    return () => {
      graphiQlContainer.removeEventListener('click', onGraphiQlContainerClick);
    };
  }, []);

  return null;
}
