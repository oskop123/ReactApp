import authorisedFetch from "functions/authorisedFetch.js";

export default function getRaport(body) {
  authorisedFetch("/api/transactions/pdf", "POST", body)
    .then((response) => response.blob())
    .then((blob) => {
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        Math.floor(Math.random() * 1000 + 1).toString() + `.pdf`
      );

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
    });
}
