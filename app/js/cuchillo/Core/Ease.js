C.Ease = {
  EASE_CUCHILLO_IN_OUT: "EASE_CUCHILLO_IN_OUT",
  EASE_CUCHILLO_OUT: "EASE_CUCHILLO_OUT",
  EASE_IN_OUT: "EASE_IN_OUT",
  EASE_IN_OUT2: "EASE_IN_OUT2",

  EASE_EXPO_IN_QUAD_OUT: "EASE_EXPO_IN_QUAD_OU",

  init: function() {
    //EASE
    CustomEase.create(this.EASE_CUCHILLO_IN_OUT, "M0,0 C0.5,0 0.1,1 1,1");
    CustomEase.create(this.EASE_CUCHILLO_OUT, "M0,0c0.2,0.6,0.1,1,1,1");
    CustomEase.create(this.EASE_IN_OUT, ".76,0,.32,.99");
    CustomEase.create(this.EASE_IN_OUT2, ".46,.06,.56,.9");
    CustomEase.create(this.EASE_EXPO_IN_QUAD_OUT, "1,0,1,-0.19");
  },
};
