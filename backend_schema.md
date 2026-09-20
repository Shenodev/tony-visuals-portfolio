# هيكل قاعدة البيانات (Backend Schema)

**المشروع:** Tony Visuals Portfolio
**قاعدة البيانات:** MongoDB
**المحرك (ODM):** Mongoose

يعتمد النظام على نموذجين (Collections) رئيسيين فقط لضمان بقاء قاعدة البيانات خفيفة وسريعة، حيث يتم تخزين الملفات الفعلية في Cloudinary ونكتفي بتخزين الروابط (URLs) والمعرفات (Public IDs) هنا.

---

## 1. نموذج الألبوم (Album Schema)

هذا النموذج يمثل الحفلة أو الحدث. كل ألبوم يحتوي على صورة غلاف رئيسية.

### الحقول (Fields):
* `title` (String): اسم الحدث أو الحفلة (مطلوب).
* `coverImageUrl` (String): الرابط المباشر لصورة الغلاف القادم من Cloudinary (مطلوب).
* `coverImagePublicId` (String): المعرف الخاص بالصورة في Cloudinary، ضروري جداً لكي نتمكن من حذف الصورة من السيرفر عند حذف الألبوم (مطلوب).
* `createdAt` (Date): تاريخ الإنشاء (تلقائي).
* `updatedAt` (Date): تاريخ آخر تعديل (تلقائي).

### كود Mongoose المقترح:
```typescript
import mongoose, { Schema, Document } from 'mongoose';

export interface IAlbum extends Document {
  title: string;
  coverImageUrl: string;
  coverImagePublicId: string;
  createdAt: Date;
  updatedAt: Date;
}

const AlbumSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    coverImageUrl: { type: String, required: true },
    coverImagePublicId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Album || mongoose.model<IAlbum>('Album', AlbumSchema);
```

---

## 2. نموذج الصورة (Image Schema)

هذا النموذج يمثل الصور الفردية الموجودة داخل الألبوم. العلاقة هنا هي (One-to-Many) حيث يمكن أن يمتلك الألبوم الواحد صوراً متعددة.

### الحقول (Fields):
* `albumId` (ObjectId): مرجع (Reference) لمعرف الألبوم الذي تنتمي إليه الصورة (مطلوب).
* `url` (String): الرابط المباشر للصورة من Cloudinary (مطلوب).
* `public_id` (String): المعرف الخاص بالصورة في Cloudinary للحذف وإدارة الملفات (مطلوب).
* `width` (Number): عرض الصورة بالبيكسل، وهو **مطلوب جداً** لعمل المكون `<Image>` الخاص بـ Next.js ولضبط نظام الـ Masonry Grid بدقة دون حدوث Layout Shift.
* `height` (Number): ارتفاع الصورة بالبيكسل.
* `createdAt` (Date): تاريخ الرفع (تلقائي).

### كود Mongoose المقترح:
```typescript
import mongoose, { Schema, Document } from 'mongoose';

export interface IImage extends Document {
  albumId: mongoose.Types.ObjectId;
  url: string;
  public_id: string;
  width: number;
  height: number;
  createdAt: Date;
}

const ImageSchema: Schema = new Schema(
  {
    albumId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Album', 
      required: true 
    },
    url: { type: String, required: true },
    public_id: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } } // لا نحتاج updatedAt للصور
);

export default mongoose.models.Image || mongoose.model<IImage>('Image', ImageSchema);
```

---

## 3. العلاقات وهيكلة الحذف (Relationships & Deletion Strategy)

* **العلاقة:** `Album` (1) ↔ (N) `Image`
* **الحذف المتتالي (Cascade Delete):** 
  في مسار الـ API الخاص بحذف الألبوم (`DELETE /api/albums/[id]`)، يجب برمجة العملية لتشمل الخطوات التالية بالترتيب:
  1. جلب جميع الـ `public_id` للصور المرتبطة بـ `albumId` من قاعدة البيانات.
  2. إرسال طلب لـ Cloudinary لحذف صورة غلاف الألبوم.
  3. إرسال طلبات لـ Cloudinary لحذف جميع الصور المرتبطة (Bulk Delete).
  4. حذف جميع مستندات الصور من نموذج `Image` في MongoDB.
  5. أخيراً، حذف مستند الألبوم نفسه من نموذج `Album`.