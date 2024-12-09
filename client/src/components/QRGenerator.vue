<template>
  <div class="qr-code-generator">
    <h2>Generate QR Code</h2>
    <input
      v-model="url"
      type="text"
      placeholder="Enter URL"
      class="url-input"
    />
    <input
      v-model="fileName"
      type="text"
      placeholder="Enter file name (e.g., qr_code.svg)"
      class="file-name-input"
    />
    <button @click="generateQrCode">Generate QR Code</button>
    <div v-if="qrCodeSvg" v-html="qrCodeSvg" class="qr-code-output"></div>
    <button v-if="qrCodeSvg" @click="downloadSvg">Download SVG</button>
  </div>
</template>

<script>
import QRCode from "qrcode";

export default {
  name: "QrCodeGenerator",
  data() {
    return {
      url: "", // Input URL
      fileName: "qr_code.svg", // Default file name
      qrCodeSvg: null, // QR code SVG string
    };
  },
  methods: {
    async generateQrCode() {
      try {
        if (!this.url) {
          alert("Please enter a URL.");
          return;
        }

        // Generate QR code as SVG
        this.qrCodeSvg = await QRCode.toString(this.url, {
          type: "svg",
        });
      } catch (error) {
        console.error("Error generating QR code:", error);
        alert("Failed to generate QR code.");
      }
    },
    downloadSvg() {
      if (!this.qrCodeSvg) {
        alert("No QR code available to download.");
        return;
      }

      // Create a Blob from the SVG string
      const blob = new Blob([this.qrCodeSvg], { type: "image/svg+xml" });

      // Create a link element to download the file
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = this.fileName;
      document.body.appendChild(link);

      // Trigger the download and remove the link
      link.click();
      document.body.removeChild(link);
    },
  },
};
</script>

<style scoped>
.qr-code-generator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.url-input,
.file-name-input {
  width: 300px;
  padding: 10px;
  font-size: 16px;
}
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
.qr-code-output {
  margin: 20px 0;
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
