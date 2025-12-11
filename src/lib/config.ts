// Base path for GitHub Pages deployment
// This is set at build time - always include basePath for static export
export const basePath = "/musikfuerfirmen";

// Helper function to get the full asset path
// This is called at build time during static generation
export function getAssetPath(path: string): string {
  // If path already starts with basePath or is an external URL, return as is
  if (path.startsWith(basePath) || path.startsWith("http")) {
    return path;
  }
  // Ensure path starts with /
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}
