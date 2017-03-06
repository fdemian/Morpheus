// TODO: simplify regex chain.
export default function format_title_string(str)
{
  return str.toLowerCase()
  .replace(/[<>]/g, " ") // Eliminate plus and minus signs.
  .replace(/([^ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-\\.])/g, " ") // Strip non alphanumeric characters.
  .replace(/((\s*\S+)*)\s*/, "$1") // Remove last whitespace.
  .replace(/\.*(\s+)\.*/g, "-"); // replace spaces with dashes.
}
