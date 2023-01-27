export function decodeHTMLEntities(str) {
    str = str.replaceAll("&#038;", "&");
    str = str.replaceAll("&#8217;", "’");
    str = str.replaceAll("&#8216;", "‘");
    str = str.replaceAll("&#8220;", "“");
    str = str.replaceAll("&#8221;", "”");
    return str;
  }

 export function formatDate(date){
    const result = new Date(date).toLocaleString()
    return result
  }