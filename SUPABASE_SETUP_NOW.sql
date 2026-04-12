-- ============================================
-- SUPABASE MESSAGE PERSISTENCE SETUP
-- Copy and paste this entire script into:
-- Supabase Dashboard → SQL Editor → Run
-- ============================================

-- Drop existing if needed (CAREFUL!)
-- DROP TABLE IF EXISTS messages CASCADE;
-- DROP TABLE IF EXISTS conversations CASCADE;

-- Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create messages table with proper constraints
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries on conversation_id
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);

-- ============================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on conversations table
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- Enable RLS on messages table
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- ============================================
-- CREATE RLS POLICIES (Allow public access for MVP)
-- ============================================

-- Delete existing policies first
DROP POLICY IF EXISTS "Allow insert conversations" ON conversations;
DROP POLICY IF EXISTS "Allow select conversations" ON conversations;
DROP POLICY IF EXISTS "Allow update conversations" ON conversations;
DROP POLICY IF EXISTS "Allow delete conversations" ON conversations;

DROP POLICY IF EXISTS "Allow insert messages" ON messages;
DROP POLICY IF EXISTS "Allow select messages" ON messages;
DROP POLICY IF EXISTS "Allow update messages" ON messages;
DROP POLICY IF EXISTS "Allow delete messages" ON messages;

-- Conversations policies
CREATE POLICY "Allow insert conversations" ON conversations
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow select conversations" ON conversations
  FOR SELECT
  USING (true);

CREATE POLICY "Allow update conversations" ON conversations
  FOR UPDATE
  USING (true);

CREATE POLICY "Allow delete conversations" ON conversations
  FOR DELETE
  USING (true);

-- Messages policies
CREATE POLICY "Allow insert messages" ON messages
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow select messages" ON messages
  FOR SELECT
  USING (true);

CREATE POLICY "Allow update messages" ON messages
  FOR UPDATE
  USING (true);

CREATE POLICY "Allow delete messages" ON messages
  FOR DELETE
  USING (true);

-- ============================================
-- VERIFY SETUP
-- ============================================

-- Check tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_name IN ('conversations', 'messages');

-- Check RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('conversations', 'messages');

-- Check policies exist
SELECT schemaname, tablename, policyname, cmd 
FROM pg_policies 
WHERE tablename IN ('conversations', 'messages')
ORDER BY tablename, policyname;
