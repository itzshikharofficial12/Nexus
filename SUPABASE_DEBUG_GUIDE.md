# Supabase Message Persistence Debug Guide

## Current Implementation Status ✅

The AI chat message persistence code is **fully implemented** with comprehensive logging in `/app/ai/page.tsx`:

- ✅ Conversation initialization: Creates new conversation on page load
- ✅ User message persistence: Saves to `messages` table with role='user'
- ✅ AI message persistence: Saves to `messages` table with role='assistant'
- ✅ Message loading: Fetches from `messages` table on page load
- ✅ Detailed logging: Every operation logs success/error details

## Step-by-Step Debug Checklist

### 1. Verify Supabase Tables Exist

Go to **Supabase Dashboard → SQL Editor** and run:

```sql
-- Check if conversations table exists
SELECT * FROM conversations LIMIT 1;

-- Check if messages table exists
SELECT * FROM messages LIMIT 1;
```

**Expected**: Both queries should work (may return empty results, that's fine)

**If error**: 
- "relation 'conversations' does not exist" → Table missing, need to create it
- "relation 'messages' does not exist" → Table missing, need to create it

### 2. Create Tables (if needed)

If either table doesn't exist, run this in SQL Editor:

```sql
-- Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
```

### 3. Enable Row-Level Security (RLS)

Run in SQL Editor:

```sql
-- Enable RLS on conversations table
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- Enable RLS on messages table
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create allow-all policies for public access (for MVP/testing)
CREATE POLICY "Allow insert conversations" ON conversations
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow select conversations" ON conversations
  FOR SELECT
  USING (true);

CREATE POLICY "Allow insert messages" ON messages
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow select messages" ON messages
  FOR SELECT
  USING (true);
```

### 4. Verify RLS Policies are Active

Run in SQL Editor:

```sql
-- Check RLS status on conversations
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('conversations', 'messages');

-- Should see: rowsecurity = true for both tables
```

### 5. Test Message Persistence

1. **Open browser DevTools** (F12)
2. **Go to Console tab** - this is where logs appear
3. **Navigate to `/ai` page** in your app
4. **Watch Console** - you should see:
   ```
   Initializing conversation...
   Conversation initialized. ID: [some-uuid]
   ```
5. **Type a message** and press Enter
6. **Check Console** for:
   ```
   Attempting to save user message...
   Conversation ID: [uuid]
   Message content: [your message]
   User message saved successfully: [database response]
   ```
7. **Wait for AI response**
8. **Check Console** for:
   ```
   Attempting to save AI message...
   Conversation ID: [uuid]
   Message content length: [number]
   AI message saved successfully: [database response]
   ```
9. **Refresh the page** (Cmd+R)
10. **Check Console** for:
    ```
    Loaded [count] messages from database
    ```

### 6. Common Errors & Fixes

#### Error: "PostgreSQL error: relation 'messages' does not exist"
- **Cause**: Table not created
- **Fix**: Run the CREATE TABLE script in section 2

#### Error: "new row violates row-level security policy"
- **Cause**: RLS policies not created
- **Fix**: Run the RLS policy creation script in section 3

#### Error: "violates foreign key constraint"
- **Cause**: conversation_id is NULL or doesn't match existing conversation
- **Fix**: Ensure conversation is created BEFORE saving messages. Check logs for conversation creation success.

#### Messages not appearing after refresh
- **Cause**: RLS SELECT policy not created
- **Fix**: Run the CREATE POLICY scripts in section 3

#### Nothing logging to console
- **Cause**: Browser console not open or JavaScript error preventing page load
- **Fix**: Open DevTools, refresh page, check for red errors in console

### 7. Advanced Debugging

#### Check if data is actually in Supabase

Go to Supabase Dashboard → Table Editor:

1. Click "conversations" table
2. Should see rows created when you visit `/ai` page
3. Copy a conversation ID
4. Click "messages" table
5. Should see rows with matching conversation_id

#### Test Supabase connection directly

Go to SQL Editor and run:

```sql
-- Insert test conversation
INSERT INTO conversations DEFAULT VALUES RETURNING id;

-- Copy the returned ID and use it below
INSERT INTO messages (conversation_id, role, content)
VALUES ('your-id-here', 'user', 'Test message');

-- Verify insert worked
SELECT * FROM messages WHERE role = 'user';
```

#### Export logs for debugging

In browser console, run:

```javascript
// Copy all logs from this session to clipboard
copy(console.log.toString())

// Or check Application > Local Storage for any stored data
```

## Full Integration Test Checklist

- [ ] Tables exist (verify with SELECT queries)
- [ ] RLS is enabled (verify with pg_tables query)
- [ ] RLS policies created (verify in Supabase dashboard)
- [ ] Can create conversation (see "Conversation initialized" log)
- [ ] Can save user message (see "User message saved successfully" log)
- [ ] Can save AI message (see "AI message saved successfully" log)
- [ ] Can load messages (see "Loaded X messages from database" log)
- [ ] Messages persist after refresh (messages still visible)
- [ ] Data appears in Supabase Table Editor

## Expected Behavior After Setup

1. Open `/ai` page → Creates conversation, logs: "Conversation initialized. ID: [uuid]"
2. Send message → Logs: "User message saved successfully"
3. AI responds → Logs: "AI message saved successfully"
4. Refresh page → Messages load and display, logs: "Loaded X messages from database"
5. Go to Supabase dashboard → See conversations and messages in tables

## Next Steps

After completing this checklist:

1. If messages still don't persist:
   - [ ] Share the exact error from browser console
   - [ ] Check Supabase dashboard SQL Editor for data
   - [ ] Verify environment variables (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)

2. If messages persist successfully:
   - [ ] Celebrate! 🎉
   - [ ] Consider adding timestamps to message display
   - [ ] Add message editing capability
   - [ ] Add conversation history view

## Code Location Reference

- **Message persistence code**: `/apps/web/app/ai/page.tsx`
  - Lines 253-300: Conversation initialization
  - Lines 350-395: User message save
  - Lines 400-425: AI message save
  - Lines 280-310: Message loading on page load

- **API endpoint**: `/apps/web/app/api/ai/route.ts`
  - Fetches user context (events, tasks, projects, ideas)
  - Sends to Groq API for response

## Environment Variables Required

Verify these are set in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
GROQ_API_KEY=your-groq-key-here
```

Without these, no Supabase operations will work.
