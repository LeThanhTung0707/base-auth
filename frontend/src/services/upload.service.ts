 

const UPLOAD_API_URL = typeof window === 'undefined'
  ? (process.env.INTERNAL_GATEWAY_URL || 'http://gateway:8080')
  : (process.env.NEXT_PUBLIC_GATEWAY_URL || 'http://localhost:8080');

export const UploadService = {
  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${UPLOAD_API_URL}/upload/image`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || `Upload failed: ${res.statusText}`);
    }

    const data = await res.json();
    return data.url;
  },

  async uploadImages(files: File[]): Promise<string[]> {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));

    const res = await fetch(`${UPLOAD_API_URL}/upload/images`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || `Batch upload failed: ${res.statusText}`);
    }

    const data = await res.json();
    return data.urls;
  },

  async deleteImage(url: string): Promise<void> {
    const res = await fetch(`${UPLOAD_API_URL}/upload/image`, {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to delete image');
    }
  },
};
