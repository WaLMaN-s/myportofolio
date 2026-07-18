# Walman Ss — Terminal Portfolio

Portfolio pribadi bergaya terminal Linux. **Live di: https://walman-s.github.io/myportofolio/**

Stack: Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · lucide-react

---

## 🔁 Cara Ngoding Sampai Live Lagi

### 1. Nyalakan server development

```bash
cd ~/WEB/portfolio
npm run dev
```

Buka **http://localhost:3000**. Setiap file di-save, browser langsung update sendiri (hot reload) — ngodingnya di sini.

### 2. Kalau sudah puas, push

```bash
git add -A
git commit -m "tulis perubahannya di sini"
git push
```

**Sudah, itu aja.** Begitu push ke branch `main`, GitHub Actions otomatis build versi statis dan deploy ke GitHub Pages. Sekitar 2–3 menit kemudian perubahan tampil di https://walman-s.github.io/myportofolio/

> Kalau belum kelihatan berubah, hard refresh: **Ctrl+Shift+R** (browser suka nge-cache).
> Status deploy bisa dicek di tab **Actions** repo GitHub.

### 3. (Opsional) Tes versi production di lokal dulu

```bash
npm run build
npm run start   # jalan di port 3001, biar gak tabrakan sama web lain
```

Tidak wajib — kalau build gagal di GitHub Actions, situs lama tetap live, tidak akan rusak.

---

## 📁 File yang Sering Diedit

| Mau ganti apa | Edit file |
|---|---|
| Isi hero / nama / tagline | `src/components/Hero.tsx` |
| Tentang saya + timeline | `src/components/About.tsx` |
| Daftar project & link | `src/components/Projects.tsx` |
| Pengalaman kerja | `src/components/Experience.tsx` |
| Daftar skill | `src/components/Skills.tsx` |
| Link sosial (GitHub, LinkedIn, dll) | `src/components/SocialLinks.tsx` |
| Warna & animasi global | `src/app/globals.css` |
| Foto profil mode gelap | `public/profile-dark.jpeg` (timpa filenya) |
| Foto profil mode terang | `public/profile.jpeg` (timpa filenya) |
| CV yang bisa didownload | `public/cv.pdf` (timpa filenya) |
| Logo Arch ASCII + gradient | `src/components/AsciiLogo.tsx` |

---

## ⚠️ Catatan Penting

- **Jangan upgrade `lucide-react`** — harus tetap di `0.469.0`. Versi 1.x menghapus ikon brand (GitHub/LinkedIn/Instagram) yang dipakai situs ini.
- Deploy diatur `.github/workflows/deploy.yml`: build export statis (`STATIC_EXPORT=1`, base path `/myportofolio`) lalu publish ke branch `gh-pages`. Tidak perlu diutak-atik.
- Kalau nambah gambar/file di `public/`, aksesnya lewat base path — lihat pola `BASE_PATH` di `src/components/About.tsx` atau `Contact.tsx`.
- Port produksi lokal sengaja **3001** (`npm run start`) supaya tidak bentrok dengan web lain di komputer ini.
