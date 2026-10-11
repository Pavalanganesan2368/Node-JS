const path = require('path')

console.log(path.join(__dirname, "script.js"))

console.log(path.extname(__filename))
console.log(path.dirname(__filename))
console.log(path.basename(__filename))

console.log(path.parse(__filename).name)

console.log(os.type())
console.log(os.version())
console.log(os.homedir())

console.log(os.arch())

// Allocating os module
const os = require('os');

// Printing os.freemem() value
let free_memory = os.freemem();
let free_mem_in_kb = free_memory / 1024;
let free_mem_in_mb = free_mem_in_kb / 1024;
let free_mem_in_gb = free_mem_in_mb / 1024;

free_mem_in_kb = Math.floor(free_mem_in_kb);
free_mem_in_mb = Math.floor(free_mem_in_mb);
free_mem_in_gb = Math.floor(free_mem_in_gb);

free_mem_in_mb = free_mem_in_mb % 1024;
free_mem_in_kb = free_mem_in_kb % 1024;
free_memory = free_memory % 1024;

console.log("Free memory: " + free_mem_in_gb + "GB "
    + free_mem_in_mb + "MB " + free_mem_in_kb
    + "KB and " + free_memory + "Bytes");