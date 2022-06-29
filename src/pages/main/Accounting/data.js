const data = {
  salesChartData: {
    xLabels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    data: [
      {
        label: "BryBelly",
        values: [
          2115, 1562, 1584, 1892, 1087, 2223, 2966, 2448, 2905, 3838, 2917,
          3327,
        ],
      },
      {
        label: "Blooming Bath",
        values: [
          958, 724, 629, 883, 915, 1214, 1476, 1212, 1554, 2128, 466, 1827,
        ],
      },
      {
        label: "NaturSutten",
        values: [
          1214, 883, 1212, 2128, 1554, 958, 724, 915, 1827, 629, 1476, 1466,
        ],
      },
    ],
  },
  brandSalesChartData: {
    xLabels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    data: [
      {
        label: "Product 1",
        values: [
          2115, 1562, 1584, 1892, 1087, 2223, 2966, 2448, 2905, 3838, 2917,
          3327,
        ],
      },
      {
        label: "Product 2",
        values: [
          958, 724, 629, 883, 915, 1214, 1476, 1212, 1554, 2128, 466, 1827,
        ],
      },
      {
        label: "Product 3",
        values: [
          1214, 883, 1212, 2128, 1554, 958, 724, 915, 1827, 629, 1476, 1466,
        ],
      },
    ],
  },

  brands: [
    {
      id: 1,
      brand: "Brybelly",
      revenue: 25000000,
      comparisonRevenue: 19000000,
      revenueChange: 14,
    },
    {
      id: 2,
      brand: "Blooming Bath",
      revenue: 7000000,
      comparisonRevenue: 5000000,
      revenueChange: 6,
    },
    {
      id: 3,
      brand: "Natursutten",
      revenue: 600000,
      comparisonRevenue: 300000,
      revenueChange: 30,
    },
    {
      id: 4,
      brand: "Mimijumi",
      revenue: 280000,
      comparisonRevenue: 110000,
      revenueChange: 25,
    },
    {
      id: 5,
      brand: "Hyke & Byke",
      revenue: 1400,
      comparisonRevenue: 1200,
      revenueChange: 60,
    },
    {
      id: 6,
      brand: "Downtown Pet Supply",
      revenue: 140000,
      comparisonRevenue: 80000,
      revenueChange: 46,
    },
  ],

  products: [
    {
      id: 1,
      name: "Product 1",
      revenue: 2500,
      comparisonRevenue: 1900,
      revenueChange: 14,
    },
    {
      id: 2,
      name: "Product 2",
      revenue: 700,
      comparisonRevenue: 500,
      revenueChange: 6,
    },
    {
      id: 3,
      name: "Product 3",
      revenue: 600,
      comparisonRevenue: 300,
      revenueChange: 30,
    },
    {
      id: 4,
      name: "Product 4",
      revenue: 250000,
      comparisonRevenue: 120000,
      revenueChange: 50,
    },
    {
      id: 5,
      brand: "Blooming Bath",
      name: "Product 5",
      revenue: 1700,
      comparisonRevenue: 500,
      revenueChange: 8,
    },
    {
      id: 6,
      brand: "Blooming Bath",
      name: "Product 6",
      revenue: 3300,
      comparisonRevenue: 2100,
      revenueChange: 72,
    },
    {
      id: 7,
      brand: "Natursutten",
      name: "Product 7",
      revenue: 14000,
      comparisonRevenue: 11000,
      revenueChange: 60,
    },
    {
      id: 8,
      brand: "Natursutten",
      name: "Product 8",
      revenue: 700,
      comparisonRevenue: 300,
      revenueChange: 16,
    },
    {
      id: 9,
      brand: "Natursutten",
      name: "Product 9",
      revenue: 11600,
      comparisonRevenue: 11300,
      revenueChange: 90,
    },
  ],

  companyCategories: [
    { id: 1, name: "Baby" },
    { id: 2, name: "Novelty" },
    { id: 3, name: "Pet" },
    { id: 4, name: "Outdoor" },
  ],
  companies: [
    {
      category_name: "Baby",
      company_category_id: 1,
      id: 2,
      name: "Blooming Bath",
      nickname: "Blooming Bath",
    },
    {
      category_name: "Baby",
      company_category_id: 1,
      id: 4,
      name: "Natursutten",
      nickname: "Natursutten",
    },
    {
      category_name: "Baby",
      company_category_id: 1,
      id: 6,
      name: "Mimijumi",
      nickname: "Mimijumi",
    },
    {
      category_name: "Novelty",
      company_category_id: 2,
      id: 1,
      name: "Brybelly",
      nickname: "Brybelly",
    },
    {
      category_name: "Pet",
      company_category_id: 3,
      id: 3,
      name: "Downtown Pet Supply",
      nickname: "DTPS",
    },
    {
      category_name: "Outdoor",
      company_category_id: 4,
      id: 5,
      name: "Hyke & Byke",
      nickname: "Hyke & Byke",
    },
  ],
  marketCategories: [
    { id: 1, market: "Amazon" },
    { id: 2, market: "Shopify" },
  ],
  markets: [
    {
      category_id: 1,
      country_code: "US",
      country_id: 1,
      currency_id: 1,
      currency_symbol: "USD",
      id: 1,
      name: "Amazon US",
      native_identifier: "ATVPDKIKX0DER",
      url: "https://www.amazon.com/",
    },
    {
      category_id: 1,
      country_code: "CA",
      country_id: 2,
      currency_id: 2,
      currency_symbol: "CAD",
      id: 2,
      name: "Amazon CA",
      native_identifier: "A2EUQ1WTGCTBG2",
      url: "https://www.amazon.ca/",
    },
    {
      category_id: 1,
      country_code: "GB",
      country_id: 3,
      currency_id: 3,
      currency_symbol: "GBP",
      id: 3,
      name: "Amazon UK",
      native_identifier: "A1F83G8C2ARO7P",
      url: "https://www.amazon.co.uk/",
    },
    {
      category_id: 1,
      country_code: "FR",
      country_id: 4,
      currency_id: 4,
      currency_symbol: "EUR",
      id: 4,
      name: "Amazon FR",
      native_identifier: "A13V1IB3VIYZZH",
      url: "https://www.amazon.fr/",
    },
    {
      category_id: 1,
      country_code: "DE",
      country_id: 5,
      currency_id: 4,
      currency_symbol: "EUR",
      id: 5,
      name: "Amazon DE",
      native_identifier: "A1PA6795UKMFR9",
      url: "https://www.amazon.de/",
    },
    {
      category_id: 1,
      country_code: "IT",
      country_id: 6,
      currency_id: 4,
      currency_symbol: "EUR",
      id: 6,
      name: "Amazon IT",
      native_identifier: "APJ6JRA9NG5V4",
      url: "https://www.amazon.it/",
    },
    {
      category_id: 1,
      country_code: "ES",
      country_id: 7,
      currency_id: 4,
      currency_symbol: "EUR",
      id: 7,
      name: "Amazon ES",
      native_identifier: "A1RKKUPIHCS9HS",
      url: "https://www.amazon.es/",
    },
    {
      category_id: 1,
      country_code: "NL",
      country_id: 9,
      currency_id: 4,
      currency_symbol: "EUR",
      id: 8,
      name: "Amazon NL",
      native_identifier: "A1805IZSGTT6HS",
      url: "https://www.amazon.nl/",
    },
    {
      category_id: 1,
      country_code: "MX",
      country_id: 8,
      currency_id: 5,
      currency_symbol: "MXN",
      id: 9,
      name: "Amazon MX",
      native_identifier: "A1AM78C64UM0Y8",
      url: "https://www.amazon.mx/",
    },
    {
      category_id: 2,
      country_code: "US",
      country_id: 1,
      currency_id: 1,
      currency_symbol: "USD",
      id: 10,
      name: "Shopify",
      native_identifier: "SHOPIFY",
      url: "https://www.shopify.com/",
    },
  ],
  inventoryTableData: [
    {
      id: 0,
      companyId: 2,
      name: "BryBelly",
      shipped: 23,
      comparisonShipped: 456,
      change: 0.24,
    },
    {
      id: 1,
      companyId: 1,
      name: "Blooming Bath",
      shipped: 11,
      comparisonShipped: 19,
      change: 0.09,
    },
    {
      id: 2,
      companyId: 4,
      name: "NaturSutten",
      shipped: 45,
      comparisonShipped: 80,
      change: 0.3,
    },
  ],
};

export default data;
