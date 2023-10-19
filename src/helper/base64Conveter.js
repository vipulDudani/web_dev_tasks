/** convert image into base64 */

export default function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

/** CONVERT IMAGE IN BINARY FORM */
export function convertToBinary(file) {
  let reader = new FileReader();
  reader.onloadend = function () {
    console.log("encoded base 64 file string: ", reader.result);

    // for binary
    let data = reader.result.split(",")[1];
    let binaryBlob = atob(data);
    console.log("Encoded Binary File String: ", binaryBlob);
  };
  reader.readAsArrayBuffer(file);
}
