-- Categories table
CREATE TABLE categories (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_tr TEXT,
  description TEXT,
  description_tr TEXT,
  image TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_tr TEXT,
  description TEXT,
  description_tr TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT REFERENCES categories(slug),
  weight TEXT,
  origin TEXT,
  in_stock BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product variants
CREATE TABLE product_variants (
  id TEXT PRIMARY KEY,
  product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  weight TEXT,
  sort_order INTEGER DEFAULT 0
);

-- Product images
CREATE TABLE product_images (
  id SERIAL PRIMARY KEY,
  product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

-- Add unique constraint for image upsert
ALTER TABLE product_images ADD CONSTRAINT product_images_product_sort UNIQUE (product_id, sort_order);

-- Orders table
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  customer_first_name TEXT NOT NULL,
  customer_last_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  shipping_street TEXT NOT NULL,
  shipping_city TEXT NOT NULL,
  shipping_postal_code TEXT NOT NULL,
  shipping_country TEXT DEFAULT 'DE',
  payment_method TEXT DEFAULT 'card',
  subtotal DECIMAL(10,2) NOT NULL,
  shipping_cost DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'processing', 'shipped', 'delivered', 'cancelled')),
  stripe_payment_intent_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order items
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id TEXT REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT REFERENCES products(id),
  product_name TEXT NOT NULL,
  variant_name TEXT,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL
);

-- Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Public read access for categories and products
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read variants" ON product_variants FOR SELECT USING (true);
CREATE POLICY "Public read images" ON product_images FOR SELECT USING (true);

-- Only authenticated users can modify products (admin)
CREATE POLICY "Admin insert products" ON products FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update products" ON products FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete products" ON products FOR DELETE USING (auth.role() = 'authenticated');

-- Similar for variants and images
CREATE POLICY "Admin insert variants" ON product_variants FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update variants" ON product_variants FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete variants" ON product_variants FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin insert images" ON product_images FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin delete images" ON product_images FOR DELETE USING (auth.role() = 'authenticated');

-- Orders can be created by anyone (checkout), read/update by admin
CREATE POLICY "Public insert orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin read orders" ON orders FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin update orders" ON orders FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Public insert order_items" ON order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin read order_items" ON order_items FOR SELECT USING (auth.role() = 'authenticated');

-- Indexes for performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_featured ON products(featured) WHERE featured = TRUE;
CREATE INDEX idx_product_variants_product ON product_variants(product_id);
CREATE INDEX idx_product_images_product ON product_images(product_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
CREATE INDEX idx_order_items_order ON order_items(order_id);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at();
