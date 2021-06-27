var DataHolder = {

  rivers: [],
  images: [],

  getJSON(requestURL) {
    return new Promise((resolve, reject) => {

      const request = new XMLHttpRequest();
      request.open('GET', requestURL);
      request.responseType = 'json';

      request.onload = () => {
        resolve(request.response);
      }

      request.send();
    });
  },

  getAllRivers: function () {
    const requestURL = '/assets/data/rivers.json';

    return new Promise((resolve, reject) => {
      if(this.rivers.length === 0) {
        this.getJSON(requestURL).then((e)=> {
          this.rivers = e;
          resolve(e)
        });
      } else {
        resolve(this.rivers);
      }
    });
  },

  getRiver: function() {
    const requestURL = '/assets/data/35068.json';

    return new Promise((resolve, reject) => {
      this.getJSON(requestURL).then((e) => {
        this.images = e.pois;
        resolve(e)
      });
    });
  }
}