# وثيقة المتطلبات التقنية (Technical Requirements Document - TRD)

**اسم المشروع:** Tony Visuals Portfolio
**بيئة التطوير:** Next.js (App Router)

## 1. بنية النظام (System Architecture)

يعتمد المشروع على بنية Serverless باستخدام Vercel. يعمل Next.js كـ Full-stack Framework حيث:

* **الواجهة الأمامية (Frontend):** مكونات React يتم تصييرها على الخادم (Server-Side Rendering) وأخرى على العميل (Client-Side).

* **الواجهة الخلفية (Backend):** يتم استخدام مسارات `app/api/` للتعامل مع العمليات الآمنة (مثل رفع الصور والتواصل مع قاعدة البيانات).

* **تخزين الوسائط (Media Storage):** Cloudinary (يتم التواصل معه عبر الـ Backend فقط لضمان أمان المفاتيح).

* **قاعدة البيانات (Database):** MongoDB Atlas (يتم التواصل معها باستخدام Mongoose).

## 2. هيكل البيانات (Data Models - MongoDB)

نحتاج إلى نموذجين (Collections) رئيسيين:

### 2.1. نموذج الألبوم (Album Schema)

* `_id`: Object ID

* `title`: String (اسم الحفلة أو الحدث - مطلوب)

* `coverImageUrl`: String (رابط صورة الغلاف من Cloudinary - مطلوب)

* `coverImagePublicId`: String (لإمكانية حذف الصورة من Cloudinary لاحقاً)

* `createdAt`: Date

### 2.2. نموذج الصورة (Image Schema)

* `_id`: Object ID

* `albumId`: ObjectId (مرتبط بنموذج Album)

* `url`: String (رابط الصورة من Cloudinary)

* `public_id`: String (معرف الصورة في Cloudinary للحذف)

* `width`: Number (مهم جداً لنظام Masonry Grid)

* `height`: Number (مهم جداً لنظام Masonry Grid)

* `createdAt`: Date

## 3. مسارات الواجهة البرمجية (API Routes)

| المسار (Route) | الطريقة (Method) | الوظيفة (Description) | 
 | ----- | ----- | ----- | 
| `/api/auth` | POST | التحقق من كلمة المرور الثابتة (Hardcoded) وإنشاء جلسة (Cookie). | 
| `/api/albums` | GET | جلب قائمة الألبومات لعرضها في الصفحة الرئيسية. | 
| `/api/albums` | POST | إنشاء ألبوم جديد (محمي). | 
| `/api/albums/[id]` | DELETE | حذف ألبوم معين بجميع صوره المرتبطة (محمي). | 
| `/api/images` | GET | جلب صور ألبوم معين بناءً على الـ `albumId`. | 
| `/api/upload` | POST | رفع صورة (أو مجموعة صور) إلى Cloudinary وحفظ الروابط في MongoDB (محمي). | 
| `/api/images/[id]` | DELETE | حذف صورة معينة من MongoDB و Cloudinary (محمي). | 

## 4. نظام لوحة التحكم والحماية (Security & Admin Panel)

* **المسار المخفي:** `/t-dashboard`

* **المصادقة (Authentication):** سيتم استخدام Next.js Middleware (`proxy.ts`) لمراقبة المسار المخفي ومسارات `POST/DELETE` في الـ API.

* **آلية العمل:**

  1. عند دخول المستخدم للمسار، يتحقق الـ Middleware من وجود ملف تعريف ارتباط (Cookie) صالح.

  2. إذا لم يوجد، يتم توجيهه لصفحة إدخال كلمة المرور.

  3. يتم إرسال كلمة المرور إلى `/api/auth`، ومقارنتها بالمتغير `ADMIN_PASSWORD` في الـ `.env`.

  4. في حال التطابق، يتم إصدار Cookie مشفر.

## 5. إعدادات الواجهة الأمامية (Frontend Configuration)

### 5.1. إعدادات Tailwind CSS (`tailwind.config.ts`)

يجب تخصيص الألوان بناءً على نظام التصميم المعتمد:

```
theme: {
  extend: {
    colors: {
      primary: '#081F26',    // Deep Navy
      secondary: '#236871',  // Faded Teal
      accent: '#7EFC9F',     // Mint Green
      light: '#FAFAFA',      // Off-White
      dark: '#0B0B0B',       // Black
    }
  }
}

```

### 5.2. أداء الصور (Image Optimization)

* استخدام مكون `<Image>` من `next/image`.

* تفعيل خاصية `placeholder="blur"` للصور الثقيلة لضمان تجربة مستخدم سلسة (Lazy Loading).

* يجب إضافة نطاق `res.cloudinary.com` إلى ملف `next.config.mjs` للسماح بعرض الصور.

### 5.3. شبكة الصور المتداخلة (Masonry Grid)

* سيتم استخدام تقنية CSS Columns (مثل `columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4`) أو مكتبة خفيفة مثل `react-photo-album` لضمان ترتيب الصور ذات الأبعاد المختلفة (طولية وعرضية) بدون تشويه.

## 6. متغيرات البيئة المطلوبة (Environment Variables - `.env.local`)

```
# Database
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/tony_visuals

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Security
ADMIN_PASSWORD=your_super_secret_password_here
COOKIE_SECRET=random_string_for_cookie_encryption

```