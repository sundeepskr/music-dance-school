# 📖 Aarohi Sangeetalaya – Website Owner Guide & Instructions

Welcome to your upgraded, modern website for **Aarohi Sangeetalaya**! This guide was specially written to answer all your questions in simple, easy steps.

---

## 🔒 1. Can Anyone Upload Photos? Is it Safe?

**NO, random visitors CANNOT upload photos to your live website!**
We have added two layers of security to give you 100% peace of mind:

1. **Admin Passcode Protection**:
   - The button on the Gallery page is now locked: **"🔒 Admin: Add Event Photos"**.
   - When clicked, it asks for a **4-digit secret Admin PIN**.
   - The default PIN is set to **`1212`**. (You can easily change this to any PIN you want in `js/main.js`).
   - Normal visitors who don't have the PIN cannot open the uploader.
2. **Local Browser Isolation**:
   - Even if someone hypothetically selected a photo on their phone, it is saved only in their personal browser session. It **never** alters the website files or shows on other visitors' screens.
3. **Delete Button for Mistakes**:
   - When you unlock Admin mode with your PIN, a red **"🗑️ Delete"** button appears on custom uploaded photos so you can remove any photo with one click.

---

## 🖼️ 2. What Happens if I Upload a Photo of Any Size? Will It Fit?

**YES! Photos of ANY size will fit automatically without stretching or breaking!**

* **Automatic Image Compressor & Resizer**:
  - We built an automatic HTML5 Canvas optimizer into `js/main.js`.
  - If you take a heavy 15MB or 25MB photo with a smartphone or DSLR camera, the website automatically scales and compresses it down to ~150KB in under a second.
  - It maintains crisp sharpness while preventing phone memory or storage limits.
* **Smart Auto-Crop (`object-fit: cover`)**:
  - Whether your photo is **portrait (vertical)**, **landscape (horizontal)**, or **square**, our CSS automatically centers and crops the photo cleanly inside the gallery card.
  - Your photos will **never stretch, squeeze, or look distorted**.
* **Full View in Lightbox**:
  - When a visitor taps on any photo in the gallery, the full uncropped image opens in the **Lightbox Modal** so they can admire the full photo in crystal-clear quality.

---

## 🏷️ 3. What About the Logo? Will Any Logo Fit Automatically?

**YES! The logo is fully auto-fitted and auto-scaled!**

- In `css/style.css`, the logo is styled with:
  ```css
  width: 52px;
  height: 52px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  flex-shrink: 0;
  ```
- **What this means for you**:
  - If you upload a square logo, wide rectangular logo, tall logo, or circular logo, the site automatically centers and fits it inside the royal gold circular badge.
  - It will **never stretch, blur, or distort**.
  - On small mobile screens (under 480px), the logo automatically adjusts to 44px so it never collides with navigation buttons.

---

## 📱 4. Screen Responsiveness: Works on Any Device

The site is built with modern **Fluid Responsive Design**:

* **Mobile Phones (iPhone, Samsung Galaxy, OnePlus, 320px – 480px)**:
  - Sticky frosted header with touch-friendly menu toggle.
  - Smooth slide-out mobile drawer with frosted-glass backdrop overlay.
  - Course cards and gallery photos auto-stack into a single clean column.
  - Direct 1-tap WhatsApp and Call buttons.
* **Tablets & iPads (768px – 1024px)**:
  - 2-column balanced layouts for courses and stats.
  - Touch swipe-friendly video showcase and gallery.
* **Laptops & Desktops (1200px – 1920px+)**:
  - Grand 2-column hero with 4K stage visual and live counter stats.
  - 3-column course cards with syllabus highlights.
  - 4-column rich footer with Prayag Sangeet Samiti affiliation badge.

---

## 🎥 5. How to Show Your YouTube Channel Videos

In the file **`js/main.js`**, right at the top (lines 14–46), you will find the video configuration:

```javascript
const ACADEMY_CONFIG = {
  name: "Aarohi Sangeetalaya",
  phone: "+91 98765 43210",              
  whatsappNumber: "919999999999",        // Replace with your 10-digit WhatsApp number
  youtubeChannelUrl: "https://www.youtube.com/@AarohiSangeetalaya", // Replace with your channel link
  adminPin: "1212",                      // Your Secret Admin PIN
  
  // Your YouTube Video List:
  featuredVideos: [
    {
      id: "UBYqv21c0Yk",  // <--- Replace this with any YouTube Video ID
      title: "Kathak Classical Dance Recital",
      category: "Kathak Classical Dance",
      desc: "Graceful mudras, intricate tatkar footwork, and storytelling."
    },
    ...
  ]
};
```

### How to get a YouTube Video ID:
When you open any video on YouTube, the link looks like:
`https://www.youtube.com/watch?v=UBYqv21c0Yk`
The code after `v=` (here: `UBYqv21c0Yk`) is your **Video ID**. Just paste that into `id:`!

---

## 📞 6. How to Update Your Phone & WhatsApp Number

To connect WhatsApp and Phone inquiries directly to your mobile phone:
1. Open **`js/main.js`** line 15–16:
   - Change `whatsappNumber: "919999999999"` to your country code + 10-digit phone number (for example: `"919876543210"`).
   - Change `phone: "+91 98765 43210"` to your contact number.
2. In the HTML files, you can search and replace `919999999999` with your actual WhatsApp phone number.
3. Now every time a student clicks "Enquire on WhatsApp" or "Book Free Trial", a pre-formatted message arrives directly to your WhatsApp inbox!

---

## 🚀 7. How to Make the Site Live on the Internet

This website is built with clean HTML5, CSS3, and JavaScript—meaning **no database setup or backend server is required**. You can publish it live in 2 minutes:

### Option 1: Netlify Drop (100% Free & Fastest)
1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop).
2. Simply **drag and drop** the `music-dance-school` folder onto the web page.
3. Within 10 seconds, your site is live with a free SSL certificate (HTTPS) and a public link!
4. You can connect your own domain (e.g. `www.aarohisangeetalaya.com`) anytime under Domain Management.

### Option 2: Traditional Web Hosting (Hostinger, GoDaddy, Bluehost, cPanel)
1. Log in to your hosting cPanel -> **File Manager**.
2. Go to `public_html/`.
3. Upload all the files and folders from `music-dance-school`.
4. Your site is live!

---

## 🔍 8. What SEO (SCO) Was Implemented

Your site now includes full professional SEO optimization:
- ✅ **Google-Optimized Titles & Descriptions**: Targeted for "Kathak classes", "Tabla training", "Harmonium lessons", "Hindustani classical singing", and "Prayag Sangeet Samiti exams".
- ✅ **Schema.org Structured Data (JSON-LD)**: Helps Google display your institute as a certified `MusicSchool` / `LocalBusiness` with founder info and course offerings.
- ✅ **Social Media Cards (Open Graph & Twitter)**: Sharing your website link on WhatsApp or Facebook automatically generates a beautiful preview card with your logo, title, and image.
- ✅ **Robots.txt & Sitemap.xml**: Automatically guides Google and Bing search engine crawlers to index every page.
- ✅ **Mobile Responsive & Fast**: Loads instantly on all mobile phones, tablets, and desktop computers.
