function calculateChecksum(num){ 
var pyramid = convertNumberToPyramid(num); 
while (pyramid.getChecksum() == null) { 
pyramid.transform() 
} 
return pyramid.getChecksum(); 
} 
 
 
 
function convertNumberToPyramid(num) { 
function split(num) { 
  var len = num.length / 4; 
  var first = []; 
  var second = []; 
  var third = []; 
  var fourth = []; 
  var row = 0; 
  var rowindex = 0; 
  var rowlen = 1; 
  var xlen = 1; 
  for (var i = 0; i < num.length; i++) { 
   if (i < len) { 
    first.push(num[i]); 
   } else { 
    if (rowindex < xlen) second.push(num[i]); 
    else if (rowlen - rowindex <= xlen) fourth.push(num[i]); 
    else third.push(num[i]); 
   } 
 
   if (++rowindex === rowlen) { 
    row++; 
    rowlen += 2; 
    rowindex = 0; 
    if (i >= len) xlen += 2; 
   } 
  } 
  return [ 
   first, second, third, fourth 
  ]; 
 } 
function getPyramid(num) { 
 if (num.length == 4) return new Pyramid(num); 
 return new Pyramid(split(num).map(getPyramid)); 
} 
return getPyramid(num.split("").reverse()); 
} 
 
class Pyramid { 
constructor(num) { 
this.num = num;
this.hasPyramids = num[0] instanceof Pyramid; 
} 
getChecksum() {
if (this.hasPyramids) {
 var vals = new Set(this.num.map(x => x.getChecksum()));
 return vals.size == 1 ? [...vals][0] : null;
}
var options = new Map(); 
options.set([1,1,1,1].toString(),1); 
options.set([0,0,0,0].toString(),0); 
var value = options.get(this.num.toString()); 
if (value == undefined) { 
return null 
} 
return value; 
} 
transform(rev) {
if (this.hasPyramids) {
 this.num[0].transform();
 this.num[1].transform();
 this.num[2].transform(true);
 this.num[3].transform();
 var checksums = this.num.map(x => x.getChecksum());
 if (checksums.every(x => x != null)) { this.num = checksums; this.hasPyramids = false; }
 return;
} 
var rules = new Map(); 
rules.set([0,0,0,0].toString(),[0,0,0,0]); 
rules.set([0,0,0,1].toString(),[1,0,0,0]); 
rules.set([0,0,1,0].toString(),[0,0,0,1]); 
rules.set([0,0,1,1].toString(),[0,0,1,0]); 
rules.set([0,1,0,0].toString(),[0,0,0,0]); 
rules.set([0,1,0,1].toString(),[0,0,1,0]); 
rules.set([0,1,1,0].toString(),[1,0,1,1]); 
rules.set([0,1,1,1].toString(),[1,0,1,1]); 
rules.set([1,0,0,0].toString(),[0,1,0,0]); 
rules.set([1,0,0,1].toString(),[0,1,0,1]); 
rules.set([1,0,1,0].toString(),[0,1,1,1]); 
rules.set([1,0,1,1].toString(),[1,1,1,1]); 
rules.set([1,1,0,0].toString(),[1,1,0,1]); 
rules.set([1,1,0,1].toString(),[1,1,1,0]); 
rules.set([1,1,1,0].toString(),[0,1,1,1]); 
rules.set([1,1,1,1].toString(),[1,1,1,1]); 
this.num = rules.get(rev ? this.num.slice().reverse().toString() : this.num.toString()); 
if (rev) this.num.reverse()
} 
 
}