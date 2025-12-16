
# Placid Asia Website Enhancement Roadmap

## Overview
This document outlines the planned enhancements for placid.asia, organized by priority and implementation complexity.

---

## Phase 1: Critical Fixes & Content Foundation (Week 1-2)

### 1. ✅ Fix Missing Product Images
**Priority:** HIGH - Immediate
**Status:** Pending user input

**Current Issue:**
- Some APS products and possibly others are missing images
- Need to identify all products without images

**Action Items:**
1. Run database query to identify all products with empty/missing images
2. Source images from official supplier websites
3. Upload to CDN and update database
4. Verify all products have at least one image

**Deliverables:**
- List of products without images
- Downloaded and uploaded images
- Updated products_data.json
- Database reseed

---

### 2. ✅ Add Social Media Links
**Priority:** HIGH - Quick Win
**Status:** Ready to implement

**What We Need:**
Please provide your social media account URLs:
- [ ] Facebook: _______________
- [ ] LinkedIn: _______________
- [ ] YouTube: _______________
- [ ] Line: _______________ (already have @placid)
- [ ] Instagram: _______________
- [ ] Twitter/X: _______________
- [ ] WeChat: _______________
- [ ] Any others?

**Implementation:**
1. Add social media links to footer
2. Add social media icons to header (optional)
3. Add social share buttons on product pages
4. Update structured data with social profiles

**Files to Modify:**
- `components/footer.tsx` - Add social links section
- `app/layout.tsx` - Update structured data with social profiles
- `public/` - Add social media SVG icons if needed

**Estimated Time:** 1-2 hours

---

## Phase 2: Analytics & Monitoring (Week 2-3)

### 3. 📊 Weekly Analytics Reporting
**Priority:** MEDIUM
**Status:** Planning required

**Options:**

**Option A: Automated Email Reports (Recommended)**
- Set up Google Analytics 4 weekly email reports
- Configure custom dashboards
- Send automated summaries to info@placid.asia
- No coding required

**Option B: Custom Dashboard**
- Build admin dashboard with GA4 API integration
- Display key metrics:
  - Page views by page
  - Top products viewed
  - Top categories
  - Traffic sources
  - Conversion tracking (quote requests)
  - Search terms used
- Weekly email summary via scheduled task

**Key Metrics to Track:**
- Total visitors (week/month)
- Top 10 viewed products
- Top 5 categories
- Quote request submissions
- Newsletter signups
- Chatbot interactions
- Search queries
- Geographic distribution
- Mobile vs Desktop usage

**Recommendation:** Start with Option A (GA4 automated reports), then build custom dashboard if needed.

**Estimated Time:** 
- Option A: 30 minutes setup
- Option B: 8-12 hours development

---

## Phase 3: Content Marketing Infrastructure (Week 3-5)

### 4. 📝 Blog Section
**Priority:** HIGH
**Status:** Architecture planning

**Structure:**
```
/blog/
  ├── page.tsx (Blog listing)
  ├── [slug]/
  │   └── page.tsx (Individual blog post)
  └── category/
      └── [category]/
          └── page.tsx (Posts by category)
```

**Features:**
- Blog post listing with pagination
- Categories/tags for posts
- Featured image for each post
- Author info (if multiple authors)
- Publication date
- Reading time estimate
- Related posts section
- SEO optimization (meta tags, structured data)
- Social sharing buttons
- Comments section (optional)

**Content Storage Options:**

**Option A: Markdown Files (Simpler)**
```
/blog/
  ├── product-highlight-aps-shakers.md
  ├── building-acoustics-best-practices.md
  └── sound-level-meter-calibration.md
```
- Easy to edit
- Version controlled
- No database needed
- Requires rebuild to publish

**Option B: Database (More Flexible)**
- Add `BlogPost` model to Prisma schema
- Admin interface to create/edit posts
- Publish immediately
- Draft/scheduled posts
- Better for frequent updates

