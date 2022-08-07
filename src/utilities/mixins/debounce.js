const debounce = {
  data() {
    return {
      timeOut: "",
    };
  },
  methods: {
    debounce(func, wait = 1000) {
      clearTimeout(this.timeOut);
      this.timeout = setTimeout(func, wait);
    },
  },
};

export default debounce;
