-- ============================================
-- CREATE MEMORY TABLE FOR USER IDENTITY INFO
-- Copy and paste into: Supabase Dashboard → SQL Editor → Run
-- ============================================

-- Create memory table to store user information
CREATE TABLE IF NOT EXISTS user_memory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_key UNIQUE(key)
);

-- Create index for faster queries on key
CREATE INDEX IF NOT EXISTS idx_user_memory_key ON user_memory(key);

-- Enable RLS on user_memory table
ALTER TABLE user_memory ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (Allow public access for MVP)
DROP POLICY IF EXISTS "Allow insert user_memory" ON user_memory;
DROP POLICY IF EXISTS "Allow select user_memory" ON user_memory;
DROP POLICY IF EXISTS "Allow update user_memory" ON user_memory;

CREATE POLICY "Allow insert user_memory" ON user_memory
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow select user_memory" ON user_memory
  FOR SELECT USING (true);

CREATE POLICY "Allow update user_memory" ON user_memory
  FOR UPDATE WITH CHECK (true);
