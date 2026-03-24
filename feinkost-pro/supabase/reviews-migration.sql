-- =====================================================
-- REVIEWS TABLE + CUSTOMER AUTH SETUP
-- Run this in Supabase SQL Editor (Dashboard → SQL)
-- =====================================================

-- 1. Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id text NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL CHECK (char_length(comment) >= 3 AND char_length(comment) <= 1000),
  created_at timestamptz DEFAULT now(),
  approved boolean DEFAULT true
);

-- 2. Index for fast product lookups
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);

-- 3. RLS (Row Level Security)
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can read approved reviews
CREATE POLICY "Anyone can read approved reviews"
  ON reviews FOR SELECT
  USING (approved = true);

-- Authenticated users can insert their own reviews
CREATE POLICY "Authenticated users can insert reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own reviews
CREATE POLICY "Users can update own reviews"
  ON reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can delete their own reviews
CREATE POLICY "Users can delete own reviews"
  ON reviews FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Unique constraint: one review per user per product
CREATE UNIQUE INDEX IF NOT EXISTS idx_reviews_unique_user_product
  ON reviews(product_id, user_id);

-- 4. Enable Supabase Auth (already enabled by default)
-- Configure in Dashboard → Authentication → Settings:
--   - Enable Email/Password sign up
--   - Optionally enable Google OAuth
