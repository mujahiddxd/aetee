-- Run this AFTER `npx prisma db push` adds the new columns
-- and BEFORE removing isVeg from the schema.

-- Products that were marked as Eggless (isVeg=true) → hasEggless=true, hasEgg=false
UPDATE products SET has_eggless = 1, has_egg = 0 WHERE is_veg = 1;

-- Products that were marked as Non-Veg (isVeg=false) → hasEggless=false, hasEgg=true
UPDATE products SET has_eggless = 0, has_egg = 1 WHERE is_veg = 0;
