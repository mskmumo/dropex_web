-- Create enum types
CREATE TYPE user_role AS ENUM ('CUSTOMER', 'WAREHOUSE_STAFF', 'LOGISTICS_COORDINATOR', 'CENTER_ADMIN', 'SUPER_ADMIN');
CREATE TYPE parcel_status AS ENUM ('PENDING', 'PROCESSING', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED', 'RETURNED');
CREATE TYPE task_status AS ENUM ('TODO', 'IN_PROGRESS', 'DONE');
CREATE TYPE shipment_type AS ENUM ('INCOMING', 'OUTGOING');
CREATE TYPE shipment_status AS ENUM ('PROCESSING', 'IN_TRANSIT', 'ARRIVED', 'DELIVERED');

-- Create tables
CREATE TABLE user (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role user_role DEFAULT 'CUSTOMER',
  username TEXT UNIQUE,
  employee_id TEXT UNIQUE,
  government_id TEXT,
  work_location TEXT,
  shift TEXT,
  country TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE parcels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tracking_number TEXT UNIQUE NOT NULL,
  status parcel_status NOT NULL,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  weight FLOAT NOT NULL,
  dimensions TEXT,
  user_id UUID REFERENCES users(id),
  shipment_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE auctions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  start_price FLOAT NOT NULL,
  current_price FLOAT NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  status task_status NOT NULL,
  parcel_id UUID REFERENCES parcels(id),
  assigned_to_id UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE shipments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type shipment_type NOT NULL,
  status shipment_status NOT NULL,
  tracking_number TEXT UNIQUE NOT NULL,
  supplier_id UUID REFERENCES users(id),
  customer_id UUID REFERENCES users(id),
  expected_arrival TIMESTAMP WITH TIME ZONE,
  shipped_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add foreign key to parcels table
ALTER TABLE parcels ADD CONSTRAINT fk_shipment
FOREIGN KEY (shipment_id) REFERENCES shipments(id);

-- Create indexes
CREATE INDEX idx_parcels_user_id ON parcels(user_id);a
CREATE INDEX idx_auctions_user_id ON auctions(user_id);
CREATE INDEX idx_tasks_parcel_id ON tasks(parcel_id);
CREATE INDEX idx_tasks_assigned_to_id ON tasks(assigned_to_id);
CREATE INDEX idx_shipments_supplier_id ON shipments(supplier_id);
CREATE INDEX idx_shipments_customer_id ON shipments(customer_id);

