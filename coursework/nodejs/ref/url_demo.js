const url = require("url");
const { serialize } = require("v8");

const my_url = new URL("http://mywebsite.com/hello.html?id=100&status=active");

// Serialized URL
console.log(my_url.href);
console.log(my_url.toString());
// Host (root domain)
console.log(my_url.host);
// Hostname (does not get port)
console.log(my_url.hostname);
// Pathname
console.log(my_url.pathname);
// Serialized query
console.log(my_url.search);
// Params object
console.log(my_url.searchParams);
// Add param
my_url.searchParams.append("abc", "123");
console.log(my_url.searchParams);
// Loop through
my_url.searchParams.forEach((value, name) => console.log(`${name}: ${value}`));
