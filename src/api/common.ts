export const apiDownload = (downloadLink: string) => {
    const link = document.createElement('a');
    link.href = downloadLink;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
