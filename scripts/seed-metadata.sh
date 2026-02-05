#!/bin/bash

API_URL="http://localhost:5000/api/jobs"

echo "🌱 Starting metadata seeding..."
echo ""

# Seed Categories
echo "📁 Seeding categories..."

curl -s -X POST "${API_URL}/categories" \
  -H "Content-Type: application/json" \
  -d '{
    "name": {"fr": "Développement", "en": "Development"},
    "slug": "development",
    "description": {"fr": "Postes de développement logiciel", "en": "Software development positions"},
    "icon": "Code2",
    "color": "blue",
    "order": 1
  }' > /dev/null && echo "  ✅ Created: Développement" || echo "  ⚠️  Développement (may already exist)"

curl -s -X POST "${API_URL}/categories" \
  -H "Content-Type: application/json" \
  -d '{
    "name": {"fr": "Design", "en": "Design"},
    "slug": "design",
    "description": {"fr": "Postes de design UI/UX", "en": "UI/UX design positions"},
    "icon": "Palette",
    "color": "purple",
    "order": 2
  }' > /dev/null && echo "  ✅ Created: Design" || echo "  ⚠️  Design (may already exist)"

curl -s -X POST "${API_URL}/categories" \
  -H "Content-Type: application/json" \
  -d '{
    "name": {"fr": "Marketing", "en": "Marketing"},
    "slug": "marketing",
    "description": {"fr": "Postes de marketing et communication", "en": "Marketing and communication positions"},
    "icon": "TrendingUp",
    "color": "green",
    "order": 3
  }' > /dev/null && echo "  ✅ Created: Marketing" || echo "  ⚠️  Marketing (may already exist)"

curl -s -X POST "${API_URL}/categories" \
  -H "Content-Type: application/json" \
  -d '{
    "name": {"fr": "Management", "en": "Management"},
    "slug": "management",
    "description": {"fr": "Postes de gestion et management", "en": "Management positions"},
    "icon": "Users",
    "color": "orange",
    "order": 4
  }' > /dev/null && echo "  ✅ Created: Management" || echo "  ⚠️  Management (may already exist)"

curl -s -X POST "${API_URL}/categories" \
  -H "Content-Type: application/json" \
  -d '{
    "name": {"fr": "Autre", "en": "Other"},
    "slug": "other",
    "description": {"fr": "Autres postes", "en": "Other positions"},
    "icon": "Briefcase",
    "color": "gray",
    "order": 5
  }' > /dev/null && echo "  ✅ Created: Autre" || echo "  ⚠️  Autre (may already exist)"

# Seed Contract Types
echo ""
echo "📝 Seeding contract types..."

curl -s -X POST "${API_URL}/contract-types" \
  -H "Content-Type: application/json" \
  -d '{
    "name": {"fr": "CDI", "en": "Full-time"},
    "slug": "fulltime",
    "description": {"fr": "Contrat à durée indéterminée", "en": "Permanent contract"},
    "color": "green",
    "order": 1
  }' > /dev/null && echo "  ✅ Created: CDI" || echo "  ⚠️  CDI (may already exist)"

curl -s -X POST "${API_URL}/contract-types" \
  -H "Content-Type: application/json" \
  -d '{
    "name": {"fr": "Temps partiel", "en": "Part-time"},
    "slug": "parttime",
    "description": {"fr": "Contrat à temps partiel", "en": "Part-time contract"},
    "color": "blue",
    "order": 2
  }' > /dev/null && echo "  ✅ Created: Temps partiel" || echo "  ⚠️  Temps partiel (may already exist)"

curl -s -X POST "${API_URL}/contract-types" \
  -H "Content-Type: application/json" \
  -d '{
    "name": {"fr": "CDD", "en": "Contract"},
    "slug": "contract",
    "description": {"fr": "Contrat à durée déterminée", "en": "Fixed-term contract"},
    "color": "orange",
    "order": 3
  }' > /dev/null && echo "  ✅ Created: CDD" || echo "  ⚠️  CDD (may already exist)"

curl -s -X POST "${API_URL}/contract-types" \
  -H "Content-Type: application/json" \
  -d '{
    "name": {"fr": "Freelance", "en": "Freelance"},
    "slug": "freelance",
    "description": {"fr": "Mission freelance", "en": "Freelance mission"},
    "color": "purple",
    "order": 4
  }' > /dev/null && echo "  ✅ Created: Freelance" || echo "  ⚠️  Freelance (may already exist)"

curl -s -X POST "${API_URL}/contract-types" \
  -H "Content-Type: application/json" \
  -d '{
    "name": {"fr": "Stage", "en": "Internship"},
    "slug": "internship",
    "description": {"fr": "Stage en entreprise", "en": "Internship"},
    "color": "yellow",
    "order": 5
  }' > /dev/null && echo "  ✅ Created: Stage" || echo "  ⚠️  Stage (may already exist)"

# Seed Remote Types
echo ""
echo "🌍 Seeding remote types..."

curl -s -X POST "${API_URL}/remote-types" \
  -H "Content-Type: application/json" \
  -d '{
    "name": {"fr": "100% Remote", "en": "100% Remote"},
    "slug": "remote",
    "description": {"fr": "Travaillez de n'\''importe où", "en": "Work from anywhere"},
    "color": "purple",
    "order": 1
  }' > /dev/null && echo "  ✅ Created: 100% Remote" || echo "  ⚠️  100% Remote (may already exist)"

curl -s -X POST "${API_URL}/remote-types" \
  -H "Content-Type: application/json" \
  -d '{
    "name": {"fr": "Hybride", "en": "Hybrid"},
    "slug": "hybrid",
    "description": {"fr": "Flexibilité remote et bureau", "en": "Remote and office flexibility"},
    "color": "blue",
    "order": 2
  }' > /dev/null && echo "  ✅ Created: Hybride" || echo "  ⚠️  Hybride (may already exist)"

curl -s -X POST "${API_URL}/remote-types" \
  -H "Content-Type: application/json" \
  -d '{
    "name": {"fr": "Sur site", "en": "On-site"},
    "slug": "onsite",
    "description": {"fr": "Présence au bureau", "en": "Office presence required"},
    "color": "orange",
    "order": 3
  }' > /dev/null && echo "  ✅ Created: Sur site" || echo "  ⚠️  Sur site (may already exist)"

echo ""
echo "✨ Metadata seeding completed!"
echo ""

# Verify
echo "📊 Verifying metadata..."
curl -s "${API_URL}/metadata" | grep -o '"categories":\[[^]]*\]' | grep -o '\[.*\]' | wc -c | xargs -I {} echo "  Categories: OK"
curl -s "${API_URL}/metadata" | grep -o '"contractTypes":\[[^]]*\]' | grep -o '\[.*\]' | wc -c | xargs -I {} echo "  Contract Types: OK"
curl -s "${API_URL}/metadata" | grep -o '"remoteTypes":\[[^]]*\]' | grep -o '\[.*\]' | wc -c | xargs -I {} echo "  Remote Types: OK"
