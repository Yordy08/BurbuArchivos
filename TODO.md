# TODO - Signed Upload Implementation

## Plan
1. ✅ Create `/server/api/images/sign-upload.post.ts` - Returns signed URL for direct Cloudinary upload
2. ✅ Create `/server/api/images/save.post.ts` - Saves the Cloudinary URL to DB
3. ✅ Update `/pages/subir.vue` - Change frontend to use signed upload pattern

## Status: ✅ COMPLETED

### New Flow:
1. Vue → Backend (get signed URL) → Vue gets signature
2. Vue uploads directly to Cloudinary using the signed URL
3. Vue → Backend (save URL to DB) → Image saved to MongoDB
