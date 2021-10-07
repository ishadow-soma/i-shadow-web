export default function logOnlyDevelopment(TAG = "", str = "") {
  if (process.env.NODE_ENV === "development") console.log(TAG, str);
}
