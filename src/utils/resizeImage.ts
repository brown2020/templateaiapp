export function resizeImage(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.src = objectUrl;

    img.onload = () => {
      // Ensure URL is revoked after the image is loaded
      URL.revokeObjectURL(objectUrl);

      // Create canvas and set its dimensions
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Failed to get canvas context."));
        return;
      }

      // Calculate scaling to cover 1024x1024
      const scale = Math.max(
        canvas.width / img.width,
        canvas.height / img.height
      );

      // Calculate the size and position of the scaled image
      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;
      const offsetX = (canvas.width - scaledWidth) / 2;
      const offsetY = (canvas.height - scaledHeight) / 2;

      // Draw the image on the canvas
      ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);

      // Convert canvas to blob
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to create blob from image."));
        }
      }, "image/png");
    };

    img.onerror = () => {
      // Clean up object URL on error
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image."));
    };
  });
}
