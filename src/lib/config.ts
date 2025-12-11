// Helper function to get the full asset path
// For Hetzner deployment: No basePath needed
export function getAssetPath(path: string): string {
  // If path is an external URL, return as is
  if (path.startsWith("http")) {
    return path;
  }
  // Ensure path starts with /
  return path.startsWith("/") ? path : `/${path}`;
}
