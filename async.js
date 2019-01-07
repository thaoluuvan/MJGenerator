function nhau_an_mung() {
  console.log("inside nhau_an_mung");
  return Promise.resolve(500);
}
var run = () => {
  nhau_an_mung()
    .then(tien => {
      console.log("tien: " + tien);
      return Promise.resolve('Hello');
    })
    .then(tienl => {
      console.log("tienl: " + tienl);
    })
    .catch(error => {
      console.log(error);
    });
};
run();
