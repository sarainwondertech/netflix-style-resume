/**
 * Renders the correct <source> elements for a <video>, picking between
 * a portrait and landscape URL based on the viewport's orientation.
 *
 * Usage:
 *   <video autoPlay muted loop>
 *     <TrailerSources portrait={profile.trailerUrl} landscape={profile.trailerUrlLandscape} />
 *   </video>
 *
 * The browser evaluates the `media` query on each <source> once at load time
 * and downloads only the matching file. If only one URL is provided, it's
 * used unconditionally.
 */
type TrailerSourcesProps = {
  portrait?: string;
  landscape?: string;
};

export function TrailerSources({ portrait, landscape }: TrailerSourcesProps) {
  // Both provided: landscape for landscape viewports, portrait as fallback
  if (portrait && landscape) {
    return (
      <>
        <source src={landscape} media="(orientation: landscape)" />
        <source src={portrait} />
      </>
    );
  }
  // Only one provided: use it unconditionally (no media query = always matches)
  const only = portrait ?? landscape;
  if (!only) return null;
  return <source src={only} />;
}
