function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("resolved");
    }, 2000);
  });
}

async function asyncCall() {
  console.log("calling");
  var result = await resolveAfter2Seconds();
  //console.log(result);
  return result;
  // expected output: 'resolved'
}

 async function run() {
  console.log('show me');
  const result = asyncCall();
  console.log('done and '+ await result);
}
run();
