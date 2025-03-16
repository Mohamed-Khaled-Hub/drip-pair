-- Brands
INSERT INTO brands (name, founded, links, founder) VALUES 
('Nike', '1964-01-25', '{"website": "https://www.nike.com"}', 'Phil Knight'),
('Adidas', '1949-08-18', '{"website": "https://www.adidas.com"}', 'Adi Dassler'),
('Balenciaga', '1919-01-01', '{"website": "https://www.balenciaga.com"}', 'Cristóbal Balenciaga');

-- Adidas
INSERT INTO shoes (name, brand_id, price, sizes, colors)  
VALUES 
(
    'Adizero Chaos Football Lineman Cleats',
    (SELECT id FROM brands WHERE name = 'Adidas' LIMIT 1), 
    150.00, 
    '{8, 9, 10, 11, 12, 13}', 
    '[
        {
            "id": 101,
            "name": "Cloud White / Royal Blue",
            "colors": {
                "Cloud White": "#F5F5F5",
                "Royal Blue": "#4169E1"
            }
        },
        {
            "id": 102,
            "name": "Core Black / Cloud White",
            "colors": {
                "Core Black": "#000000",
                "Cloud White": "#F5F5F5"
            }
        }
    ]'::JSONB
),
(
    'Samba OG Shoes',
    (SELECT id FROM brands WHERE name = 'Adidas' LIMIT 1), 
    100.00, 
    '{6, 7, 8, 9, 10, 11, 12, 13}', 
    '[
        {
            "id": 201,
            "name": "Core Black / Cloud White",
            "colors": {
                "Cloud White": "#F5F5F5",
                "Core Black": "#000000"
            }
        },
        {
            "id": 202,
            "name": "Collegiate Orange / Cream White",
            "colors": {
                "Collegiate Orange": "#DC4F33",
                "Cream White": "#E9E0D0"
            }
        }
    ]'::JSONB
),
(
    'Ultraboost 1.0 Shoes',
    (SELECT id FROM brands WHERE name = 'Adidas' LIMIT 1), 
    200.00, 
    '{6, 7, 8, 9, 10, 11, 12}', 
    '[
        {
            "id": 301,
            "name": "Core Black / Core Black",
            "colors": {
                "Core Black": "#000000"
            }
        },
        {
            "id": 302,
            "name": "Grey One / Grey Three",
            "colors": {
                "Grey One": "#C9C8C2",
                "Grey Three": "#7C7C7A"
            }
        }
    ]'::JSONB
);

-- Balenciaga
INSERT INTO shoes (name, brand_id, price, sizes, colors)  
VALUES 
(
    'Stapler Sneaker',
    (SELECT id FROM brands WHERE name = 'Balenciaga' LIMIT 1), 
    1150.00, 
    '{39, 40, 41, 42, 43, 44, 45}',
    '[
        {
            "id": 401,
            "name": "Black",
            "colors": {
                "Black": "#000000"
            }
        },
        {
            "id": 402,
            "name": "Beige / Grey",
            "colors": {
                "Beige": "#CFC8C0",
                "Grey": "#898480"
            }
        }
    ]'::JSONB
),
(
    'Track Signature Sneaker',
    (SELECT id FROM brands WHERE name = 'Balenciaga' LIMIT 1), 
    1150.00, 
    '{39, 40, 41, 42, 43, 44, 45}', 
    '[
  {
    "id": 501,
    "name": "Black",
    "colors": {
      "Black": "#000000"
    }
  },
  {
    "id": 502,
    "name": "White",
    "colors": {
      "White": "#FFFFFF"
    }
  }
]'::JSONB
),
(
    'Speed Recycled Knit Sneaker',
    (SELECT id FROM brands WHERE name = 'Balenciaga' LIMIT 1), 
    950.00, 
    '{39, 40, 41, 42, 43, 44, 45}', 
    '[
        {
            "id": 601,
            "name": "Black",
            "colors": {
                "Black": "#000000"
            }
        }
    ]'::JSONB
);

-- Nike
INSERT INTO shoes (name, brand_id, price, sizes, colors)  
VALUES 
(
    'Dunk Low Retro Premium',
    (SELECT id FROM brands WHERE name = 'Nike' LIMIT 1), 
    125.00, 
    '{7, 8, 9, 10, 11, 12, 13}', 
    '[
        {
            "id": 701,
            "name": "Dark Stucco / Vintage Green",
            "colors": {
                "Dark Stucco": "#A5A393",
                "Vintage Green": "#5D7169"
            }
        },
        {
            "id": 702,
            "name": "Light Orewood Brown / Coconut Milk",
            "colors": {
                "Light Orewood Brown": "#A6693B",
                "Coconut Milk": "#DADACE"
            }
        }
    ]'::JSONB
),
(
    'Dunk Low Retro',
    (SELECT id FROM brands WHERE name = 'Nike' LIMIT 1), 
    115.00, 
    '{7, 8, 9, 10, 11, 12, 13}', 
    '[
        {
            "id": 801,
            "name": "White / Black",
            "colors": {
                "White": "#FFFFFF",
                "Black": "#000000"
            }
        },
        {
            "id": 802,
            "name": "White / University Red",
            "colors": {
                "White": "#FFFFFF",
                "University Red": "#E01024"
            }
        }
    ]'::JSONB
),
(
    'Air More Uptempo Low',
    (SELECT id FROM brands WHERE name = 'Nike' LIMIT 1), 
    170.00, 
    '{7, 8, 9, 10, 11, 12, 13}', 
    '[
        {
            "id": 901,
            "name": "Black / Metallic Silver",
            "colors": {
                "Black": "#000000",
                "Metallic Silver": "#A8A9AD"
            }
        },
        {
            "id": 902,
            "name": "Dark Grey / Light Crimson",
            "colors": {
                "Dark Grey": "#595959",
                "Light Crimson": "#D0322C"
            }
        }
    ]'::JSONB
);

-- Users
INSERT INTO users (name, email, username, password, address, dob, phone, cart)  
VALUES 
(
    '{"first": "John", "last": "Doe"}'::JSONB,
    'johndoe@example.com',
    'johndoe',
    'hashedpassword123',
    '123 Main St, New York, NY',
    '1990-05-10',
    '1234567890',
    '[
        { "product": 1, "color": 101, "quantity": 1 }, 
        { "product": 3, "color": 301, "quantity": 2 }
    ]'::JSONB
),
(
    '{"first": "Jane", "last": "Smith"}'::JSONB,
    'janesmith@example.com',
    'janesmith',
    'securepassword456',
    '456 Elm St, Los Angeles, CA',
    '1995-09-25',
    '9876543210',
    '[
        { "product": 2, "color": 202, "quantity": 1 }, 
        { "product": 5, "color": 502, "quantity": 3 }
    ]'::JSONB
);



