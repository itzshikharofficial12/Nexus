# 🔐 Enable RLS & Policies for Chat Persistence

## What This Does

Enables **Row Level Security (RLS)** on both tables and creates permissive policies to allow full access (perfect for MVP/testing).

## ✅ Steps to Apply

### Step 1: Open Supabase SQL Editor
1. Go to https://app.supabase.com
2. Select your **DailyOS** project
3. Click **SQL Editor** (left sidebar)
4. Click **New Query**

### Step 2: Copy the SQL Script
1. Open file: `/SUPABASE_RLS_SETUP.sql`
2. Copy **ALL** the code (everything)

### Step 3: Paste & Run in Supabase
1. Paste into Supabase SQL Editor
2. Click **Run** button
3. Wait for green checkmark ✅

## 🎯 What Gets Created

### RLS Enabled ✓
```sql
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
```

### Policies Created ✓
```sql
CREATE POLICY "Allow all conversations"
ON conversations
FOR ALL
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow all messages"
ON messages
FOR ALL
USING (true)
WITH CHECK (true);
```

## 📊 What This Means

| Setting | Before | After |
|---------|--------|-------|
| conversations table | No RLS | RLS enabled + policy allows all |
| messages table | No RLS | RLS enabled + policy allows all |
| Inserts | ✓ Works | ✓ Works (policy: true) |
| Selects | ✓ Works | ✓ Works (policy: true) |
| Updates | ✓ Works | ✓ Works (policy: true) |
| Deletes | ✓ Works | ✓ Works (policy: true) |

## 🧪 Test After Setup

1. Go to `/ai` page in DailyOS
2. Send a message
3. Check browser console - should see:
   ```
   ✓ User message saved to DB
   ✓ AI message saved to DB
   ```
4. Refresh page - messages should load
5. Check Supabase > SQL Editor and run:
   ```sql
   SELECT COUNT(*) as msg_count FROM messages;
   SELECT * FROM messages LIMIT 5;
   ```
   Should show your messages ✓

## ⚠️ Important Notes

- **This is permissive for MVP/testing** - all users have full access
- **For production**, you'd restrict policies to authenticated users or specific user IDs
- **RLS doesn't prevent access** if policy is `true` - it just ensures checks are in place
- **No schema changes** - only enabling RLS and creating policies

## 🔍 Verify Success

After running, you should see:

```
VERIFY RLS IS ENABLED AND POLICIES EXIST

schemaname │ tablename    │ rowsecurity
────────────┼──────────────┼─────────────
public      │ conversations│ t
public      │ messages     │ t

schemaname │ tablename    │ policyname           │ cmd
────────────┼──────────────┼──────────────────────┼─────
public      │ conversations│ Allow all            │ ALL
public      │ messages     │ Allow all messages   │ ALL
```

If you see `rowsecurity = t` (true) for both, you're good! ✓

## 🚨 If It Fails

**"Policy already exists"**
- ✓ Script handles this with DROP IF EXISTS

**"Permission denied"**
- You need Supabase account with proper permissions
- Make sure you're logged in as project owner

**"Still can't save messages"**
- Check console for exact error message
- Verify tables exist: `SELECT * FROM conversations LIMIT 1;`
- Verify policies were created: Run verification query

