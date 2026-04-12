-- ============================================
-- ENABLE ROW LEVEL SECURITY (RLS) ON TABLES
-- ============================================

-- Enable RLS on conversations table
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- Enable RLS on messages table
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- ============================================
-- DROP EXISTING POLICIES (if any)
-- ============================================

DROP POLICY IF EXISTS "Allow all conversations" ON conversations;
DROP POLICY IF EXISTS "Allow all messages" ON messages;

-- ============================================
-- CREATE POLICIES - Allow full access
-- ============================================

-- Conversations: Allow all operations
CREATE POLICY "Allow all conversations"
ON conversations
FOR ALL
USING (true)
WITH CHECK (true);

-- Messages: Allow all operations
CREATE POLICY "Allow all messages"
ON messages
FOR ALL
USING (true)
WITH CHECK (true);

-- ============================================
-- VERIFY RLS IS ENABLED AND POLICIES EXIST
-- ============================================

-- Check RLS status
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('conversations', 'messages')
ORDER BY tablename;

-- Check policies
SELECT schemaname, tablename, policyname, cmd, qual, with_check
FROM pg_policies 
WHERE tablename IN ('conversations', 'messages')
ORDER BY tablename, policyname;