**Blog Categories:**
1. Product Highlights (weekly)
2. Technical How-Tos
3. Industry News
4. Case Studies
5. Application Guides
6. Standards & Regulations

**Content Calendar (Weekly Posts):**
- Week 1: Product Highlight - APS Shakers
- Week 2: Product Highlight - Norsonic SLMs
- Week 3: Technical Article - Sound Intensity Measurement
- Week 4: Case Study - Building Acoustics Project
- Repeat cycle with variations

**Estimated Time:** 
- Setup: 12-16 hours
- First post: 2-4 hours
- Weekly posts: 2-3 hours each

---

### 5. 📊 Case Studies Section
**Priority:** MEDIUM
**Status:** Planning required

**Structure:**
```
/case-studies/
  ├── page.tsx (Case studies listing)
  └── [slug]/
      └── page.tsx (Individual case study)
```

**Case Study Template:**
1. **Project Title** (e.g., "Airport Noise Monitoring System")
2. **Client** (optional, can be anonymous)
3. **Industry** (Construction, Manufacturing, etc.)
4. **Challenge** (What problem needed solving)
5. **Solution** (Equipment and methodology used)
6. **Products Used** (With links to product pages)
7. **Results** (Quantified outcomes)
8. **Gallery** (Project photos)
9. **Testimonial** (Optional)

**Example Case Studies:**
1. Environmental noise monitoring for highway expansion
2. Building acoustics testing for luxury hotel
3. Industrial noise control for manufacturing plant
4. Vibration testing for construction site
5. Sound power measurement for HVAC equipment

**What We Need:**
- Real or anonymized project examples
- Photos (if available)
- Equipment lists
- Results data
- Client testimonials (optional)

**Estimated Time:** 
- Section setup: 8-10 hours
- Per case study: 3-4 hours

---

### 6. 📚 Technical Articles Section
**Priority:** MEDIUM
**Status:** Can be part of blog

**Recommendation:** 
Technical articles can be a **category within the blog** rather than a separate section. This:
- Simplifies navigation
- Better for SEO (one blog with multiple categories)
- Easier to manage content

**Technical Article Topics:**
1. Understanding IEC 61672 Sound Level Meter Standards
2. ISO 3744 Sound Power Measurement Guide
3. Building Acoustics Testing: ISO 140 vs ASTM E90
4. Vibration Analysis: ISO 10816 Explained
5. Microphone Types and Applications
6. Calibration Best Practices
7. Data Acquisition System Selection
8. Acoustic Software Comparison

**Alternatively:** 
If you prefer a separate section, we can create:
```
/technical-articles/
  ├── page.tsx (Technical articles listing)
  └── [slug]/
      └── page.tsx (Individual article)
```

**Estimated Time:** 
- If part of blog: 0 hours (already included)
- If separate section: 6-8 hours

---

### 7. 🎥 Videos Section
**Priority:** LOW-MEDIUM
**Status:** Planning required

**Options:**

**Option A: YouTube Embedded (Recommended)**
- Host videos on your YouTube channel
- Embed videos on website
- No bandwidth/storage costs
- Better SEO (YouTube indexing)
- Social proof (views, likes)

**Option B: Direct Upload**
- Host videos on your server/CDN
- More control
- Higher costs
- Bandwidth considerations

**Structure:**
```
/videos/
  ├── page.tsx (Video gallery)
  └── [slug]/
      └── page.tsx (Individual video page with description)
```

**Video Categories:**
1. **Product Demonstrations**
   - How to use Norsonic sound level meters
   - Setting up vibration measurement systems
   - Calibration procedures

2. **Tutorial Videos**
   - Sound intensity measurement tutorial
   - Building acoustics testing guide
   - Data acquisition setup

3. **Webinar Recordings**
   - Industry standards updates
   - New product launches
   - Technical Q&A sessions

4. **Customer Testimonials**
   - Project success stories
   - Equipment reviews

**What We Need:**
- YouTube channel URL (if you have one)
- Existing video links
- Video production schedule

**Estimated Time:** 
- Section setup: 6-8 hours
- Per video page: 1 hour

