function triggerDownload(url: string, filename: string, isBlob: boolean = false) {
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    try {
      if (document.body.contains(a)) {
        document.body.removeChild(a);
      }
      if (isBlob) {
        window.URL.revokeObjectURL(url);
      }
    } catch (e) {
      console.warn('Cleanup error', e);
    }
  }, 60000);
}

export async function downloadPublicZip(): Promise<void> {
  const filename = `gedeb_public_website_${new Date().toISOString().slice(0, 10)}.zip`;
  const staticUrl = `${window.location.origin}/gedeb_public_website.zip`;

  try {
    const res = await fetch(staticUrl);
    if (res.ok) {
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      triggerDownload(blobUrl, filename, true);
      return;
    }
  } catch (err) {
    console.warn('Direct fetch failed, falling back to URL download...', err);
  }

  // Fallback direct static URL trigger
  triggerDownload(staticUrl, filename, false);
}

export async function downloadAdminZip(): Promise<void> {
  const filename = `gedeb_admin_master_${new Date().toISOString().slice(0, 10)}.zip`;
  const staticUrl = `${window.location.origin}/gedeb_admin_master.zip`;

  try {
    const res = await fetch(staticUrl);
    if (res.ok) {
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      triggerDownload(blobUrl, filename, true);
      return;
    }
  } catch (err) {
    console.warn('Direct fetch failed, falling back to URL download...', err);
  }

  // Fallback direct static URL trigger
  triggerDownload(staticUrl, filename, false);
}

export async function downloadProjectZip(): Promise<void> {
  return downloadAdminZip();
}
