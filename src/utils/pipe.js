export default (...fns) => (x) => fns.reduce((a, f) => f(a), x);
