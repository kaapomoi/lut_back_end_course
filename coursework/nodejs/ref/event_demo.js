const EventEmitter = require("events");

// Create class
class MyEmitter extends EventEmitter {}

// Init object
const my_emitter = new MyEmitter();

// Event listener
my_emitter.on("event", () => console.log("Event fired!"));

// Init event
my_emitter.emit("event");