---

## Phase 4: SEO Enhancement (Ongoing)

### 8. 🔍 Enhanced Structured Data with URLs
**Priority:** MEDIUM
**Status:** Ready to implement

**Current Structured Data:**
- ✅ Organization schema (name, address, phone)
- ✅ Product schema (basic)
- ✅ Website schema

**Enhancements Needed:**

**1. Add to Organization Schema:**
```json
{
  "@type": "Organization",
  "sameAs": [
    "https://facebook.com/placidasia",
    "https://linkedin.com/company/placidasia",
    "https://youtube.com/@placidasia"
  ],
  "url": "https://placid.asia"
}
```

**2. Enhance Product Schema:**
```json
{
  "@type": "Product",
  "url": "https://placid.asia/products/[sku]",
  "mainEntityOfPage": "https://placid.asia/products/[sku]",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "12"
  }
}
```

**3. Add BreadcrumbList Schema:**
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://placid.asia"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Products",
      "item": "https://placid.asia/products"
    }
  ]
}
```

**4. Add FAQPage Schema:**
```json
{
  "@type": "FAQPage",
  "mainEntity": [...]
}
```

**Files to Modify:**
- `app/layout.tsx` - Organization schema
- `app/products/[sku]/page.tsx` - Product schema
- `app/faq/page.tsx` - FAQ schema
- All pages - Breadcrumb schema

**Estimated Time:** 2-3 hours

---

## Implementation Timeline Summary

### Immediate (This Week)
1. **Identify products without images** (1 hour)
2. **Get social media URLs from you** (0 hours - awaiting info)
3. **Add social media links** (2 hours)
4. **Set up GA4 weekly reports** (30 minutes)

### Week 2-3
5. **Download and add missing product images** (4-6 hours)
6. **Enhanced structured data** (2-3 hours)
7. **Blog infrastructure setup** (12-16 hours)

### Week 4-5
8. **First 2-3 blog posts** (6-9 hours)
9. **Case studies section** (8-10 hours)
10. **Videos section setup** (6-8 hours)

### Ongoing
11. **Weekly blog posts** (2-3 hours per week)
12. **Monthly case studies** (3-4 hours per study)
13. **Video uploads** (as available)

---

## Total Estimated Time
- **Phase 1:** 4-8 hours
- **Phase 2:** 8-12 hours
- **Phase 3:** 26-38 hours
- **Phase 4:** 2-3 hours
- **Total:** 40-61 hours (1-1.5 weeks of focused work)

---

## Questions for You

Before I proceed, please provide:

### 1. Social Media Accounts ✅ REQUIRED
- Facebook URL: _______________
- LinkedIn URL: _______________
- YouTube URL: _______________
- Instagram URL: _______________
- Twitter/X URL: _______________
- Other: _______________

### 2. Content Preferences
- [ ] Blog: Markdown files or Database? (Recommend: Database for flexibility)
- [ ] Technical Articles: Part of blog or separate section? (Recommend: Part of blog)
- [ ] Videos: YouTube embedded or direct upload? (Recommend: YouTube)

### 3. Weekly Stats
- [ ] Who should receive weekly analytics emails?
- [ ] What metrics are most important to you?

### 4. Content Availability
- [ ] Do you have any existing case studies/projects to feature?
- [ ] Do you have videos ready to upload?
- [ ] Can you commit to writing/approving one blog post per week?

### 5. Priority Ranking
Please rank these by importance (1-8):
- [ ] Fix missing images: ___
- [ ] Social media links: ___
- [ ] Weekly stats: ___
- [ ] Blog section: ___
- [ ] Case studies: ___
- [ ] Technical articles: ___
- [ ] Videos: ___
- [ ] Enhanced structured data: ___

---

## Next Steps

Once you provide the above information, I'll:
1. Start with the highest priority items
2. Implement in phases
3. Deploy and test each phase
4. Provide documentation for content creation
5. Set up workflows for ongoing content

**Ready to proceed when you are!** 🚀
