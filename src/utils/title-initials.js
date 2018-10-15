export default function titleInitials(title) {
  try {
    return title
      .split(/\s/)
        .reduce(
          (response, word) => response += word[0]
            .toUpperCase(),'')
        .substr(0,2);
  } catch(e) {
    console.error(e);
    return '🎱';
  }
}
