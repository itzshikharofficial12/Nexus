# Quick Supabase Environment Check

## ⚠️ CRITICAL: Environment Variables

The message persistence code requires these environment variables to work:

```bash
# Required in /apps/web/.env.local

NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key
GROQ_API_KEY=your-groq-api-key
```

## Step 1: Check Your Environment Variables

1. Open `/apps/web/.env.local` (create if it doesn't exist)
2. Add these three variables with your actual values
3. Restart your dev server

## Step 2: Get Your Supabase Keys

1. Go to **supabase.com** → Login to your project
2. Click **Settings** (bottom left)
3. Click **API** (left sidebar)
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Step 3: Verify Environment Variables Are Loaded

In browser console (F12), run:

```javascript
console.log(
  'URL:', process.env.NEXT_PUBLIC_SUPABASE_URL,
  'KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) + '...'
)
```

If both show `undefined` → Environment variables not loaded, restart dev server

## Step 4: Now Follow the Full Debug Guide

After environment variables are set, follow: `SUPABASE_DEBUG_GUIDE.md`

---

## Without Environment Variables

If these aren't set:
- ❌ Supabase client creation fails silently
- ❌ No conversations created
- ❌ No messages saved
- ❌ No messages loaded
- ❌ Console logs show "undefined" for URL and KEY

**Solution**: Set environment variables → Restart dev server → Try again
